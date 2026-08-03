<template>
  <div class="px-6 about">
    <h1>About Todo</h1>

    <p>This app was created using Vue 3, Vuetify 3, Vite and Docker.</p>

    <p>It's a simple to-do list with:</p>
    <ul>
      <li>Add / edit a task</li>
      <li>Add an expiration date (month / day only)</li>
      <li>Mark task as completed</li>
      <li>Delete a task</li>
      <li>Sort list</li>
    </ul>
    <v-divider></v-divider>

    <br />
    <h4>Any help will be welcome. Thanks!</h4>
    <v-list density="compact">
      <v-list-item v-for="network in networks" :key="network.name" :prepend-icon="`mdi-${network.icon}`" :title="network.name" color="primary" @click="goTo(network.link)"></v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      networks: [
        {
          name: "MarcMunhoz",
          icon: "github",
          link: "https://github.com/MarcMunhoz",
        },
        {
          name: "heyMunhoz",
          icon: "twitter",
          link: "https://twitter.com/heyMunhoz",
        },
      ],
    };
  },
  methods: {
    goTo(link) {
      return window.open(link, "network");
    },
  },
};
</script>
