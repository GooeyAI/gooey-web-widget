import clsx from "clsx";

type BotAvatarProps = {
  /** width & height of the avatar in px (it is always a circle) */
  size: number;
  src?: string;
  /** extra classes for the wrapper, e.g. margin utilities */
  className?: string;
};

const BotAvatar = ({ size, src, className }: BotAvatarProps) => {
  if (!src) return null;
  return (
    <div
      className={clsx("bot-avatar bg-primary", className)}
      style={{ width: size, height: size, borderRadius: "100%" }}
    >
      <img
        src={src || "https://gooey.ai/favicon.ico"}
        alt="bot-avatar"
        style={{
          width: size,
          height: size,
          borderRadius: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default BotAvatar;
