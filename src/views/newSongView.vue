<template>
  <NewItemView
    :fetch-function="
      youtube
        ? musicService().searchNewYoutubeSongs
        : musicService().searchNewSongs
    "
    item-name="song"
    :item-component="youtube ? NewYoutubeSongTile : NewSongTile"
    :recommended-item-component="NewSongTile"
    :fetch-recommendations-function="musicService().fetchRecommendedSongs"
  >
    <template #between>
      <div class="mr-4">
        YouTube
        <div class="flex justify-center w-full">
          <label class="h-9 w-16 relative inline-block">
            <input type="checkbox" v-model="youtube" class="w-0 h-0" />
            <span
              class="slider bg-gray-300 cursor-pointer round absolute top-0 left-0 right-0 bottom-0"
            ></span>
          </label>
        </div>
      </div>
    </template>
  </NewItemView>
</template>

<script>
import MusicService from "../services/MusicService.ts";
import NewItemView from "@/components/NewItemView.vue";
import NewSongTile from "@/components/tiles/spotify/newSongTile.vue";
import NewYoutubeSongTile from "@/components/tiles/youtube/newSongTile.vue";

export default {
  name: "NewArtist",
  computed: {
    NewSongTile() {
      return NewSongTile;
    },
    NewYoutubeSongTile() {
      return NewYoutubeSongTile;
    },
  },
  components: {
    NewItemView,
  },
  data() {
    return {
      youtube: false,
    };
  },
  methods: {
    musicService() {
      return MusicService;
    },
  },
};
</script>

<style scoped>
.slider {
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  width: 26px;
  height: 26px;
  left: 6px;
  bottom: 5px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
