import clsx from "clsx";
import IconExternalLink from "src/assets/SvgIcons/IconExternalLink";
import IconGoogleDocs from "src/assets/SvgIcons/IconGoogleDocs";
import IconListTimeline from "src/assets/SvgIcons/IconListTimeline";
import IconPDF from "src/assets/SvgIcons/IconPDF";
import IconSheets from "src/assets/SvgIcons/IconSheets";
import IconYoutube from "src/assets/SvgIcons/IconYoutube";

import { useEffect, useState } from "react";
import { fetchSourcesData } from "./helpers";

const ICONS_DICT = {
  youtube: IconYoutube,
  sheets: IconSheets,
  docs: IconGoogleDocs,
  pdf: () => <IconPDF style={{ fill: "#F40F02" }} size={12} />,
  default: () => <IconExternalLink size={10} />,
};

const SourcesCard = (props: any) => {
  const { data, index, onClick } = props;
  const [title] = (data?.title || "").split(",");

  if (!data) return null;
  const hasFormat = title?.includes(".");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const Icon = ICONS_DICT[data?.iconType || "default"];
  return (
    <button
      onClick={onClick}
      className={clsx("gp-0 gm-0 text-left", index === 0 && "gml-48")}
      style={{ height: "64px" }}
    >
      <div
        className={clsx(
          "sources-card d-flex flex-col justify-between",
          index !== data.length - 1 && "gmr-12"
        )}
      >
        <p className="font_10_500">
          {hasFormat ? title.slice(0, title.length - 4) : title}
        </p>
        {!!Icon && <Icon />}
      </div>
    </button>
  );
};

const Sources = ({ data }: any) => {
  const openInWindow = (url: string) => window.open(url, "_blank");
  const [sourcesData, setSourcesData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data || !data.length) return;
    fetchSourcesData(data).then((sourcesData) => {
      setSourcesData(sourcesData);
      setLoading(false);
    });
  }, [data]);

  if (!data || !data.length) return null;
  return (
    <div className="gmb-8">
      <div className="d-flex align-center gpl-16">
        <IconListTimeline size={16} />
        <p className="font_16_400 gml-20">Sources</p>
      </div>
      <div className="gmt-8 sources-listContainer">
        {!loading
          ? sourcesData.map((source: any, index: number) => (
              <SourcesCard
                key={source?.title + index}
                data={source}
                index={index}
                onClick={openInWindow.bind(null, source?.url)}
              />
            ))
          : data?.map((source: any, index: number) => {
              const [title, pageNum] = (source?.title || "").split(",");
              const hasFormat = title?.includes(".");
              return (
                <button
                  onClick={() => openInWindow(source?.url)}
                  style={{ height: "64px" }}
                  className={clsx(
                    "sources-card d-flex flex-col justify-between pos-relative",
                    index === 0 && "gml-48",
                    index !== data.length - 1 && "gmr-12"
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
                    style={{
                      position: "absolute",
                      bottom: "6px",
                      right: "8px",
                    }}
                  >
                    <IconExternalLink size={8} />
                  </div>
                </button>
              );
            })}
      </div>
    </div>
  );
};

export default Sources;
