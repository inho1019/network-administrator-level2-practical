import { useState } from "react";

/**
 * 케이블 배선 상태를 관리하는 커스텀 훅
 */
export function useCableWiring() {
  const [side1Wires, setSide1Wires] = useState<string[]>(Array(8).fill(""));
  const [side2Wires, setSide2Wires] = useState<string[]>(Array(8).fill(""));

  const selectColor = (
    side: "side1" | "side2",
    position: number,
    color: string,
  ) => {
    if (side === "side1") {
      const newWires = [...side1Wires];
      newWires[position] = color;
      setSide1Wires(newWires);
    } else {
      const newWires = [...side2Wires];
      newWires[position] = color;
      setSide2Wires(newWires);
    }
  };

  const resetWiring = () => {
    setSide1Wires(Array(8).fill(""));
    setSide2Wires(Array(8).fill(""));
  };

  return {
    side1Wires,
    side2Wires,
    selectColor,
    resetWiring,
  };
}
