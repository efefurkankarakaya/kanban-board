"use client";

import { useState } from "react";
import { Reorder } from "framer-motion";
import Column from "./Column";

interface Props {
  data: IColumnModel[];
}

const Board = (props: Props) => {
  const [columns, setColumns] = useState(props.data);

  return (
    <Reorder.Group
      className="flex flex-row"
      axis="x"
      values={columns}
      onReorder={setColumns}
    >
      {columns.map((column) => (
        <Column
          key={column._id}
          data={column}
        />
      ))}
    </Reorder.Group>
  );
};

export default Board;
