<template>
  <v-app id="inspire">
    <Navigation />

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "@/components/Navigation.vue";

export default {
  data: () => ({}),
  components: {
    Navigation,
  },
  mounted() {
    const mainDiv = document.querySelector(".v-main__wrap");
    const classes = ["px-5", "text-justify"];

    mainDiv.classList.add(...classes);
  },
};
</script>
