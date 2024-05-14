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
  const { data, index, onClick, loading } = props;
  const [title, pageNum] = (data?.title || "").split(",");

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
        <div className="d-flex ">
          {!!Icon && !loading && <Icon />}
          {!!pageNum && (
            <p className="font_10_500 gml-4">
              {pageNum}
              {pageNum ? "⋅" : ""}[{index + 1}]
            </p>
          )}
        </div>
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
        {(loading ? data : sourcesData).map((source: any, index: number) => (
          <SourcesCard
            key={source?.title + index}
            data={source}
            index={index}
            onClick={openInWindow.bind(null, source?.url)}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default Sources;
