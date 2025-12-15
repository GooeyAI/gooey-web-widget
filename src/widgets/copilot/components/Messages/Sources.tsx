import clsx from "clsx";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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

// Types
interface SourceData {
  url: string;
  title: string;
  refNumber?: string;
}

interface Metadata {
  content_type?: string;
  title?: string;
  logo?: string;
  image?: string;
  redirect_urls?: string[];
}

// Custom hooks
const useMetadata = (url: string) => {
  const { getTempStoreValue, setTempStoreValue } = useSystemContext();
  const [metadata, setMetadata] = useState<Metadata | null>(
    getTempStoreValue?.(url) || null,
  );

  useEffect(() => {
    if (!url || metadata || getTempStoreValue?.(url)) return;

    fetchUrlMeta(url)
      .then((meta) => {
        if (meta && Object.keys(meta).length) {
          if (meta?.title === "- YouTube") {
            meta.title = ""; // Will use fallback title
          }
          setMetadata(meta);
          setTempStoreValue?.(url, meta);
        }
      })
      .catch((err) => {
        console.log("error fetching url meta", err);
      });
  }, [url, metadata, getTempStoreValue, setTempStoreValue]);

  return metadata;
};

const useSourceIcon = (metadata: Metadata | null, url: string) => {
  const redirectedUrl = metadata?.redirect_urls?.length
    ? metadata.redirect_urls[metadata.redirect_urls.length - 1]
    : url;

  return useMemo(() => {
    if (metadata?.content_type) {
      return findSourceIcon(metadata.content_type, redirectedUrl);
    }
    return findSourceIcon("", redirectedUrl);
  }, [metadata?.content_type, redirectedUrl]);
};

const useSourceActions = (data: SourceData, metadata: Metadata | null) => {
  const { layoutController, config } = useSystemContext();
  const redirectedUrl = metadata?.redirect_urls?.length
    ? metadata.redirect_urls[metadata.redirect_urls.length - 1]
    : data.url;

  const openInWindow = useCallback(
    () => window.open(data.url, "_blank"),
    [data.url],
  );

  const openInSidebar = useCallback(() => {
    layoutController?.toggleSecondaryDrawer?.(() => (
      <FullSourcePreview
        data={{ ...data, redirectedUrl }}
        layoutController={layoutController}
        metaData={metadata}
      />
    ));
  }, [data, layoutController, metadata, redirectedUrl]);

  const isCsv = metadata?.content_type?.includes("csv");
  const enableSourcePreview = config?.enableSourcePreview ?? true;

  return {
    onClick: isCsv || !enableSourcePreview ? openInWindow : openInSidebar,
  };
};

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

export const SourcesCard = ({ data }: { data: SourceData }) => {
  const metadata = useMetadata(data.url);
  const { onClick } = useSourceActions(data, metadata);

  const { mainString } = extractFileDetails(data?.title);
  const [title, pageNum] = (mainString || "").split(",");

  const redirectedUrl = metadata?.redirect_urls?.length
    ? metadata.redirect_urls[metadata.redirect_urls.length - 1]
    : data.url;
  const [domainName] = extractMainDomain(redirectedUrl) || [""];

  if (!data) return null;

  return (
    <button
      onClick={onClick}
      className="pos-relative sources-card gp-0 gm-0 text-left overflow-hidden gmr-8"
    >
      {metadata?.image && (
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            left: 0,
            top: 0,
            background: `url(${metadata.image})`,
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
        className="d-flex flex-col justify-between gp-6 overflow-hidden"
        style={{ zIndex: 1, height: "100%" }}
      >
        <p
          className={clsx("font_10_600", metadata?.image ? "text-white" : "")}
          style={{ margin: 0 }}
        >
          {truncateMiddle(metadata?.title || title, 50)}
        </p>
        <div
          className={clsx(
            "d-flex align-center font_10_600",
            metadata?.image ? "text-white" : "text-muted",
          )}
        >
          <SourceIcon metadata={metadata} url={data.url} />
          <p
            className={clsx(
              "font_10_500 gml-4",
              metadata?.image ? "text-white" : "text-muted",
            )}
            style={{ margin: 0 }}
          >
            {getDomainText(domainName, data.refNumber, pageNum)}
          </p>
        </div>
      </div>
    </button>
  );
};

const SourceIcon = ({
  metadata,
  url,
}: {
  metadata: Metadata | null;
  url: string;
}) => {
  const Icon = useSourceIcon(metadata, url);

  if (Icon) return <Icon />;

  if (metadata?.logo) {
    return (
      <img
        src={metadata.logo}
        alt=""
        style={{
          width: "14px",
          height: "14px",
          borderRadius: "100px",
          objectFit: "contain",
        }}
      />
    );
  }

  return null;
};

const getDomainText = (
  domainName: string,
  refNumber?: string,
  pageNum?: string,
) => {
  const baseText = domainName.includes("googleapis")
    ? ""
    : domainName + (refNumber || pageNum ? "⋅" : "");

  return (
    baseText +
    (pageNum ? pageNum.trim() : "") +
    (refNumber ? `${pageNum ? "⋅" : ""}[${refNumber}]` : "")
  );
};

export const SourcesSection = ({
  references = [],
}: {
  references: SourceData[];
}) => {
  const { config } = useSystemContext();
  const [isExpanded, setIsExpanded] = useState(
    config?.expandedSources || false,
  );

  const toggleExpansion = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <div className="gmb-8 gmt-8">
      <div
        className={clsx(
          "d-flex align-center gpt-4 gpb-8",
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
      {isExpanded && references && references?.length && (
        <SourcesList sources={references} />
      )}
    </div>
  );
};

const SourcesList = ({
  sources,
  isInline = false,
}: {
  sources: SourceData[];
  isInline?: boolean;
}) => {
  if (!sources || !sources?.length) return null;

  return (
    <div className="text-reveal-container">
      <div className="gooey-scroll-wrapper">
        <div className="gpb-8 gpt-4 sources-listContainer gooey-scroll-container">
          {sources.map((source, index) => (
            <div
              className={clsx(index === 0 && !isInline && "gml-40")}
              key={`${source?.title}-${index}`}
            >
              <SourcesCard data={source} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SourcesList;
