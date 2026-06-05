import React, { useEffect } from "react";
import * as Sentry from "@sentry/react";
import clsx from "clsx";
import { Conversation } from "src/contexts/ConversationLayer";
import { getConversationTitle } from "./SideNavbar";

export const useServerConversations = ({
  fetchConversations,
  isSidebarOpen,
}: {
  fetchConversations?: () => Promise<Conversation[]>;
  isSidebarOpen: boolean;
}) => {
  const [serverConversations, setServerConversations] = React.useState<
    Conversation[] | null
  >(null);
  const [isServerConversationsLoading, setIsServerConversationsLoading] =
    React.useState(false);

  useEffect(() => {
    setServerConversations(null);
    setIsServerConversationsLoading(false);
  }, [fetchConversations]);

  useEffect(() => {
    if (!fetchConversations || !isSidebarOpen || serverConversations !== null)
      return;

    let cancelled = false;
    setIsServerConversationsLoading(true);

    fetchConversations()
      .then((result) => {
        if (cancelled) return;
        setServerConversations(result || []);
      })
      .catch((e) => {
        Sentry.captureException(e);
        if (cancelled) return;
        setServerConversations([]);
      })
      .finally(() => {
        if (cancelled) return;
        setIsServerConversationsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [fetchConversations, isSidebarOpen, serverConversations]);

  return {
    serverConversations,
    isServerConversationsLoading,
    isServerMode: !!fetchConversations,
  };
};

// Server-provided conversation entry; anchor navigates via `conversation.url`.
export function ServerConversationLink({
  conversation,
  onClick,
}: {
  conversation: Conversation;
  onClick: () => void;
}) {
  const title = getConversationTitle(conversation);
  return (
    <a
      href={conversation.url || "#"}
      onClick={onClick}
      className={clsx("d-block w-100 gp-8 gmb-6 text-left", "button-text-alt")}
      style={{
        color: "inherit",
        textDecoration: "none",
        borderRadius: "8px",
        border: "1px solid transparent",
      }}
    >
      <p
        className="font_14_400"
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          margin: 0,
          textDecoration: "none",
        }}
      >
        {title}
      </p>
    </a>
  );
}

const SKELETON_WIDTH_CYCLE = [
  "70%",
  "55%",
  "85%",
  "45%",
  "65%",
  "75%",
  "60%",
  "50%",
  "80%",
  "40%",
];
const SKELETON_ROW_COUNT = 50;
const SKELETON_WIDTHS = Array.from(
  { length: SKELETON_ROW_COUNT },
  (_, i) => SKELETON_WIDTH_CYCLE[i % SKELETON_WIDTH_CYCLE.length],
);

export const ConversationsSkeleton = () => {
  return (
    <div className="gp-8 flex-1 h-100">
      <div className="gmb-30">
        <div
          className="top-0 gpt-8 gpb-8 bg-grey pos-sticky"
          style={{ zIndex: 1 }}
        >
          <h5 className="gpl-8 text-muted" style={{ margin: 0 }}>
            <span
              className="gooey-skeleton-bar d-inline-block"
              style={{ width: "56px", height: "10px", verticalAlign: "middle" }}
            />
          </h5>
        </div>
        <ol>
          {SKELETON_WIDTHS.map((width, idx) => (
            <li key={idx}>
              <div
                className="d-block w-100 gp-8 gmb-6 text-left"
                style={{
                  borderRadius: "8px",
                  border: "1px solid transparent",
                }}
              >
                <p
                  className="font_14_400"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    margin: 0,
                  }}
                >
                  <span
                    className="gooey-skeleton-bar d-inline-block"
                    style={{
                      width,
                      height: "14px",
                      verticalAlign: "middle",
                    }}
                  />
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
