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
              {{ due }}
            </v-list-item-content>

            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark icon v-bind="attrs" v-on="on">
                  <v-icon color="primary lighten-1">mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item>
                  <v-list-item-title role="button">
                    <v-dialog ref="dialog" v-model="modal" :return-value.sync="due" persistent width="290px">
                      <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs" v-on="on">
                          <v-btn icon>
                            <v-icon color="grey">mdi-calendar-clock</v-icon>
                          </v-btn>
                          Due Date
                        </div>
                      </template>
                      <v-date-picker v-model="due" scrollable>
                        <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.dialog.save(due)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item v-for="(item, i) in sideMenu" :key="i">
                  <v-list-item-title role="button" @click.stop="handleFnCall(item.function, task.id)">
                    <v-btn icon>
                      <v-icon color="grey">mdi-{{ item.button }}</v-icon>
                    </v-btn>
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
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
      sideMenu: [{ title: "Delete", button: "delete", function: "deleteTask" }],
      modal: false,
      due: null,
    };
  },
  methods: {
    handleFnCall(fnName, taskId) {
      return this[fnName](taskId);
    },
    addTask() {
      if (this.newTaskTitle === "") {
        return (this.snackbar.text = "Please type a task"), (this.snackbar.active = true);
      } else {
        const newTask = {
          id: Date.now(),
          title: this.newTaskTitle,
          duedate: Date,
          done: false,
        };
        return this.tasks.push(newTask), (this.newTaskTitle = ""), (this.snackbar.text = "Task added!"), (this.snackbar.active = true);
      }
    },
    doneTask(taskID) {
      const task = this.tasks.filter((task) => task.id === taskID)[0];

      task.done = !task.done;
      return task.done && ((this.snackbar.text = "Task is done!"), (this.snackbar.active = true));
    },
    deleteTask(taskID) {
      this.tasks = this.tasks.filter((task) => task.id !== taskID);

      this.snackbar.text = "Task removed!";
      return (this.snackbar.active = true);
    },
  },
};
</script>
