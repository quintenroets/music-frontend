<template>
  <div class="tile h-64 w-96 max-w-full vl-parent relative">
    <div
      class="absolute inset-0 flex justify-center items-center"
      v-if="selected"
    >
      <loading
        :active="selected"
        :is-full-page="false"
        color="white"
        :width="100"
        :height="100"
      />
    </div>
    <div>
      <div class="flex h-14 overflow-y-auto">
        <div
          class="image-wrapper aspect-1 h-10 p-1"
          @click.stop="$emit('logoClick')"
        >
          <img :src="logo" alt="logo" width="40" height="40" />
        </div>
        <div class="flex justify-center flex-grow p-1">
          <p class="text-sm font-bold">{{ name }}</p>
        </div>
        <div class="image-wrapper aspect-1 h-10 p-1">
          <slot name="top-right-image"></slot>
        </div>
      </div>
      <div
        class="flex overflow-y-auto justify-center"
        :class="popularity ? 'h-40' : ''"
      >
        <div
          class="image-wrapper p-1"
          :class="popularity ? 'aspect-1' : 'aspect-2'"
        >
          <img :src="image" alt="image" :width="popularity ? 160 : 270" />
        </div>
        <div class="overflow-y-auto text-left p-2 flex-grow" v-if="popularity">
          <p class="font-xs">Popularity: {{ popularity }}%</p>
          <div
            class="font-xs overflow-y-auto"
            v-for="genre in genres"
            :key="genre"
          >
            {{ genre }}
          </div>
        </div>
      </div>
      <div class="text-center p-2" v-if="duration">
        <p class="font-xs">Duration: {{ duration }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";

export default {
  name: "ItemTile",
  props: {
    id: { type: String },
    name: { type: String },
    logo: {},
    image: {},
    popularity: { type: Number, default: null },
    duration: { type: Number, default: null },
    genres: {
      type: Array,
      default: () => [],
    },
    selected: {},
  },
  components: {
    Loading,
  },
};
</script>
