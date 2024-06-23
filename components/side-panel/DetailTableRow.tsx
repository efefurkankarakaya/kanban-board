import { IconType } from "react-icons";
import CopyButton from "./CopyButton";
import { PropsWithChildren } from "react";

interface Props {
  title: string;
  titleIcon: IconType;
  clipboardText: string;
}

const DetailTableRow = (props: PropsWithChildren<Props>) => {
  return (
    <tr className="hover:bg-neutral-600/50">
      <td>
        <p className="flex flex-row text-neutral-400 font-light text-sm items-center truncate">
          <props.titleIcon />
          &nbsp;{props.title}
        </p>
      </td>
      <td className="text-sm rounded-sm">{props.children}</td>
      <td className="text-neutral-400">
        <CopyButton text={props.clipboardText} />
      </td>
    </tr>
  );
};

export default DetailTableRow;
