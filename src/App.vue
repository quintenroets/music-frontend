<template>
  <HomePage class="flex-grow" />
</template>

<script>
import HomePage from "@/components/HomePage.vue";

export default {
  name: "App",
  components: {
    HomePage,
  },
};
</script>

<script setup>
import { useHead } from "@unhead/vue";

useHead({
  meta: [
    {
      name: `description`,
      content: "Manage artists and songs to analyze.",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
});
</script>
