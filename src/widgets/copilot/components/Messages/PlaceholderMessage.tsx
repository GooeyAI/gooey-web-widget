import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import "./incoming.scss";
import Button from "src/components/shared/Buttons/Button";
import IconGlobeNet from "src/assets/SvgIcons/IconGlobeNet";

export const DEMO_QUERIES = {
  a: "When should I plant chili?",
  b: "How can I get rid of black ants on my coffee?",
  c: "How long a Europe tour should be ?",
  d: "What are places to visit as a tourist in France ?",
};

const BotProfile = () => {
  const { config }: any = useSystemContext();
  const { title, description, display_picture, created_by, creator_link } =
    config?.bot_profile;
  return (
    <div className="d-flex flex-col justify-center align-center text-center">
      <div
        className="bot-avatar mr-8 mb-24 bg-primary"
        style={{ width: "48px", height: "48px", borderRadius: "100%" }}
      >
        <img
          src={display_picture}
          alt="bot-avatar"
          style={{ width: "48px", height: "48px", borderRadius: "100%" }}
        />
      </div>
      <div>
        <p className="font_24_500 mb-16">{title}</p>
        <p className="font_12_500 text-muted mb-12 d-flex align-center justify-center">
          By {created_by}
          <a
            href={creator_link || "/"}
            target="_ablank"
            style={{ marginBottom: "-5px", color: "#eee" }}
            className="ml-6"
          >
            <IconGlobeNet size={14} />
          </a>
        </p>
        <p className="font_12_400 pl-32 pr-32">{description}</p>
      </div>
    </div>
  );
};

const PlaceholderMessage = () => {
  const { initializeQuery }: any = useMessagesContext();
  const { config } = useSystemContext();
  return (
    <div className="no-scroll-bar w-100">
      <BotProfile />
      <div className="w-100 mt-48">
        {config?.questions.map((que) => (
          <Button
            variant="outlined"
            onClick={() => initializeQuery(que)}
            className="mb-8 w-100 text-left font_12_500"
          >
            {que}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PlaceholderMessage;
