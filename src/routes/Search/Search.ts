import express, { Request, Response } from "express";
import { SearchService } from "../../modules/search/services";

const Search = express.Router();

const searchService = new SearchService();

Search.post("/getSearch", async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    const search = await searchService.searchAll(query);
    if (!search) {
      return res.status(404).json({
        success: false,
        error: "Search not found for the given query",
      });
    }

    res.status(200).json({ success: true, data: search });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

Search.post("/getSearch/songs", async (req: Request, res: Response) => {
  try {
    const { query, page, limit } = req.body;

    const search = await searchService.searchSongs({
      query,
      page: page || 0,
      limit: limit || 10,
    });

    if (!search) {
      return res
        .status(404)
        .json({
          success: false,
          error: "Search not found for the given query",
        });
    }

    res.status(200).json({ success: true, data: search });
  } catch (error) {
    console.error("Error retrieving album:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

Search.post("/getSearch/albums", async (req: Request, res: Response) => {
  try {
    const { query, page, limit } = req.body;
    const search = await searchService.searchAlbums({
      query,
      page: page || 0,
      limit: limit || 10,
    });

    if (!search) {
      return res
        .status(404)
        .json({
          success: false,
          error: "Search not found for the given query",
        });
    }

    res.status(200).json({ success: true, data: search });
  } catch (error) {
    console.error("Error retrieving album:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

Search.post("/getSearch/artists", async (req: Request, res: Response) => {
  try {
    const { query, page, limit } = req.body;
    const search = await searchService.searchArtists({
      query,
      page: page || 0,
      limit: limit || 10,
    });

    if (!search) {
      return res
        .status(404)
        .json({
          success: false,
          error: "Search not found for the given query",
        });
    }

    res.status(200).json({ success: true, data: search });
  } catch (error) {
    console.error("Error retrieving album:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

Search.post("/getSearch/playlists", async (req: Request, res: Response) => {
  try {
    const { query, page, limit } = req.body;
    const search = await searchService.searchPlaylists({
      query,
      page: page || 0,
      limit: limit || 10,
    });

    if (!search) {
      return res
        .status(404)
        .json({
          success: false,
          error: "Search not found for the given query",
        });
    }

    res.status(200).json({ success: true, data: search });
  } catch (error) {
    console.error("Error retrieving album:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export default Search;
