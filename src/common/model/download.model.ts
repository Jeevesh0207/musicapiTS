import { z } from 'zod'; // Importing Zod library

// Define the DownloadLinkModel schema using Zod
export const DownloadLinkModel = z.object({
  quality: z.string(), // Define 'quality' property as a string
  url: z.string()      // Define 'url' property as a string
});
