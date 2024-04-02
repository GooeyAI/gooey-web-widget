import clsx from "clsx";
import IconExternalLink from "src/assets/SvgIcons/IconExternalLink";
import IconListTimeline from "src/assets/SvgIcons/IconListTimeline";

const Sources = ({ data }: any) => {
  if (!data || !data.length) return null;
  const openInWindow = (url: string) => window.open(url, "_blank");
  return (
    <div style={{ overflowX: "visible" }} className="mb-8">
      <div className="d-flex align-center">
        <IconListTimeline size={16} />
        <p className="font_16_400 ml-20">Sources</p>
      </div>
      <div className="mt-8 ml-36 sources-listContainer">
        {data.map((source: any, index: number) => {
          if (!source) return null;
          const [title, pageNum] = (source?.title || "").split(",");
          const hasFormat = title?.includes(".");
          return (
            <div
              onClick={() => openInWindow(source?.url)}
              key={source?.title + index}
              className={clsx(
                "sources-card d-flex flex-col justify-between pos-relative",
                index !== data.length - 1 && "mr-12"
              )}
            >
              <p className="font_10_500">
                {hasFormat ? title.slice(0, title.length - 4) : title}
              </p>
              <p className="font_10_500">
                {pageNum}
                {pageNum ? "⋅" : ""}[{index + 1}]
              </p>
              <div
                style={{ position: "absolute", bottom: "6px", right: "8px" }}
              >
                <IconExternalLink size={8} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sources;
