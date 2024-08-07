// @ts-ignore
import http from "./HttpService.ts";

class MusicService {
  getNewArtist(name) {
    return http
      .get("/artists/search", { params: { name: name } })
      .then((response) => {
        return response.data;
      });
  }
  getNewSongs(name) {
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

  getRecommendedArtists() {
    return http.get("/artists/recommendations").then((response) => {
      return response.data;
    });
  }
  getRecommendedSongs() {
    return http.get("/songs/recommendations").then((response) => {
      return response.data;
    });
  }

  getArtists() {
    return http.get("/artists").then((response) => {
      return response.data;
    });
  }
}

export default new MusicService();
