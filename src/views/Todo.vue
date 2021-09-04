<template>
  <div class="todo">
    <v-list flat class="pt-0">
      <div v-for="task in tasks" :key="task.id" @click="doneTask(task.id)">
        <v-list-item :class="{ 'blue lighten-5': task.done }">
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox :input-value="task.done"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ task.title }}</v-list-item-title>
            </v-list-item-content>
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
      tasks: [
        {
          id: 1,
          title: "Wake up!",
          done: false,
        },
        {
          id: 2,
          title: "Coffee break",
          done: false,
        },
        {
          id: 3,
          title: "Lunch!",
          done: false,
        },
      ],
    };
  },
  methods: {
    doneTask(taskID) {
      let task = this.tasks.filter((task) => task.id === taskID)[0];

      return (task.done = !task.done);
    },
  },
};
</script>
