import clsx from "clsx";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import {
  extractFileDetails,
  extractMainDomain,
  fetchUrlMeta,
  findSourceIcon,
  getEmbedUrl,
  renderImageInIframe,
  truncateMiddle,
} from "./helpers";
import { useSystemContext } from "src/contexts/hooks";
import IconButton from "src/components/shared/Buttons/IconButton";
import IconExternalLink from "src/assets/SvgIcons/IconExternalLink";
import IconClose from "src/assets/SvgIcons/IconClose";
import IconBooks from "src/assets/SvgIcons/IconBooks";
import IconCaretUp from "src/assets/SvgIcons/IconCaretUp";
import { MESSAGE_GUTTER } from ".";

export const FullSourcePreview = (props: any) => {
  const { data, layoutController, metaData } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fake loader for src reset
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  }, [data.url]);

  if (!data || (!data?.url && !data?.isImage)) return null;
  const embedUrl = data?.isImage
    ? renderImageInIframe(data.url)
    : getEmbedUrl(data.url);
  const ExtensionIcon: any = findSourceIcon(
    metaData?.content_type,
    data?.redirectedUrl || data?.url,
    24,
  );

  if (isLoading) return null;
  return (
    <div className="flex-1 d-flex flex-col">
      <div
        className="b-lt-1 b-rt-1 b-btm-1 gp-10 w-100 d-flex justify-between align-center bg-white"
        style={{ height: "56px" }}
      >
        <div className="d-flex align-center" style={{ maxWidth: "90%" }}>
          {ExtensionIcon ? (
            <ExtensionIcon />
          ) : metaData?.logo ? (
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
          ) : null}
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

export const SourcesCard = (props: { data: Data; index: number }) => {
  const { data } = props;
  const { getTempStoreValue, setTempStoreValue, layoutController, config } =
    useSystemContext();
  const [metaData, setMetaData] = useState<any>(
    getTempStoreValue?.(data.url) || null,
  );
  const { mainString } = extractFileDetails(data?.title);
  const [title, pageNum] = (mainString || "").split(",");

  useEffect(() => {
    if (!data || metaData || getTempStoreValue?.(data.url)) return;
    fetchUrlMeta(data.url)
      .then((meta) => {
        if (meta && Object.keys(meta).length) {
          if (meta?.title === "- YouTube") {
            // was not able to fetch the title
            meta.title = data.title;
          }
          setMetaData(meta);
          setTempStoreValue?.(data.url, meta);
        }
      })
      .catch((err) => {
        console.log("error fetching url meta", err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redirectedUrl =
    metaData && metaData?.redirect_urls
      ? metaData?.redirect_urls[metaData?.redirect_urls?.length - 1]
      : data?.url;
  const [domainName]: any = extractMainDomain(redirectedUrl || data?.url);
  let MetadataIcon: any = findSourceIcon(
    metaData?.content_type,
    redirectedUrl || data?.url,
  );
  if (!MetadataIcon && metaData?.logo) {
    MetadataIcon = () => (
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
    );
  }

  const domainNameText = domainName.includes("googleapis")
    ? ""
    : domainName + (data?.refNumber || pageNum ? "⋅" : "");

  const openInWindow = () => window.open(data?.url, "_blank");
  const openInSidebar = useCallback(() => {
    layoutController?.toggleSecondaryDrawer?.(() => (
      <FullSourcePreview
        data={{ ...data, redirectedUrl }}
        layoutController={layoutController}
        metaData={metaData}
      />
    ));
  }, [data, layoutController, metaData, redirectedUrl]);

  const isCsv = metaData?.content_type?.includes("csv");
  const enableSourcePreview =
    config?.enableSourcePreview === undefined
      ? true
      : config?.enableSourcePreview;
  const onClick = isCsv || !enableSourcePreview ? openInWindow : openInSidebar;

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
            filter: "brightness(0.6)",
            transition: "all 1s ease-in-out",
          }}
          className="bg-filter"
        />
      )}
      <div
        className="d-flex flex-col justify-between gp-6"
        style={{
          zIndex: 1,
          height: "100%",
        }}
      >
        <p
          className={clsx("font_10_600", metaData?.image ? "text-white" : "")}
          style={{
            margin: 0,
          }}
        >
          {truncateMiddle(metaData?.title || title, 50)}
        </p>
        <div
          className={clsx(
            "d-flex align-center font_10_600",
            metaData?.image ? "text-white" : "text-muted",
          )}
        >
          {MetadataIcon && <MetadataIcon />}
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

export const SourcesSection = (data: any) => {
  const { references = [], enableSourcePreview }: any = data;
  const sources = [...references];
  const { config } = useSystemContext();
  const [isExpanded, setIsExpanded] = useState<boolean>(
    config?.expandedSources || false,
  );

  const toggleExpansion = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="gmb-8">
      <div
        className={clsx(
          `d-flex align-center gpt-4 gpb-8`,
          `gpl-${MESSAGE_GUTTER} gpr-${MESSAGE_GUTTER}`,
        )}
      >
        <span
          style={{ height: "24px", width: "24px" }}
          className="d-flex justify-center align-center gmr-8"
        >
          <IconBooks />
        </span>
        <div className="d-flex cr-pointer" onClick={toggleExpansion}>
          <h4 className="font_14_500 gmr-6">Sources</h4>
          <IconButton
            variant="filled"
            className={clsx(
              "bg-light gp-2",
              isExpanded ? "chevron-down" : "chevron-up",
            )}
            onClick={toggleExpansion}
          >
            <IconCaretUp size={12} />
          </IconButton>
        </div>
      </div>
      {isExpanded && (
        <Sources
          data={sources}
          enableSourcePreview={config?.enableSourcePreview}
        />
      )}
    </div>
  );
};

const Sources = ({
  data,
  isInline = false,
}: {
  data: any;
  isInline?: boolean;
}) => {
  if (!data || !data.length) return null;
  return (
    <div className="text-reveal-container">
      <div className="gooey-scroll-wrapper">
        <div className="gpb-8 gpt-4 sources-listContainer gooey-scroll-container">
          {data.map((source: any, index: number) => (
            <div
              className={clsx(index === 0 && !isInline && "gml-40")}
              key={source?.title + index}
            >
              <SourcesCard data={source} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sources;
