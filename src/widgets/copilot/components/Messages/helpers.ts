import axios from "axios";

/**
 * Read the first n characters of a response body as text
 */
export async function textResponseHead({
  response,
  n = 10240,
}: {
  response: Response;
  n?: number;
}) {
  const reader = response.body?.getReader();
  if (!reader) return "";
  let text = "";
  const utf8Decoder = new TextDecoder("utf-8");
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    text += utf8Decoder.decode(value, { stream: true });
    if (text.length > n) {
      await reader.cancel();
      break;
    }
  }
  return text;
}

const fetchUrlMeta = async (url: string, title: string): Promise<any> => {
  try {
    const response: any = await axios.get(url, {
      headers: { "cors-origin": "*" },
    });
    const contentType =
      response?.headers.get("content-type") || "url/undefined";
    if (contentType.includes("pdf" || title.includes("pdf"))) return "pdf";
    if (contentType.includes("csv")) return "sheets";
    return "default";
  } catch (err) {
    console.error(err);
    if (title.includes("pdf")) return "pdf";
    if (title.includes("csv")) return "csv";
    return "default";
  }
};

export const fetchSourcesData = async (sources: any) => {
  const sourcesData = await Promise.all(
    sources.map(async (source: any) => {
      const iconType: "pdf" | "sheets" | "docs" | "default" =
        await fetchUrlMeta(source.url, source?.title);

      return { ...source, iconType };
    })
  );
  return sourcesData;
};
