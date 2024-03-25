import express, { Request, Response } from "express";
import { ArtistService } from "../../modules/artists/services";

const Artist = express.Router();

const artistService = new ArtistService();

Artist.post("/getArtist", async (req: Request, res: Response) => {
  try {
    const {
      link,
      id,
      page = 0,
      sortBy = "popularity",
      sortOrder = "asc",
      songCount = 10,
      albumCount = 10,
    } = req.body;
    let token = "";
    if (link) {
      token = link.match(
        /jiosaavn\.com\/artist\/[^/]+\/([^/]+)$/
      )?.[1] as string;
    }
    const artist = link
      ? await artistService.getArtistByLink({
          token: token,
          page,
          songCount,
          albumCount,
          sortBy,
          sortOrder,
        })
      : await artistService.getArtistById({
          artistId: id!,
          page,
          songCount,
          albumCount,
          sortBy,
          sortOrder,
        });

    if (!artist) {
      return res.status(404).json({
        success: false,
        error: "Artist not found for the given ID or Link",
      });
    }

    res.status(200).json({ success: true, data: artist });
  } catch (error) {
    console.error("Error retrieving album:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

Artist.post("/getArtist/songs", async (req: Request, res: Response) => {
  try {
    const {
      id,
      page = 0,
      sortBy = "popularity",
      sortOrder = "desc",
    } = req.body;

    const artistSongs = await artistService.getArtistSongs({
      artistId: id,
      page: page,
      sortBy: sortBy,
      sortOrder: sortOrder,
    });

    if (!artistSongs) {
      return res
        .status(404)
        .json({ success: false, error: "Artist not found for the given ID" });
    }

    res.status(200).json({ success: true, data: artistSongs });
  } catch (error) {
    console.error("Error retrieving album:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

Artist.post("/getArtist/albums", async (req: Request, res: Response) => {
  try {
    const {
      id,
      page = 0,
      sortBy = "popularity",
      sortOrder = "desc",
    } = req.body;
    const artistSongs = await artistService.getArtistAlbums({
      artistId: id,
      page: page,
      sortBy: sortBy,
      sortOrder: sortOrder,
    });

    if (!artistSongs) {
      return res
        .status(404)
        .json({ success: false, error: "Artist not found for the given ID" });
    }

    res.status(200).json({ success: true, data: artistSongs });
  } catch (error) {
    console.error("Error retrieving album:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export default Artist;
