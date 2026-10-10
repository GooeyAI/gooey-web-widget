import { ThinkingLine } from "src/components/shared/ThinkingLine";

const ResponseLoader = (props: any) => {
  if (!props.show) return null;
  return (
    <div className="gpl-16">
      <ThinkingLine />
    </div>
  );
};

export default ResponseLoader;
