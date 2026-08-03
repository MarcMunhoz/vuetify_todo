<template>
  <v-container>
    <v-navigation-drawer v-model="drawer">
      <v-list-item>
        <div>
          <v-list-item-title class="text-h6">
            <template v-if="username">{{ username }} </template>Todo
          </v-list-item-title>
          <v-list-item-subtitle> A simple & fast todo list </v-list-item-subtitle>
        </div>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item v-for="item in items" :key="item.title" :prepend-icon="item.icon" :title="item.title" :to="item.to" link></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary" image="/salvador.jpg" prominent>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title class="px-0">
        <template v-if="username">{{ username }} </template>Todo<br />
        <cite class="subtitle-1">{{ today() }}</cite>
      </v-app-bar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-dialog v-model="modal" persistent width="290px">
      <v-card>
        <v-card-title>My name</v-card-title>
        <v-text-field v-model="username" class="pa-5" @keyup.enter="modal = false"></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" color="primary" @click.stop="modal = false">Cancel</v-btn>
          <v-btn variant="text" color="primary" @click.stop="modal = false">Okay</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "Navigation",
  data: () => ({
    username: "",
    drawer: null,
    items: [
      { title: "Todo", icon: "mdi-format-list-checks", to: "/" },
      { title: "About", icon: "mdi-help-box", to: "/about" },
    ],
    modal: false,
  }),
  mounted() {
    return localStorage.tasksUser ? (this.username = localStorage.tasksUser) : (this.modal = true);
  },
  methods: {
    today() {
      const today = new Date();
      return today.toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric" });
    },
  },
  watch: {
    username: {
      handler() {
        return (localStorage.tasksUser = this.username);
      },
    },
  },
};
</script>

<style>
.v-app-bar-title__content {
  overflow: unset !important;
}
</style>
