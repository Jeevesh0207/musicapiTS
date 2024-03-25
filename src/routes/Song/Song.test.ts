import { SongService} from "../../modules/songs/services";

describe("GET /getSong", () => {
  let songService: SongService;

  beforeAll(() => {
    songService = new SongService();
  });


  it("should return a song by id", async () => {
    const song = await songService.getSongByIds({ songIds: '3IoDK8qI' });
    expect(song).toBeDefined()
    expect(song).toHaveLength(1)
  });

  test('should return a song by id and include lyrics', async () => {
    const song = await songService.getSongByIds({ songIds: 'ulCA5JTi', includeLyrics: true })
    expect(song).toBeDefined()
    expect(song).toHaveLength(1)
    expect(song[0].lyrics).toBeDefined()
  })
});
