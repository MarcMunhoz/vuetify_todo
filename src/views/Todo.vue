<template>
  <div class="todo px-6">
    <v-text-field outlined label="Add task" clearable hide-details v-model="newTaskTitle" @click:append="addTask" @keyup.enter="addTask" append-icon="mdi-plus-circle"></v-text-field>
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
  </div>
</template>

<script>
export default {
  name: "Todo",
  data() {
    return {
      newTaskTitle: "",
      tasks: [],
    };
  },
  methods: {
    addTask() {
      const newTask = {
        id: Date.now(),
        title: this.newTaskTitle,
        done: false,
      };

      return this.newTaskTitle === "" ? (this.newTaskTitle = "Please digit the task name") : this.tasks.push(newTask), (this.newTaskTitle = "");
    },
    doneTask(taskID) {
      const task = this.tasks.filter((task) => task.id === taskID)[0];

      return (task.done = !task.done);
    },
    deleteTask(taskID) {
      return (this.tasks = this.tasks.filter((task) => task.id !== taskID));
    },
  },
};
</script>
