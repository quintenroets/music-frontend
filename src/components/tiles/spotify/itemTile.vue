<template>
  <ItemTile
    v-bind:name="name"
    v-bind:id="id"
    v-bind:popularity="popularity"
    v-bind:image="image"
    v-bind:genres="genres"
    v-bind:selected="selected"
    :logo="require('@/assets/logo.png')"
    @logoClick="onShow"
  >
    <template #top-right-image>
      <slot name="top-right-image"></slot>
    </template>
  </ItemTile>
</template>

<script>
import ItemTile from "./../itemTile.vue";

export default {
  name: "itemTile",
  props: {
    id: { type: String },
    name: { type: String },
    images: {
      type: Array,
      default: () => [],
    },
    popularity: { type: Number, default: null },
    genres: {
      type: Array,
      default: () => [],
    },
    selected: {},
    type: {},
  },
  methods: {
    onShow: function () {
      let url = "https://open.spotify.com/" + this.type + "/" + this.id;
      let tab = window.open(url, "_blank");
      tab.focus();
    },
  },
  computed: {
    image() {
      for (let i = this.images.length - 1; i >= 0; i--) {
        if (this.images[i].height >= 160) {
          // smallest one that is large enough
          // h-40 = 40 * 0.25 rem = 10rem = 10 * 16 px = 160px
          return this.images[i].url;
        }
      }
      return null;
    },
  },
  components: {
    ItemTile,
  },
};
</script>
