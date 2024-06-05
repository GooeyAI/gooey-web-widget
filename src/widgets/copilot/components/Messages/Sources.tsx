import clsx from "clsx";
import IconListTimeline from "src/assets/SvgIcons/IconListTimeline";
import { useEffect, useState } from "react";
import {
  extractMainDomain,
  fetchUrlMeta,
  findSourceIcon,
  truncateMiddle,
} from "./helpers";

const SourcesCard = (props: any) => {
  const { data, index, onClick } = props;
  const [metaData, setMetaData] = useState<any>(null);
  const [title, pageNum] = (data?.title || "").split(",");

  useEffect(() => {
    if (!data || metaData) return;
    try {
      fetchUrlMeta(data.url).then((meta) => {
        if (Object.keys(meta).length) setMetaData(meta);
      });
    } catch (e) {
      console.error(e);
    }
  }, [data, metaData]);

  const [domainName]: any = extractMainDomain(data?.url);
  const ExtensionIcon: any = findSourceIcon(
    metaData?.content_type,
    metaData?.redirect_urls[0] || data?.url
  );
  const domainNameText = domainName + (data?.refNumber || pageNum ? " ⋅" : "");
  if (!data) return null;
  return (
    <button
      onClick={onClick}
      className={clsx(
        "pos-relative sources-card gp-0 gm-0 text-left overflow-hidden",
        index === 0 && "gml-48",
        index !== data.length - 1 && "gmr-12"
      )}
      style={{ height: "64px" }}
    >
      {metaData?.image && (
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            left: 0,
            top: 0,
            background: `url(${metaData?.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
            filter: "brightness(0.4)",
            transition: "all 1s ease-in-out",
          }}
        />
      )}
      <div
        className="d-flex flex-col justify-between gp-6"
        style={{ zIndex: 1, height: "100%" }}
      >
        <p className={clsx("font_10_600", metaData?.image ? "text-white" : "")}>
          {truncateMiddle(metaData?.title || title, 50)}
        </p>
        <div
          className={clsx(
            "d-flex align-center font_10_600",
            metaData?.image ? "text-white" : "text-muted"
          )}
        >
          {ExtensionIcon || !metaData?.logo ? (
            <ExtensionIcon />
          ) : (
            <img
              src={metaData?.logo}
              alt={data?.title}
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "100px",
                objectFit: "contain",
              }}
            />
          )}
          <p
            className={clsx(
              "font_10_500 gml-4",
              metaData?.image ? "text-white" : "text-muted"
            )}
          >
            {domainNameText}
            {pageNum && !domainNameText ? pageNum : ""}
            {data?.refNumber ? `${pageNum ? "⋅ " : ''}[${data?.refNumber}]` : ""}
          </p>
        </div>
      </div>
    </button>
  );
};

const Sources = ({ data }: any) => {
  const openInWindow = (url: string) => window.open(url, "_blank");

  if (!data || !data.length) return null;
  return (
    <div className="gmb-8">
      <div className="d-flex align-center gpl-16">
        <IconListTimeline size={16} />
        <p className="font_16_600 gml-20">Sources</p>
      </div>
      <div className="gmt-8 sources-listContainer">
        {data.map((source: any, index: number) => (
          <SourcesCard
            key={source?.title + index}
            data={source}
            index={index}
            onClick={openInWindow.bind(null, source?.url)}
          />
        ))}
      </div>
    </div>
  );
};

export default Sources;
