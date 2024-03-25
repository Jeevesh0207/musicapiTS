import { AlbumService } from "../../modules/albums/services";

// Test suite for AlbumService functionality
describe("GET /getAlbum", () => {
  let albumService: AlbumService;

  // Initialize AlbumService before running tests
  beforeAll(() => {
    albumService = new AlbumService();
  });

  // Test fetching album data by ID
  it("should return album data by id", async () => {
    const res = await albumService.getAlbumById("49986024");
    // Check if response is defined and contains required fields
    expect(res).toBeDefined();
    expect(res.id).toBeDefined();
    expect(res.name).toBeDefined();
  });

  // Test fetching album data by link
  it("should return album data by link", async () => {
    const res = await albumService.getAlbumByLink(
      "UJia9ruIVF0_"
    );
    // Check if response is defined and contains required fields
    expect(res).toBeDefined();
    expect(res.id).toBeDefined();
    expect(res.name).toBeDefined();
  });

  // Test handling non-existent album ID
  it("should handle non-existent album id gracefully", async () => {
    const res = await albumService.getAlbumById("499");
    // Check if response contains an empty ID
    expect(res.id).toEqual("");
  });

  // Test handling non-existent album link
  it("should handle non-existent album link gracefully", async () => {
    const res = await albumService.getAlbumByLink(
      "U"
    );
    // Check if response contains an empty ID
    expect(res.id).toEqual("");
  });
});
