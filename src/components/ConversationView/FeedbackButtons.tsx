import clsx from "clsx";
import Button from "src/components/shared/Buttons/Button";
import { getFeedbackButtonIcon } from "./helpers";
import style from "./incoming.scss?inline";
import { addInlineStyle } from "src/addStyles";
addInlineStyle(style);

type ReplyButton = {
  id: string;
  title: string;
  isPressed?: boolean;
};

type FeedbackButtonsProps = {
  data: {
    buttons: ReplyButton[];
    bot_message_id: string;
  };
  onFeedbackClick: (button: ReplyButton) => void;
};

const FeedbackButton = ({
  button,
  onClick,
  className,
}: {
  button: ReplyButton;
  onClick: () => void;
  className?: string;
}) => {
  const icon = getFeedbackButtonIcon(button.id, button.isPressed || false);
  return icon ? (
    <div className={clsx("my-auto", className)}>
      <Button className="text-muted" onClick={onClick}>
        {icon}
      </Button>
    </div>
  ) : (
    <Button
      className={clsx("text-left", className)}
      variant="outlined"
      onClick={onClick}
      hideOverflow={false}
    >
      {button.title}
    </Button>
  );
};

export const FeedbackButtons = ({ data, onFeedbackClick }: FeedbackButtonsProps) => {
  const { buttons } = data;

  if (!buttons) return null;

  const thumbButtons: ReplyButton[] = [];
  const normalButtons: ReplyButton[] = [];

  buttons.forEach((button) => {
    if (
      button.id.includes("thumb") ||
      getFeedbackButtonIcon(button.id, button.isPressed || false)
    ) {
      thumbButtons.push(button);
    } else {
      normalButtons.push(button);
    }
  });

  return (
    <div>
      {thumbButtons.length > 0 && (
        <div>
          {normalButtons.length > 0 && (
            <div className="gooey-scroll-wrapper">
              <div
                className="d-flex flex-col sm-flex-row gooey-scroll-container gpl-36"
                style={{ gap: "12px" }}
              >
                {normalButtons.map((button) => (
                  <FeedbackButton
                    key={button.id}
                    button={button}
                    className="my-1 mx-md-2 w-100"
                    onClick={() => {
                      if (!button.isPressed) onFeedbackClick(button);
                    }}
                  />
                ))}
              </div>
              <div className="gooey-scroll-fade d-none sm-d-block" />
            </div>
          )}
          <div className="d-flex gmt-2 justify-content-start gml-36" style={{ gap: "4px" }}>
            {thumbButtons.map((button) => (
              <FeedbackButton
                key={button.id}
                button={button}
                onClick={() => {
                  if (!button.isPressed) onFeedbackClick(button);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
