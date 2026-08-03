<template>
  <div class="todo px-6">
    <v-text-field v-model="newTaskTitle" variant="outlined" label="Add task" clearable hide-details append-inner-icon="mdi-plus-circle" class="mb-6" @click:append-inner="addTask" @keyup.enter="addTask"></v-text-field>

    <v-list class="pt-0">
      <draggable v-model="tasks" item-key="id" ghost-class="ghost" handle=".handle">
        <template #item="{ element: task }">
          <div class="sortable" @click="doneTask(task.id)">
            <v-list-item :class="{ 'bg-blue-lighten-5': task.done }">
              <template #prepend>
                <v-checkbox-btn v-if="handle !== true" :model-value="task.done" @click.stop="doneTask(task.id)"></v-checkbox-btn>
                <v-icon v-else color="primary" class="handle">mdi-drag</v-icon>
              </template>

              <v-list-item-title :class="{ 'text-decoration-line-through': task.done }">{{ task.title }}</v-list-item-title>

              <template #append>
                <div v-if="task.dueDate" class="text-right text-uppercase mr-2">
                  <v-icon v-if="!task.expired || task.done" size="small" class="mr-1">mdi-calendar-outline</v-icon>
                  <v-icon v-else-if="!task.done && task.expired" size="small" class="mr-1 text-error">mdi-calendar-alert</v-icon>
                  <span :class="{ 'text-error font-weight-bold': task.expired && !task.done }"> {{ computedDue(task.dueDate) }}</span>
                </div>

                <v-menu>
                  <template #activator="{ props }">
                    <v-btn icon="mdi-dots-vertical" variant="text" color="primary" v-bind="props" @click.stop></v-btn>
                  </template>

                  <v-list>
                    <v-list-item prepend-icon="mdi-pencil" title="Edit" @click.stop="openEditDialog(task)"></v-list-item>
                    <v-list-item prepend-icon="mdi-calendar-clock" title="Due Date" @click.stop="openDueDateDialog(task)"></v-list-item>
                    <v-list-item prepend-icon="mdi-delete" title="Delete" @click.stop="deleteTask(task.id)"></v-list-item>
                    <v-list-item prepend-icon="mdi-sort" title="Sort" @click.stop="handle = true"></v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </template>
      </draggable>
    </v-list>

    <v-dialog v-model="editDialog" persistent width="290px">
      <v-card>
        <v-card-title>Edit task</v-card-title>
        <v-text-field v-model="draftTitle" class="pa-5" @keyup.enter="saveTitle"></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" color="primary" @click.stop="closeDialogs">Cancel</v-btn>
          <v-btn variant="text" color="primary" @click.stop="saveTitle">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dueDateDialog" persistent width="320px">
      <v-card>
        <v-date-picker v-model="draftDueDate" :min="today()"></v-date-picker>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" color="primary" @click.stop="closeDialogs">Cancel</v-btn>
          <v-btn variant="text" color="primary" @click.stop="saveDueDate">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div v-if="tasks.length === 0" class="my-auto text-center text-green">
      <v-icon size="x-large" class="text-green">mdi-check-all</v-icon>
      <h1>No tasks</h1>
    </div>

    <v-snackbar v-model="snackbar.active">
      {{ snackbar.text }}

      <template #actions>
        <v-btn color="pink" variant="text" @click="snackbar.active = false"> Close </v-btn>
      </template>
    </v-snackbar>

    <div class="handle-div text-center" v-if="handle">
      <v-btn class="done-sorting" color="primary" @click="handle = false"> Done sorting </v-btn>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { formatDueDate, normalizeTask, normalizeTasks, todayISO } from "@/utils/tasks";

export default {
  name: "Todo",
  components: {
    draggable,
  },
  data() {
    return {
      handle: false,
      newTaskTitle: "",
      tasks: [],
      snackbar: {
        active: false,
        text: String,
      },
      selectedTaskId: null,
      draftTitle: "",
      draftDueDate: null,
      editDialog: false,
      dueDateDialog: false,
    };
  },
  mounted() {
    if (localStorage.tasks) {
      this.tasks = normalizeTasks(JSON.parse(localStorage.tasks));
    }
  },
  methods: {
    today() {
      return todayISO();
    },
    computedDue(due) {
      return formatDueDate(due);
    },
    snackBar(message) {
      this.snackbar.text = message;

      return (this.snackbar.active = true);
    },
    addTask() {
      if (this.newTaskTitle === "") {
        // Checks wether task title was typed and actives the warining snackbar if it isn't
        return this.snackBar("Please type a task");
      } else {
        // Creates the new task object...
        const idDate = Date.parse(new Date()) + (Math.floor(Math.random() * 10000000000000) + 1);
        const newTask = {
          id: idDate,
          title: this.newTaskTitle,
          dueDate: null,
          expired: false,
          done: false,
          modal: false,
        };
        // ... then pushes it into 'tasks' array | Shows the snackbar "ADDED"
        return this.tasks.push(newTask), (this.newTaskTitle = ""), this.snackBar("Task added!");
      }
    },
    openEditDialog(task) {
      this.selectedTaskId = task.id;
      this.draftTitle = task.title;
      this.editDialog = true;
    },
    openDueDateDialog(task) {
      this.selectedTaskId = task.id;
      this.draftDueDate = task.dueDate;
      this.dueDateDialog = true;
    },
    selectedTask() {
      return this.tasks.find((task) => task.id === this.selectedTaskId);
    },
    closeDialogs() {
      this.selectedTaskId = null;
      this.draftTitle = "";
      this.draftDueDate = null;
      this.editDialog = false;
      this.dueDateDialog = false;
    },
    saveTitle() {
      const task = this.selectedTask();

      if (task) {
        task.title = this.draftTitle;
      }

      this.closeDialogs();
      return this.snackBar("Task updated!");
    },
    saveDueDate() {
      const task = this.selectedTask();

      if (task) {
        const dueDate = this.draftDueDate ? (typeof this.draftDueDate === "string" ? this.draftDueDate.slice(0, 10) : todayISO(this.draftDueDate)) : null;
        Object.assign(task, normalizeTask({ ...task, dueDate }));
      }

      this.closeDialogs();
      return this.snackBar("Due date is setted!");
    },
    doneTask(taskID) {
      // Marks the task as completed and shows the snackbar "DONE"
      const task = this.tasks.filter((task) => task.id === taskID)[0];

      task.done = !task.done;
      return task.done && task.done === true ? this.snackBar("Task is done!") : this.snackBar("Task is incomplete!");
    },
    deleteTask(taskID) {
      // Deletes the task and shows the snackbar "DELETED"
      this.tasks = this.tasks.filter((task) => task.id !== taskID);

      return this.snackBar("Task removed!");
    },
  },
  watch: {
    tasks: {
      handler(addTask) {
        localStorage.tasks = JSON.stringify(addTask);
      },
      deep: true,
    },
  },
};
</script>

<style>
.sortable-drag {
  opacity: 0;
}

.flip-list-move {
  transition: transform 0.5s;
}

.ghost {
  border-left: 4px solid #90caf9;
  box-shadow: 10px 10px 5px -1px hsla(0, 0, 0, 0.14);
  opacity: 0.7;
}

.handle-div {
  margin-left: -256px;

  @media screen and (max-width: 776px) {
    margin-left: -155px;
  }
}

.done-sorting {
  bottom: 16px;
  left: 50%;
  position: fixed;
  transform: translateX(-50%);
}
</style>
