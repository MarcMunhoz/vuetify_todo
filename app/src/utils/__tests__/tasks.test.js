import { describe, expect, it } from "vitest";
import { formatDueDate, normalizeTasks, todayISO } from "../tasks";

describe("task utilities", () => {
  it("formats today as an ISO date with zero-padded month and day", () => {
    expect(todayISO(new Date(2026, 0, 3))).toBe("2026-01-03");
  });

  it("normalizes persisted Vue 2 tasks without changing storage keys or order", () => {
    const tasks = normalizeTasks(
      [
        { id: 1, title: "First", dueDate: "2026-08-02", done: true, modal: true },
        { id: 2, title: "Second", dueDate: "2026-08-04", done: false, modal: true },
      ],
      "2026-08-03",
    );

    expect(tasks).toEqual([
      { id: 1, title: "First", dueDate: "2026-08-02", expired: true, done: true, modal: false },
      { id: 2, title: "Second", dueDate: "2026-08-04", expired: false, done: false, modal: false },
    ]);
  });

  it("formats persisted due dates for display", () => {
    expect(formatDueDate("2026-08-04")).toBe("Aug 04");
  });
});
