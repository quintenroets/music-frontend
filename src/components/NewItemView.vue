<template>
  <div ref="scrollContainer" class="flex flex-col" @scroll="onScroll">
    <SearchBarComponent
      :waiting="waiting"
      :item-name="itemName"
      @input-changed="onInput"
      :key="itemComponent"
    >
      <template #between>
        <slot name="between"></slot>
      </template>
    </SearchBarComponent>
    <div class="w-full mt-10">
      <div class="vl-parent w-full h-full flex justify-center">
        <div class="inline-block overflow-y-auto">
          <div :key="itemComponent">
            <component
              v-for="item in newItems"
              :key="item.id"
              :is="itemComponent"
              v-bind="{ [itemName]: item }"
            />
          </div>
          <br />
          <component
            v-for="item in recommendedItems"
            :key="item.id"
            :is="
              recommendedItemComponent === null
                ? itemComponent
                : recommendedItemComponent
            "
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
import SearchBarComponent from "./searchBarComponent.vue";

export default {
  name: "NewItemView",
  data: function () {
    return {
      waiting: false,
      newItems: [],
      recommendedItems: [],
      waitingRecommendations: true,
      newInput: null,
    };
  },
  components: {
    Loading,
    SearchBarComponent,
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
    recommendedItemComponent: {
      type: Object,
      default: null,
    },
    fetchFunction: {
      type: Function,
    },
    fetchRecommendationsFunction: {
      type: Function,
    },
  },
  methods: {
    onInput: function (input) {
      if (input === "" || input === undefined) {
        this.newItems = [];
      } else {
        if (this.waiting === true) {
          this.newInput = input;
        } else {
          this.fetchInput(input);
        }
      }
    },
    fetchInput: function (input) {
      this.waiting = true;
      this.fetchFunction(input).then((response) => {
        this.newItems = response;
        if (this.newInput === null) {
          this.waiting = false;
        } else {
          input = this.newInput;
          this.newInput = null;
          this.fetchInput(input);
        }
      });
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
  watch: {
    itemComponent() {
      this.newItems = [];
    },
  },
  mounted() {
    this.addRecommendations();
  },
};
</script>
