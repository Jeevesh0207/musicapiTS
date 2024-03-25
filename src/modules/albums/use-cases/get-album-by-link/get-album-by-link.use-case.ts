import { HTTPException } from "hono/http-exception";
import { useFetch } from "../../../../common/helpers";
import type { z } from "zod";
import { Endpoints } from "../../../../common/constants";
import type { IUseCase } from "../../../../common/types";
import type { AlbumAPIResponseModel, AlbumModel } from "../../models";
import { createAlbumPayload } from "../../helpers";

// Define the GetAlbumByIdUseCase class implementing the IUseCase interface
export class GetAlbumByLinkUseCase
  implements IUseCase<string, z.infer<typeof AlbumModel>>
{
  constructor() {} // Constructor does not perform any actions

  // Method to execute the use case
  async execute(token: string) {
    // Fetch album data from the API endpoint using useFetch function
    const response = await useFetch<z.infer<typeof AlbumAPIResponseModel>>(
      Endpoints.albums.link,
      { token, type: "album" }
    );

    // If no response is received, throw an HTTPException with a 404 status code
    if (!response) throw new HTTPException(404, { message: "album not found" });

    // Create and return the album payload using the response data
    return createAlbumPayload(response);
  }
}
