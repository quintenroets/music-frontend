<template>
  <div class="flex justify-center items-center">
    <div
      ref="scrollContainer"
      class="inline-block overflow-y-auto"
      @scroll="onScroll"
    >
      <ArtistTile
        v-for="artist in this.artists"
        :key="artist.id"
        v-bind:artist="artist"
      />
      <div class="flex justify-center items-center">
        <div class="vl-parent flex-col justify-center py-20">
          <loading
            :active="waiting"
            :is-full-page="false"
            color="white"
            :height="100"
            :width="100"
          />
          <div />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArtistTile from "../components/tiles/spotify/artistTile";
import MusicService from "@/services/MusicService.ts";
import Loading from "vue-loading-overlay";

export default {
  name: "ArtistList",

  data: function () {
    return {
      artists: [],
      numberOfArtists: 0,
      waiting: true,
    };
  },
  components: {
    Loading,
    ArtistTile,
  },
  methods: {
    addArtists: function () {
      this.waiting = true;
      MusicService.fetchArtists(this.numberOfArtists).then((response) => {
        this.numberOfArtists = this.numberOfArtists + response.length;
        this.artists.push(...response);
        this.waiting = false;
      });
    },
    onScroll: function () {
      let scrollHeight =
        this.$refs.scrollContainer.scrollTop +
        this.$refs.scrollContainer.clientHeight;
      let containerHeight = this.$refs.scrollContainer.scrollHeight - 100;
      if (scrollHeight >= containerHeight && !this.waiting) {
        this.addArtists();
      }
    },
  },
  mounted() {
    this.addArtists();
  },
};
</script>
