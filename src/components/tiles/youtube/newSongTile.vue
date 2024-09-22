<template>
  <ItemTile
    v-bind:name="song.title"
    v-bind:id="song.id"
    v-bind:duration="song.duration"
    v-bind:image="image"
    v-bind:selected="selected"
    :logo="require('@/assets/youtube.png')"
    type="track"
    @click="onSelect"
    @logoClick="onShow"
  >
    <template #top-right-image>
      <img src="@/assets/checkmark.png" alt="checkmark" v-if="finished" />
    </template>
  </ItemTile>
</template>

<script>
import MusicService from "../../../services/MusicService.ts";
import ItemTile from "./../itemTile.vue";

export default {
  name: "NewYoutubeSongTile",
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
      MusicService.addSong(this.song.id, true).then(() => {
        this.selected = false;
        this.finished = true;
      });
    },
    onShow: function () {
      let tab = window.open(this.url, "_blank");
      tab.focus();
    },
  },
  computed: {
    url() {
      return "https://www.youtube.com/watch?v=" + this.song.id;
    },
    image() {
      return "https://img.youtube.com/vi/" + this.song.id + "/mqdefault.jpg";
    },
  },
  components: {
    ItemTile,
  },
};
</script>
