<template>
  <div>
    <h3 class="mt-4 mb-8">Search new {{ itemName }}</h3>
    <div class="justify-center grid grid-cols-[1fr_auto_1fr]">
      <div class="col-start-2">
        <input
          aria-label="search"
          class="bg-gray-300 text-black h-12 w-96 text-center rounded"
          @input="onInput"
          autofocus
          v-model="input"
          v-on:keydown.enter="onInput"
        />
      </div>
      <div class="col-start-3 flex justify-between items-end h-12 ml-4">
        <div class="vl-parent self-center">
          <loading
            :active="waiting"
            :is-full-page="false"
            color="white"
            :height="30"
          />
          <div />
        </div>
        <slot name="between" />
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";

export default {
  name: "SearchBarComponent",
  data: function () {
    return {
      input: "",
    };
  },
  components: {
    Loading,
  },
  methods: {
    onInput: function (event) {
      event.preventDefault();
      event.stopPropagation();
      this.$emit("inputChanged", event.target.value);
    },
  },
  props: {
    waiting: {
      type: Boolean,
    },
    itemName: {
      type: String,
    },
  },
};
</script>
