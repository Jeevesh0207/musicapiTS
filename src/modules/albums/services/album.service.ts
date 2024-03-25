import { GetAlbumByIdUseCase, GetAlbumByLinkUseCase } from "../use-cases";

// Define the AlbumService class
export class AlbumService {
  // Private property to hold an instance of the GetAlbumByIdUseCase
  private readonly getAlbumByIdUseCase: GetAlbumByIdUseCase;
  // Private property to hold an instance of the GetAlbumByLinkUseCase
  private readonly getAlbumByLinkUseCase: GetAlbumByLinkUseCase;

  // Constructor to initialize the AlbumService
  constructor() {
    // Initialize the getAlbumByIdUseCase property with a new instance of GetAlbumByIdUseCase
    this.getAlbumByIdUseCase = new GetAlbumByIdUseCase();
    // Initialize the getAlbumByIdUseCase property with a new instance of GetAlbumByLinkUseCase
    this.getAlbumByLinkUseCase = new GetAlbumByLinkUseCase();
  }

  // Method to retrieve an album by ID
  getAlbumById = (albumId: string) => {
    // Delegate the execution of the use case to the getAlbumByIdUseCase instance
    return this.getAlbumByIdUseCase.execute(albumId);
  };
  // Method to retrieve an album by Link
  getAlbumByLink = (albumLink: string) => {
    // Delegate the execution of the use case to the getAlbumByLinkUseCase instance
    return this.getAlbumByLinkUseCase.execute(albumLink);
  };
}
