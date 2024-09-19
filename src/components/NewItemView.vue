<template>
  <div ref="scrollContainer" class="flex flex-col" @scroll="onScroll">
    <h3 class="mt-4 mb-8">{{ message }}</h3>
    <div class="flex justify-center">
      <div class="flex justify-center relative px-16 w-full max-w-lg">
        <input
          aria-label="search"
          class="bg-gray-300 text-black h-12 w-full text-center px-10 rounded"
          @input="onInput(input)"
          autofocus
          v-model="input"
          v-on:keydown.enter="onInput(input)"
        />
      </div>
      <div class="flex justify-center items-center">
        <div class="absolute -translate-x-6 vl-parent flex-col justify-center">
          <loading
            :active="waiting"
            :is-full-page="false"
            color="white"
            :height="30"
          />
          <div />
        </div>
      </div>
    </div>
    <div class="w-full mt-10">
      <div class="vl-parent w-full h-full flex justify-center">
        <div class="inline-block overflow-y-auto">
          <component
            v-for="item in newItems"
            :key="item.id"
            :is="itemComponent"
            v-bind="{ [itemName]: item }"
          />
          <br />
          <component
            v-for="item in recommendedItems"
            :key="item.id"
            :is="itemComponent"
            v-bind="{ [itemName]: item }"
          />
        </div>
      </div>
      <div class="w-full flex justify-center">
        <loading
          :active="waitingRecommendations"
          :is-full-page="false"
          color="white"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";

export default {
  name: "NewItemView",
  data: function () {
    return {
      message: "Search new " + this.itemName,
      input: "",
      waiting: false,
      newItems: {},
      recommendedItems: [],
      waitingRecommendations: true,
    };
  },
  components: {
    Loading,
  },

  props: {
    itemName: {
      type: String,
      required: true,
    },
    itemComponent: {
      type: Object,
      required: true,
    },
    fetchFunction: {
      type: Function,
      required: true,
    },
    fetchRecommendationsFunction: {
      type: Function,
      required: true,
    },
  },
  methods: {
    onInput: function (input) {
      if (input === "") {
        this.newItems = [];
      } else {
        this.waiting = true;
        this.fetchFunction(input).then((response) => {
          this.newItems = response;
          this.waiting = false;
        });
      }
    },
    addRecommendations: function () {
      this.waitingRecommendations = true;
      this.fetchRecommendationsFunction().then((response) => {
        this.recommendedItems.push(...response);
        this.waitingRecommendations = false;
      });
    },
    onScroll: function () {
      let scrollHeight =
        this.$refs.scrollContainer.scrollTop +
        this.$refs.scrollContainer.clientHeight;
      let containerHeight = this.$refs.scrollContainer.scrollHeight - 100;
      if (scrollHeight >= containerHeight && !this.waitingRecommendations) {
        this.addRecommendations();
      }
    },
  },
  mounted() {
    this.addRecommendations();
  },
};
</script>
