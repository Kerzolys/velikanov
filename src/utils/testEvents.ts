import { TEvent } from "../services/types";

export const testEvents: TEvent[] = [
  {
    date: "12th November 2024",
    time: "19:00",
    location: "City, Country",
    program: ["Composer - Work"],
    soloist: "Some chellist",
  },
  {
    date: "13th November 2024",
    time: "19:00",
    location: "City, Country",
    program: ["Composer - Work", "Composer - Work"],
  },
  {
    date: "14th November 2024",
    time: "19:00",
    location: "City, Country",
    program: [
      "Composer - Work",
      "Composer - Work",
      "Composer - Work",
      "Composer - Work",
    ],
    soloist: "Some cool violinist",
  },
];
