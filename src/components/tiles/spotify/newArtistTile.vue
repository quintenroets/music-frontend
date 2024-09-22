<template>
  <NewItemTile
    v-bind:name="artist.name"
    v-bind:id="artist.id"
    v-bind:popularity="artist.popularity"
    v-bind:images="artist.images"
    v-bind:genres="artist.genres"
    v-bind:selected="selected"
    v-bind:show-checkmark="artist.added || finished"
    type="artist"
    @click="onSelect"
  >
  </NewItemTile>
</template>

<script>
import MusicService from "../../../services/MusicService.ts";
import NewItemTile from "./newItemTile.vue";

export default {
  name: "NewArtistTile",
  props: {
    artist: {},
  },
  data() {
    return {
      selected: false,
      finished: false,
    };
  },
  methods: {
    onSelect: function () {
      this.selected = true;
      MusicService.addArtist(this.artist.id, this.artist.name).then(() => {
        this.selected = false;
        this.finished = true;
      });
    },
  },
  components: {
    NewItemTile,
  },
};
</script>
