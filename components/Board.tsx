"use client";

import { useState } from "react";
import { Reorder } from "framer-motion";
import Column from "./Column";
import columnData from "@/data/column.json";

interface Props {
  boardData: IBoardModel;
}

const Board = (props: Props) => {
  const [columns, setColumns] = useState(columnData);

  return (
    <div>
      <h2 className="text-white text-4xl font-semibold mb-3">Roadmap</h2>
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
    </div>
  );
};

export default Board;
