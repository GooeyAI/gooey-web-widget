// Renders a tool call's inputs / output as readable text instead of raw JSON:
// objects become label/value lists, arrays become lists, strings stay as text.
const MAX_DEPTH = 4;
const SHORT_ITEM = 40;
const URL_ONLY = /^https?:\/\/\S+$/;

// "search_query" / "searchQuery" / "search-query" → "Search query"
export function humanizeKey(key: string): string {
  const words = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
    .toLowerCase();
  return (words.charAt(0).toUpperCase() + words.slice(1)).replace(
    /\b(url|uri|id|api|html|json|ai)\b/gi,
    (acronym) => acronym.toUpperCase(),
  );
}

// Tool results often arrive as JSON text; show the structure, not the quotes
function parseIfJson(value: string): unknown {
  const trimmed = value.trim();
  if (trimmed[0] !== "{" && trimmed[0] !== "[") return value;
  try {
    return JSON.parse(trimmed);
  } catch {
    return value;
  }
}

function isPrimitive(value: unknown) {
  return value === null || typeof value !== "object";
}

// a few short primitives read best inline instead of as a list
function isInlineList(items: unknown[]) {
  return (
    items.length <= 6 &&
    items.every(
      (item) => isPrimitive(item) && String(item).length <= SHORT_ITEM,
    )
  );
}

// nested content gets its own block below its key, not beside it
function isBlock(value: unknown) {
  const data = typeof value === "string" ? parseIfJson(value) : value;
  if (Array.isArray(data)) return data.length > 0 && !isInlineList(data);
  if (data && typeof data === "object") return Object.keys(data).length > 0;
  return false;
}

export function ToolValue({
  value,
  depth = 0,
}: {
  value: unknown;
  depth?: number;
}) {
  const data = typeof value === "string" ? parseIfJson(value) : value;

  if (data === null || data === undefined) {
    return <span className="tool-value-muted">None</span>;
  }

  if (typeof data === "string") {
    if (!data.trim()) return <span className="tool-value-muted">Empty</span>;
    if (URL_ONLY.test(data.trim())) {
      return (
        <a
          href={data.trim()}
          target="_blank"
          rel="noopener noreferrer"
          className="tool-value-link"
        >
          {data.trim()}
        </a>
      );
    }
    return <span className="tool-value-text">{data}</span>;
  }

  if (typeof data === "boolean") return <span>{data ? "Yes" : "No"}</span>;
  if (typeof data === "number" || typeof data === "bigint") {
    return <span>{String(data)}</span>;
  }

  if (Array.isArray(data)) {
    if (!data.length) return <span className="tool-value-muted">None</span>;
    if (depth >= MAX_DEPTH) return <ToolValueRaw value={data} />;
    if (isInlineList(data)) {
      return <span>{data.map((item) => String(item)).join(", ")}</span>;
    }
    return (
      <ul className="tool-value-list">
        {data.map((item, i) => (
          <li key={i} className={isPrimitive(item) ? undefined : "is-nested"}>
            <ToolValue value={item} depth={depth + 1} />
          </li>
        ))}
      </ul>
    );
  }

  const entries = Object.entries(data as Record<string, unknown>).filter(
    ([, v]) => v !== undefined,
  );
  if (!entries.length) return <span className="tool-value-muted">None</span>;
  if (depth >= MAX_DEPTH) return <ToolValueRaw value={data} />;
  return (
    <dl className="tool-value-object">
      {entries.map(([key, v]) => (
        <div
          key={key}
          className={
            isBlock(v) ? "tool-value-entry is-block" : "tool-value-entry"
          }
        >
          <dt>{humanizeKey(key)}</dt>
          <dd>
            <ToolValue value={v} depth={depth + 1} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

// Too deeply nested to lay out; fall back to compact JSON
function ToolValueRaw({ value }: { value: unknown }) {
  return <code className="tool-value-raw">{JSON.stringify(value)}</code>;
}
