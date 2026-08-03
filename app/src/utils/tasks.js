export function todayISO(date = new Date()) {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${date.getFullYear()}-${month}-${day}`;
}

export function parseLocalDate(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }

  const [year, month, day] = `${value}`.slice(0, 10).split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

export function formatDueDate(value) {
  const date = parseLocalDate(value);

  return date ? date.toLocaleString("en-US", { month: "short", day: "2-digit" }) : "";
}

export function normalizeTask(task, today = todayISO()) {
  const dueDate = task.dueDate ? `${task.dueDate}`.slice(0, 10) : null;
  const todayDate = parseLocalDate(today);
  const due = parseLocalDate(dueDate);

  return {
    ...task,
    id: task.id,
    title: task.title || "",
    dueDate,
    expired: Boolean(due && todayDate && todayDate > due),
    done: Boolean(task.done),
    modal: false,
  };
}

export function normalizeTasks(tasks, today = todayISO()) {
  if (!Array.isArray(tasks)) {
    return [];
  }

  return tasks.map((task) => normalizeTask(task, today));
}
