// @ts-ignore
import http from "./HttpService.ts";

class MusicService {
  fetchNewArtist(name) {
    return http
      .get("/artists/search", { params: { name: name } })
      .then((response) => {
        return response.data;
      });
  }
  fetchNewSongs(name) {
    return http
      .get("/songs/search", { params: { name: name } })
      .then((response) => {
        return response.data;
      });
  }
  addArtist(id, name) {
    return http
      .get("/artists/add", { params: { id_: id, name: name } })
      .then((response) => {
        return response.data;
      });
  }
  addSong(id) {
    return http.get("/songs/add", { params: { id_: id } }).then((response) => {
      return response.data;
    });
  }
  ChangeArtist(id) {
    return http
      .get("/artists/toggle", { params: { id_: id } })
      .then((response) => {
        return response.data;
      });
  }

  fetchRecommendedArtists() {
    return http.get("/artists/recommendations").then((response) => {
      return response.data;
    });
  }
  fetchRecommendedSongs() {
    return http.get("/songs/recommendations").then((response) => {
      return response.data;
    });
  }

  fetchArtists(offset) {
    return http.get("/artists", {params: {offset: offset}}).then((response) => {
      return response.data;
    });
  }
}

export default new MusicService();
