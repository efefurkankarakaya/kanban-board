import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  title: string;
}

const RowTitle = (props: Props) => {
  return (
    <p className="flex flex-row text-neutral-400 font-light text-sm items-center">
      <props.icon />
      &nbsp;{props.title}
    </p>
  );
};

export default RowTitle;
