import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import Button from "src/components/shared/Buttons/Button";
import IconGlobeNet from "src/assets/SvgIcons/IconGlobeNet";
import clsx from "clsx";

import { addInlineStyle } from "src/addStyles";
import style from "./incoming.scss?inline";
addInlineStyle(style);

export const DEMO_QUERIES = {
  a: "When should I plant chili?",
  b: "How can I get rid of black ants on my coffee?",
  c: "How long a Europe tour should be ?",
  d: "What are places to visit as a tourist in France ?",
};

const BotProfile = () => {
  const branding = useSystemContext().config?.branding;
  if (!branding) return null;
  return (
    <div className="d-flex flex-col justify-center align-center text-center">
      {branding.photoUrl && (
        <div
          className="bot-avatar gmr-8 gmb-24 bg-background"
          style={{
            width: "128px",
            height: "128px",
            borderRadius: "100%",
            boxShadow: "0 0 4px 1px $border-color",
          }}
        >
          {" "}
          <img
            src={branding.photoUrl}
            alt="bot-avatar"
            style={{
              width: "128px",
              height: "128px",
              borderRadius: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      )}
      <div>
        <p className="font_24_500 gmb-16 text-primary">{branding.name}</p>
        <p className="font_12_500 text-secondary gmb-12 d-flex align-center justify-center">
          {branding.byLine}
          {branding.websiteUrl && (
            <span className="gml-4" style={{ marginBottom: "-2px" }}>
              <a
                href={branding.websiteUrl}
                target="_ablank"
                className="text-muted font_12_500"
              >
                <IconGlobeNet />
              </a>
            </span>
          )}
        </p>
        <p className="font_12_400 gpl-32 gpr-32">{branding.description}</p>
      </div>
    </div>
  );
};

const PlaceholderMessage = () => {
  const { initializeQuery } = useMessagesContext();
  const { config } = useSystemContext();
  const conversationStarters = config?.branding.conversationStarters ?? [];
  return (
    <div
      className="pos-sticky no-scroll-bar w-100 gpb-12 mw-760"
      style={{ bottom: "60px", overflow: "auto" }}
    >
      <BotProfile />
      <div className="gmt-48 gooey-placeholderMsg-container">
        {conversationStarters?.map((que) => (
          <Button
            key={que}
            onClick={() => initializeQuery?.({ input_prompt: que })}
            className={clsx("text-left font_12_500 w-100")}
            variant="text-alt"
          >
            {que}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PlaceholderMessage;
