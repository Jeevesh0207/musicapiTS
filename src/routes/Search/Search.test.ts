import { SearchService} from "../../modules/search/services";

describe("GET /getSearch", () => {
  let searchService: SearchService;

  beforeAll(() => {
    searchService = new SearchService();
  });


  it("should return search data by query", async () => {
    const res = await searchService.searchAll("apna");
    expect(res).toBeDefined();
    expect(res.songs).toBeDefined();
  });

});
