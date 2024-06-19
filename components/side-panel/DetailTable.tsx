"use client";

import { FiLoader } from "react-icons/fi";
import RowTitle from "./RowTitle";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { WiTime9 } from "react-icons/wi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { ITaskModel } from "@/models/task.model";

interface Props {
  activeTask: ITaskModel;
}

const DetailTable = ({ activeTask }: Props) => {
  return (
    <table className="table-auto">
      <tbody className="[&>tr>td]:p-2">
        <tr>
          <td>
            <RowTitle
              title="Status"
              icon={FiLoader}
            />
          </td>
          {/* TODO: Zustand or GET getColumnDetail */}
          <td className="text-sm">{activeTask._columnId}</td>
          <td className="text-neutral-400">
            <HiOutlineClipboardDocument />
          </td>
        </tr>
        <tr>
          <td>
            <RowTitle
              title="Created At"
              icon={WiTime9}
            />
          </td>
          <td className="text-sm">{new Date().toDateString()}</td>
          <td className="text-neutral-400">
            <HiOutlineClipboardDocument />
          </td>
        </tr>
        <tr>
          <td>
            <RowTitle
              title="Edited At"
              icon={WiTime9}
            />
          </td>
          <td className="text-sm">{new Date().toDateString()}</td>
          <td className="text-neutral-400">
            <HiOutlineClipboardDocument />
          </td>
        </tr>
        <tr>
          <td>
            <RowTitle
              title="Completed At"
              icon={FaRegCalendarAlt}
            />
          </td>
          <td className="text-sm">{new Date().toDateString()}</td>
          <td className="text-neutral-400">
            <HiOutlineClipboardDocument />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default DetailTable;
