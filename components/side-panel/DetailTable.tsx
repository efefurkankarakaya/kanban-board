import { FiLoader } from "react-icons/fi";
import RowTitle from "./RowTitle";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { WiTime9 } from "react-icons/wi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { ITaskModel } from "@/models/task.model";
import CopyButton from "./CopyButton";

interface Props {
  activeTask: ITaskModel;
}

const DetailTable = ({ activeTask }: Props) => {
  return (
    <table className="table-auto">
      <tbody className="[&>tr>td]:p-2">
        <tr className="hover:bg-neutral-600/50">
          <td>
            <RowTitle
              title="Status"
              icon={FiLoader}
            />
          </td>
          {/* TODO: Zustand or GET getColumnDetail */}
          <td className="text-sm rounded-sm">{activeTask._columnId}</td>
          <td className="text-neutral-400">
            <CopyButton text={activeTask._columnId} />
          </td>
        </tr>
        <tr>
          <td>
            <RowTitle
              title="Created At"
              icon={WiTime9}
            />
          </td>
          <td className="text-sm">{new Date(activeTask.createdAt).toDateString()}</td>
          <td className="text-neutral-400">
            <CopyButton text={new Date(activeTask.createdAt).toDateString()} />
          </td>
        </tr>
        <tr>
          <td>
            <RowTitle
              title="Edited At"
              icon={WiTime9}
            />
          </td>
          <td className="text-sm">{new Date(activeTask.editedAt).toDateString()}</td>
          <td className="text-neutral-400">
            <CopyButton text={new Date(activeTask.editedAt).toDateString()} />
          </td>
        </tr>
        <tr>
          <td>
            <RowTitle
              title="Completed At"
              icon={FaRegCalendarAlt}
            />
          </td>
          <td className="text-sm">{activeTask.completedAt ? new Date(activeTask.completedAt).toDateString() : ""}</td>
          <td className="text-neutral-400">
            <CopyButton text={activeTask.completedAt ? new Date(activeTask.completedAt).toDateString() : ""} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default DetailTable;
