import clsx from "clsx";

type Props = {
  children: JSX.Element | JSX.Element[] | (() => JSX.Element);
  view?: string;
  onViewChange?: (val: string) => void;
};

const AppLayout = ({
  children,
}: Props) => {
  return (
    <main className="h-100 d-flex flex-col">
      <div
        className={clsx("pos-absolute w-100")}
      />
      <>
        <div
          style={{ flex: "1 1 0%", overflowY: "hidden" }}
          className="pos-relative d-flex flex-col"
        >
          <>{children}</>
        </div>
      </>
    </main>
  );
};

export default AppLayout;
