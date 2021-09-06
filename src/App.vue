<template>
  <v-app id="inspire">
    <Navigation />

    <v-main class="text-justify">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "@/components/Navigation.vue";

export default {
  components: {
    Navigation,
  },
};
</script>
