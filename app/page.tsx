"use client";

import Board from "@/components/Board";
import data from "@/data/column.json";

export default function Home() {
  return (
    <main>
      <Board data={data} />
    </main>
  );
}
