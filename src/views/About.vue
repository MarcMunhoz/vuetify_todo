<template>
  <div class="px-6 about">
    <h1>About Todo</h1>

    <p>This app was created using VueJS 2, Vuetify and Docker.</p>

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
    <v-list dense>
      <v-list-item-group color="primary">
        <v-list-item v-for="network in networks" :key="network.id" @click="goTo(network.link)">
          <v-list-item-icon>
            <v-icon v-text="`mdi-${network.icon}`"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="network.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
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
