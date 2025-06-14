<template>
  <NewItemView
    :fetch-function="MusicService.searchNewArtists"
    :fetch-recommendations-function="MusicService.fetchRecommendedArtists"
    item-name="artist"
    :item-component="NewArtistTile"
  />
</template>

<script>
import MusicService from "../services/MusicService.ts";
import NewItemView from "@/components/NewItemView.vue";
import NewArtistTile from "@/components/tiles/spotify/newArtistTile.vue";

export default {
  name: "NewArtist",
  computed: {
    NewArtistTile() {
      return NewArtistTile;
    },
  },
  components: {
    NewItemView,
  },
};
</script>
