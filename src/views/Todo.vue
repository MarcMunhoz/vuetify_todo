<template>
  <div class="todo px-6">
    <v-text-field outlined label="Add task" clearable hide-details v-model="newTaskTitle" @click:append="addTask" @keyup.enter="addTask" append-icon="mdi-plus-circle" class="mb-6"></v-text-field>

    <v-list flat class="pt-0">
      <div v-for="task in tasks" :key="task.id" @click="doneTask(task.id)">
        <v-list-item :class="{ 'blue lighten-5': task.done }">
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox :input-value="task.done"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title :class="{ 'text-decoration-line-through': task.done }">{{ task.title }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon>
                <v-icon color="primary lighten-1" @click.stop="deleteTask(task.id)">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>

    <div v-if="tasks.length === 0" class="my-auto text-center green--text">
      <v-icon x-large class="green--text">mdi-check-all</v-icon>
      <h1>No tasks</h1>
    </div>

    <v-snackbar v-model="snackbar.active">
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar.active = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Todo",
  data() {
    return {
      newTaskTitle: "",
      tasks: [],
      snackbar: {
        active: false,
        text: String,
      },
    };
  },
  methods: {
    addTask() {
      const newTask = {
        id: Date.now(),
        title: this.newTaskTitle,
        done: false,
      };

      this.newTaskTitle === "" ? (this.newTaskTitle = "Please digit the task name") : this.tasks.push(newTask), (this.newTaskTitle = "");

      this.snackbar.text = "Task added!";
      return (this.snackbar.active = true);
    },
    doneTask(taskID) {
      const task = this.tasks.filter((task) => task.id === taskID)[0];

      return (task.done = !task.done);
    },
    deleteTask(taskID) {
      this.tasks = this.tasks.filter((task) => task.id !== taskID);

      this.snackbar.text = "Task removed!";
      return (this.snackbar.active = true);
    },
  },
};
</script>
