import express, { Request, Response } from "express";
import { AlbumService } from "../../modules/albums/services";

// Initialize express router
const Album = express.Router();

// Create an instance of AlbumService
const albumService = new AlbumService();

// POST endpoint to retrieve an album by ID
Album.post("/getAlbum", async (req: Request, res: Response) => {
  try {
    // Extract the album ID or link from request query parameters
    const {id,link}=req.body
    let token=''
    if (link) {
       token = (link.match(/jiosaavn\.com\/album\/[^/]+\/([^/]+)$/)?.[1]) as string;
    }
    // Retrieve the album from the AlbumService
    const album = link
      ? await albumService.getAlbumByLink(token)
      : await albumService.getAlbumById(id);

    // If the album is not found, return a 404 response
    if (!album) {
      return res.status(404).json({ success: false, error: "Album not found" });
    }

    // If the album is found, return a 200 response with the album data
    res.status(200).json({ success: true, data: album });
  } catch (error) {
    // If an error occurs during album retrieval, log the error and return a 500 response
    console.error("Error retrieving album:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Export the router to be used in other parts of the application
export default Album;
