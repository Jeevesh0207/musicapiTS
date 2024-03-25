import express, { Request, Response } from "express";
import { PlaylistService } from "../../modules/playlists/services";

const Playlist = express.Router();

const playlistService = new PlaylistService();

Playlist.post("/getPlaylist", async (req: Request, res: Response) => {
  try {
    const { id, link } = req.body;

    if (!link && !id) {
      return res.status(400).json(
        { success: false, message: "Either playlist ID or link is required" }
      );
    }

    let token = "";
    if (link) {
      token = link.match(
        /jiosaavn\.com\/featured\/[^/]+\/([^/]+)$/
      )?.[1] as string;
    }
    const playlist = link
      ? await playlistService.getPlaylistByLink(token)
      : await playlistService.getPlaylistById(id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        error: "Playlist not found for the given ID or Link",
      });
    }

    res.status(200).json({ success: true, data: playlist });
  } catch (error) {
    console.error("Error retrieving album:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export default Playlist;
