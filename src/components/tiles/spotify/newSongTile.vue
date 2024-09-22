<template>
  <NewItemTile
    v-bind:name="song.name"
    v-bind:id="song.id"
    v-bind:popularity="song.popularity"
    v-bind:images="song.album.images"
    v-bind:genres="song.artists.map((artist) => artist.name)"
    v-bind:selected="selected"
    v-bind:show-checkmark="finished || this.song.downloaded"
    type="track"
    @click="onSelect"
  >
  </NewItemTile>
</template>

<script>
import MusicService from "../../../services/MusicService.ts";
import NewItemTile from "./newItemTile.vue";

export default {
  name: "NewSongTile",
  props: {
    song: {},
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
      MusicService.addSong(this.song.id, false).then(() => {
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
