import { ArtistService } from "../../modules/artists/services";

describe("GET /getArtist", () => {
  let artistService: ArtistService;

  beforeAll(() => {
    artistService = new ArtistService();
  });


  it("should return artist data by id", async () => {
    const res = await artistService.getArtistById({
      artistId: "459320",
      page: 0,
      songCount: 10,
      albumCount: 10,
      sortBy: "popularity",
      sortOrder: "desc",
    });
    expect(res).toBeDefined();
    expect(res.id).toBeDefined();
    expect(res.name).toBeDefined();
  });


  it("should return artist data by link", async () => {
    const res = await artistService.getArtistByLink({
      token: "LlRWpHzy3Hk_",
      page: 0,
      songCount: 10,
      albumCount: 10,
      sortBy: "popularity",
      sortOrder: "desc",
    });
    expect(res).toBeDefined();
    expect(res.id).toBeDefined();
    expect(res.name).toBeDefined();
  });


  it("should handle non-existent artist id gracefully", async () => {
    const res = await artistService.getArtistById({
      artistId: "4593",
      page: 0,
      songCount: 10,
      albumCount: 10,
      sortBy: "popularity",
      sortOrder: "desc",
    });

    expect(res.name).toEqual("");
  });

  it("should handle non-existent artist link gracefully", async () => {
    const res = await artistService.getArtistByLink({
      token: "LlRWpHzy3",
      page: 0,
      songCount: 10,
      albumCount: 10,
      sortBy: "popularity",
      sortOrder: "desc",
    });

    expect(res.name).toEqual("");
  });
});
