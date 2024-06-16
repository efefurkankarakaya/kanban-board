interface Props {
  beforeId: string | null;
  columnId: string;
}

const DropIndicator = ({ beforeId, columnId }: Props) => {
  // console.log("[DropIndicator] beforeId, columnId: ", beforeId, columnId);

  return (
    <div
      data-before={beforeId || "-1"}
      data-column={columnId}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

export default DropIndicator;
