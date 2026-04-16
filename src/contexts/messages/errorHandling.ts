import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { STREAM_MESSAGE_TYPES } from "src/api/streaming";

export const ERROR_MESSAGES = {
  UNKNOWN: "Unknown error",
  REQUEST_TIMEOUT: "Request timed out",
  NETWORK_UNREACHABLE_SERVER: "Network error — unable to reach server",
  STREAM_CONNECTION_FAILED: "Stream connection failed",
} as const;

const TIMEOUT_AXIOS_CODES = ["ECONNABORTED", "ETIMEDOUT"];
const NETWORK_AXIOS_CODE = "ERR_NETWORK";
const NETWORK_AXIOS_MESSAGE = "Network Error";

const ERROR_BODY_KEYS = ["detail", "message", "error"] as const;

const pickFirstKey = (obj: Record<string, any>): string => {
  for (const key of ERROR_BODY_KEYS) {
    if (obj?.[key]) return obj[key];
  }
  return "";
};

export const isUserCancellation = (e: any): boolean => axios.isCancel(e);

// Derives a human-readable detail from axios errors (HTTP responses, network
// failures, timeouts) and generic throwables.
export const extractErrorDetail = (e: any): string => {
  if (!e) return ERROR_MESSAGES.UNKNOWN;

  if (e.response) {
    const { status, statusText = "", data } = e.response;
    let bodyDetail = "";
    if (typeof data === "string") {
      try {
        const parsed = JSON.parse(data);
        bodyDetail = pickFirstKey(parsed) || data;
      } catch {
        bodyDetail = data;
      }
    } else if (data && typeof data === "object") {
      bodyDetail = pickFirstKey(data) || JSON.stringify(data);
    }
    const statusLine = `${status} ${statusText}`.trim();
    return bodyDetail ? `${statusLine}: ${bodyDetail}` : statusLine;
  }

  if (TIMEOUT_AXIOS_CODES.includes(e.code)) {
    return ERROR_MESSAGES.REQUEST_TIMEOUT;
  }
  if (e.code === NETWORK_AXIOS_CODE || e.message === NETWORK_AXIOS_MESSAGE) {
    return ERROR_MESSAGES.NETWORK_UNREACHABLE_SERVER;
  }
  return e.message || ERROR_MESSAGES.UNKNOWN;
};

// Extracts a human-readable detail from a failed fetch Response (non-2xx).
export const extractFetchErrorDetail = async (
  res: Response,
): Promise<string> => {
  const statusLine = `${res.status} ${res.statusText}`.trim();
  const body = await res.text().catch(() => "");
  if (!body) return statusLine || ERROR_MESSAGES.STREAM_CONNECTION_FAILED;
  try {
    const parsed = JSON.parse(body);
    const msg = pickFirstKey(parsed);
    return msg ? `${statusLine}: ${msg}` : statusLine;
  } catch {
    return `${statusLine}: ${body}`;
  }
};

export const buildAssistantErrorMessage = (errorDetail: string) => {
  const id = uuidv4();
  return {
    id,
    role: "assistant" as const,
    type: STREAM_MESSAGE_TYPES.ERROR,
    error_detail: errorDetail,
    status: "errored" as const,
  };
};
