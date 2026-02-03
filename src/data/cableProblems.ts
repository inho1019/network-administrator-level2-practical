import type { CableProblem } from "../types";
import { DIRECT_CABLE, CROSS_CABLE_SIDE2 } from "./constants";

export const cableProblems: CableProblem[] = [
  {
    id: 1,
    device1: "PC",
    device2: "Hub",
    cableType: "direct",
    correctAnswer: {
      side1: DIRECT_CABLE,
      side2: DIRECT_CABLE,
    },
  },
  {
    id: 2,
    device1: "Hub",
    device2: "Router",
    cableType: "direct",
    correctAnswer: {
      side1: DIRECT_CABLE,
      side2: DIRECT_CABLE,
    },
  },
  {
    id: 3,
    device1: "PC",
    device2: "Router",
    cableType: "direct",
    correctAnswer: {
      side1: DIRECT_CABLE,
      side2: DIRECT_CABLE,
    },
  },
  {
    id: 4,
    device1: "PC",
    device2: "PC",
    cableType: "cross",
    correctAnswer: {
      side1: DIRECT_CABLE,
      side2: CROSS_CABLE_SIDE2,
    },
  },
  {
    id: 5,
    device1: "Hub",
    device2: "Hub",
    cableType: "cross",
    correctAnswer: {
      side1: DIRECT_CABLE,
      side2: CROSS_CABLE_SIDE2,
    },
  },
  {
    id: 6,
    device1: "Router",
    device2: "Router",
    cableType: "cross",
    correctAnswer: {
      side1: DIRECT_CABLE,
      side2: CROSS_CABLE_SIDE2,
    },
  },
];
