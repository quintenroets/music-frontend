import MockAdapter from "axios-mock-adapter";
import http from "../src/services/HttpService";
import MusicService from "../src/services/MusicService";

describe("MusicService", () => {
  it("addSong uses POST and returns data", async () => {
    const mock = new MockAdapter(http);
    mock.onPost("/songs/add").reply(200, { ok: true });

    const data = await MusicService.addSong("1", false);
    expect(data).toEqual({ ok: true });
  });
});
