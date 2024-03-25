import express, { Request, Response } from "express";
import { SongService } from "../../modules/songs/services";

const Song = express.Router();

const songService = new SongService();

Song.post("/getSong", async (req: Request, res: Response) => {
  try {
    const { id, link } = req.body;

    if (!link && !id) {
      return res.status(400).json({
        success: false,
        message: "Either song IDs or link is required",
      });
    }

    let token = "";
    if (link) {
      token = link.match(/jiosaavn\.com\/song\/[^/]+\/([^/]+)$/)?.[1];
    }
    const song = link
      ? await songService.getSongByLink(token)
      : await songService.getSongByIds({ songIds: id });
    if (!song) {
      return res.status(404).json({
        success: false,
        error: "Song not found for the given query",
      });
    }

    res.status(200).json({ success: true, data: song });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

Song.post("/getSongById", async (req: Request, res: Response) => {
  try {
    const { id, lyrics } = req.body;

    const song = await songService.getSongByIds({
      songIds: id,
      includeLyrics: lyrics === "true",
    });

    if (!song) {
      return res.status(404).json({
        success: false,
        error: "Song not found for the given query",
      });
    }

    res.status(200).json({ success: true, data: song });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

Song.post("/getSongLyrics", async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const lyrics = await songService.getSongLyrics(id);

    if (!lyrics) {
      return res.status(404).json({
        success: false,
        error: "Lyrics not found for the given id",
      });
    }

    res.status(200).json({ success: true, data: lyrics });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

Song.post("/getSong/suggestions", async (req: Request, res: Response) => {
  try {
    const { id, limit } = req.body;
    const suggestions = await songService.getSongSuggestions({
      songId: id,
      limit: limit || 10,
    });

    if (!suggestions) {
      return res.status(404).json({
        success: false,
        error: "Suggestions not found for the given id",
      });
    }

    res.status(200).json({ success: true, data: suggestions });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export default Song;
