import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import {
  extractFileDetails,
  extractMainDomain,
  fetchUrlMeta,
  findSourceIcon,
  getEmbedUrl,
  truncateMiddle,
} from "./helpers";
import { useSystemContext } from "src/contexts/hooks";
import IconButton from "src/components/shared/Buttons/IconButton";
import IconExternalLink from "src/assets/SvgIcons/IconExternalLink";
import IconClose from "src/assets/SvgIcons/IconClose";

const FullSourcePreview = (props: any) => {
  const { data, layoutController, metaData } = props;
  if (!data || !data?.url) return null;
  const embedUrl = getEmbedUrl(data.url);
  const ExtensionIcon: any = findSourceIcon(
    metaData?.content_type,
    metaData?.redirect_urls[0] || data?.url,
    24,
  );
  return (
    <div className="flex-1 d-flex flex-col">
      <div className="b-1 gp-10 w-100 d-flex justify-between align-center bg-white">
        <div className="d-flex align-center" style={{ maxWidth: "90%" }}>
          {ExtensionIcon || !metaData?.logo ? (
            <ExtensionIcon />
          ) : (
            <img
              src={metaData?.logo}
              alt={data?.title}
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "100px",
                objectFit: "contain",
              }}
            />
          )}
          <p
            className="font_16_500 m-0 flex-1 gml-8"
            style={{
              maxWidth: "85%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {data?.title}
          </p>
          <IconButton
            onClick={() => window.open(data?.url, "_ablank")}
            variant="text-alt"
            className="gml-4"
          >
            <IconExternalLink size={14} />
          </IconButton>
        </div>
        <IconButton
          onClick={() => layoutController?.toggleSecondaryDrawer(null)}
          variant="text-alt"
          className="gp-6"
        >
          <IconClose size={20} />
        </IconButton>
      </div>
      <iframe
        src={embedUrl}
        className="flex-1"
        style={{ height: "100%", width: "100%", border: 0 }}
      />
    </div>
  );
};

interface Data {
  url: string;
  title: string;
  refNumber?: string;
}

const SourcesCard = (props: { data: Data; index: number }) => {
  const { data } = props;
  const { getTempStoreValue, setTempStoreValue, layoutController } =
    useSystemContext();
  const [metaData, setMetaData] = useState<any>(
    getTempStoreValue?.(data.url) || null,
  );
  const { mainString } = extractFileDetails(data?.title);
  const [title, pageNum] = (mainString || "").split(",");

  useEffect(() => {
    if (!data || metaData || getTempStoreValue?.(data.url)) return;
    try {
      fetchUrlMeta(data.url).then((meta) => {
        if (Object.keys(meta).length) {
          if (meta?.title === "- YouTube") {
            meta.title = data.title;
          }
          setMetaData(meta);
          setTempStoreValue?.(data.url, meta);
        }
      });
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redirectedUrl =
    metaData?.redirect_urls[metaData?.redirect_urls.length - 1] || data?.url;
  const [domainName]: any = extractMainDomain(redirectedUrl || data?.url);
  const ExtensionIcon: any = findSourceIcon(
    metaData?.content_type,
    metaData?.redirect_urls[0] || data?.url,
  );
  const domainNameText = domainName.includes("googleapis")
    ? ""
    : domainName + (data?.refNumber || pageNum ? "⋅" : "");

  const openInWindow = () => window.open(data?.url, "_blank");
  const openInSidebar = useCallback(() => {
    layoutController?.toggleSecondaryDrawer?.(() => (
      <FullSourcePreview
        data={data}
        layoutController={layoutController}
        metaData={metaData}
      />
    ));
  }, [data, layoutController, metaData]);

  const isCsv = metaData?.content_type?.includes("csv");
  const onClick = isCsv ? openInWindow : openInSidebar;

  if (!data) return null;
  return (
    <button
      onClick={onClick.bind(null)}
      className={clsx(
        "pos-relative sources-card gp-0 gm-0 text-left overflow-hidden gmr-8",
      )}
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
        <p
          className={clsx("font_10_600", metaData?.image ? "text-white" : "")}
          style={{ margin: 0 }}
        >
          {truncateMiddle(metaData?.title || title, 50)}
        </p>
        <div
          className={clsx(
            "d-flex align-center font_10_600",
            metaData?.image ? "text-white" : "text-muted",
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
              metaData?.image ? "text-white" : "text-muted",
            )}
            style={{ margin: 0 }}
          >
            {domainNameText +
              (pageNum ? pageNum.trim() : "") +
              (data?.refNumber
                ? `${pageNum ? "⋅" : ""}[${data?.refNumber}]`
                : "")}
          </p>
        </div>
      </div>
    </button>
  );
};

const Sources = ({ data }: any) => {
  if (!data || !data.length) return null;
  return (
    <div className="text-reveal-container">
      <div className="gmt-16 sources-listContainer">
        {data.map((source: any, index: number) => (
          <SourcesCard
            key={source?.title + index}
            data={source}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Sources;
