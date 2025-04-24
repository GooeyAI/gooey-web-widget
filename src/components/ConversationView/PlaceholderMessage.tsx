import Button from "src/components/shared/Buttons/Button";
import IconGlobeNet from "src/assets/SvgIcons/IconGlobeNet";
import clsx from "clsx";

import { addInlineStyle } from "src/addStyles";
import style from "./incoming.scss?inline";
import { CopilotConfigType } from "src/contexts/types";
import { OnSendCallbackType } from "src/widgets/copilot/components/ChatInput";
addInlineStyle(style);

const DEMO_QUERIES = ["Hi, what can you do for me?", "What is your name?"];

const BotProfile = ({
  name,
  photoUrl,
  byLine,
  websiteUrl,
  description,
}: {
  name?: string;
  photoUrl?: string;
  byLine?: string;
  websiteUrl?: string;
  description?: string;
}) => {
  return (
    <div className="d-flex flex-col justify-center align-center text-center">
      {photoUrl && (
        <div
          className="bot-avatar gmr-8 gmb-24 bg-primary"
          style={{ width: "128px", height: "128px", borderRadius: "100%" }}
        >
          {" "}
          <img
            src={photoUrl}
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
        <p className="font_24_500 gmb-16">{name}</p>
        <p className="font_12_500 text-muted gmb-12 d-flex align-center justify-center">
          {byLine}
          {websiteUrl && (
            <span className="gml-4" style={{ marginBottom: "-2px" }}>
              <a
                href={websiteUrl}
                target="_ablank"
                className="text-muted font_12_500"
              >
                <IconGlobeNet />
              </a>
            </span>
          )}
        </p>
        <p className="font_12_400 gpl-32 gpr-32">{description}</p>
      </div>
    </div>
  );
};

const PlaceholderMessage = ({
  initializeQuery,
  config,
}: {
  initializeQuery: OnSendCallbackType;
  config: CopilotConfigType;
}) => {
  const conversationStarters =
    config?.branding.conversationStarters ?? DEMO_QUERIES;
  return (
    <div className="no-scroll-bar w-100 gpl-16">
      <BotProfile {...config?.branding} />
      <div className="gmt-48 gooey-placeholderMsg-container">
        {conversationStarters?.map((que) => (
          <Button
            key={que}
            variant="outlined"
            onClick={() => initializeQuery({ input_prompt: que })}
            className={clsx("text-left font_12_500 w-100")}
          >
            {que}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PlaceholderMessage;
