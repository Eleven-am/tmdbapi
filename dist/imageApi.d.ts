import { FetchType } from "./request";
import { AppleOptions, FrontImages, LibraryType, TmDBImageOptions } from "./ImageApisTypes";
import { TMDBResponse } from "./response";
import { AppendedImages } from "./tmDBTypes";
export declare class ImageApi {
    constructor(apiKey: string, fetch?: FetchType, baseURL?: string);
    /**
     * Get fan art images for a given library type and id
     * @param type - The library type
     * @param id - The id of the library item
     * @param year - The year of the library item
     */
    getFanArtImages<Library extends LibraryType>(type: Library, id: number, year: number): Promise<TMDBResponse<FrontImages>>;
    /**
     * Get images from ben dodson's apple api
     * @param mediaType - The library type
     * @param mediaName - The name of the library item
     * @param options - The options for the request
     */
    getAppleImages(mediaType: LibraryType, mediaName: string, options?: AppleOptions): Promise<TMDBResponse<FrontImages>>;
    /**
     * Convert the TmDB images to the front end format
     * @param images - The images to convert
     * @param options - The options for the conversion
     */
    convertTmDBImages(images: AppendedImages, options?: TmDBImageOptions): FrontImages;
}
