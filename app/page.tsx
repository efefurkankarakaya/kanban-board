"use client";

// import Board from "@/components/Board";
import Kanban from "@/components/Kanban";

export default function Home() {
  return (
    <main>
      {/* <Board
        boardData={{
          "_id": "1",
          "_userName": "efk",
          "title": "Roadmap"
        }}
      /> */}
      <Kanban />
    </main>
  );
}
