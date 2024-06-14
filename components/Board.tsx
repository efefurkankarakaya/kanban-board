"use client";

import { useState } from "react";
import { Reorder } from "framer-motion";

const Board = () => {
  const [items, setItems] = useState([0, 1, 2, 3]);

  return (
    <Reorder.Group
      axis="x"
      values={items}
      onReorder={setItems}
    >
      {items.map((item) => (
        <Reorder.Item
          key={item}
          value={item}
        >
          {item}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};
