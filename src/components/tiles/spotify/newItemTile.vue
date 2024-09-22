<template>
  <ItemTile
    v-bind:name="name"
    v-bind:id="id"
    v-bind:popularity="popularity"
    v-bind:images="images"
    v-bind:genres="genres"
    v-bind:selected="selected"
    v-bind:type="type"
  >
    <template #top-right-image>
      <img src="@/assets/checkmark.png" alt="checkmark" v-if="showCheckmark" />
    </template>
  </ItemTile>
</template>

<script>
import ItemTile from "./itemTile.vue";

export default {
  name: "NewItemTile",
  props: {
    id: { type: String },
    name: { type: String },
    images: {
      type: Array,
      default: () => [],
    },
    popularity: { type: Number, default: null },
    showCheckmark: {},
    genres: {
      type: Array,
      default: () => [],
    },
    selected: {},
    type: {},
  },
  components: {
    ItemTile,
  },
};
</script>
