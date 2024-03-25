import { PlaylistService } from "../../modules/playlists/services";

describe("GET /getPlaylist", () => {
  let playlistService: PlaylistService;

  beforeAll(() => {
    playlistService = new PlaylistService();
  });

  it("should return playlist data by id", async () => {
    const res = await playlistService.getPlaylistById("1210673468");
    expect(res).toBeDefined();
    expect(res.id).toBeDefined();
    expect(res.name).toBeDefined();
  });

  it("should return playlist data by link", async () => {
    const res = await playlistService.getPlaylistByLink(
      "7e2LtwVBX6JFo9wdEAzFBA__"
    );
    expect(res).toBeDefined();
    expect(res.id).toBeDefined();
    expect(res.name).toBeDefined();
  });
});
