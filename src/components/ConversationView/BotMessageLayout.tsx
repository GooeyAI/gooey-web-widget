import { ReactNode } from "react";

type BotMessageLayoutProps = {
  children: ReactNode;
  photoUrl?: string;
};

export const BotMessageLayout = ({ children, photoUrl }: BotMessageLayoutProps) => {
  return (
    <div className="d-flex align-start">
      {photoUrl && (
        <div
          className="bot-avatar bg-primary gmr-12"
          style={{ width: "24px", height: "24px", borderRadius: "100%" }}
        >
          <img
            src={photoUrl}
            alt="bot-avatar"
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      )}
      <div className="gmt-2 mw-100 overflow-hidden">{children}</div>
    </div>
  );
};
