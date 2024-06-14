"use client";

import Board from "@/components/Board";
import data from "@/data/column.json";

export default function Home() {
  return (
    <main>
      <Board
        boardData={{
          "_id": "1",
          "_userName": "efk",
          "title": "Roadmap"
        }}
      />
    </main>
  );
}
