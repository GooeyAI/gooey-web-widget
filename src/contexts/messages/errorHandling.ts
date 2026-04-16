import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { STREAM_MESSAGE_TYPES } from "src/api/streaming-types";

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
const MAX_ERROR_DETAIL_LENGTH = 500;

const truncateDetail = (s: string): string =>
  s.length > MAX_ERROR_DETAIL_LENGTH
    ? `${s.slice(0, MAX_ERROR_DETAIL_LENGTH)}…`
    : s;

const pickFirstKey = (value: unknown): string => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return "";
  const obj = value as Record<string, unknown>;
  for (const key of ERROR_BODY_KEYS) {
    const candidate = obj[key];
    if (typeof candidate === "string" && candidate) return candidate;
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
    // Only surface whitelisted message fields; raw bodies can contain
    // stack traces, internal IDs, or signed URLs. The full error is
    // captured via Sentry.captureException in the caller.
    let bodyDetail = "";
    if (typeof data === "string") {
      try {
        bodyDetail = pickFirstKey(JSON.parse(data));
      } catch {
        // non-JSON body — do not echo to UI
      }
    } else if (data && typeof data === "object") {
      bodyDetail = pickFirstKey(data);
    }
    const statusLine = `${status} ${statusText}`.trim();
    return truncateDetail(
      bodyDetail ? `${statusLine}: ${bodyDetail}` : statusLine,
    );
  }

  if (TIMEOUT_AXIOS_CODES.includes(e.code)) {
    return ERROR_MESSAGES.REQUEST_TIMEOUT;
  }
  if (e.code === NETWORK_AXIOS_CODE || e.message === NETWORK_AXIOS_MESSAGE) {
    return ERROR_MESSAGES.NETWORK_UNREACHABLE_SERVER;
  }
  return truncateDetail(e.message || ERROR_MESSAGES.UNKNOWN);
};

// Extracts a UI-safe detail from a failed fetch Response (non-2xx).
// Returns both the sanitized UI string and the raw body so the caller can
// forward the full payload to telemetry without exposing it to users.
export const extractFetchErrorDetail = async (
  res: Response,
): Promise<{ uiDetail: string; rawBody: string }> => {
  const statusLine = `${res.status} ${res.statusText}`.trim();
  const body = await res.text().catch(() => "");
  if (!body) {
    return {
      uiDetail: statusLine || ERROR_MESSAGES.STREAM_CONNECTION_FAILED,
      rawBody: "",
    };
  }
  let safeDetail = "";
  try {
    safeDetail = pickFirstKey(JSON.parse(body));
  } catch {
    // non-JSON body — do not echo to UI
  }
  return {
    uiDetail: truncateDetail(
      safeDetail ? `${statusLine}: ${safeDetail}` : statusLine,
    ),
    rawBody: body,
  };
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
