import express from "express";
import Album from "./Album/Album";
import Artist from "./Artists/Artits";
import Playlist from "./Playlist/Playlist";
import Search from "./Search/Search";
import Song from "./Song/Song";

// Initialize express router
const router = express.Router();

router.use('/',Album)
router.use('/',Artist)
router.use('/',Playlist)
router.use('/',Search)
router.use('/',Song)

// Export the router to be used in other parts of the application
export default router;
