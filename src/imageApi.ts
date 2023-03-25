import {FetchType, makeRequest, Request} from "./request";
import {
    AppleImageItem,
    AppleImages,
    AppleOptions,
    AppleStoreFront,
    FanArtBulkImages,
    FrontImage,
    FrontImages,
    Image,
    LibraryType,
    TmDBImageOptions
} from "./ImageApisTypes";
import {hasData, hasError, TMDBResponse} from "./response";
import {levenshtein} from "./helpers";
import {AppendedImages} from "./tmDBTypes";

const appleStoreFronts: AppleStoreFront[] = [{
    countryCode: 'US',
    languageCode: 'en',
    storeFrontId: 143441
}, {
    countryCode: 'GB',
    languageCode: 'en',
    storeFrontId: 143444
}, {
    countryCode: 'AU',
    languageCode: 'en',
    storeFrontId: 143460
}, {
    countryCode: 'CA',
    languageCode: 'en',
    storeFrontId: 143455
}, {
    countryCode: 'DE',
    languageCode: 'de',
    storeFrontId: 143443
}, {
    countryCode: 'FR',
    languageCode: 'fr',
    storeFrontId: 143442
}, {
    countryCode: 'IT',
    languageCode: 'it',
    storeFrontId: 143450
}, {
    countryCode: 'JP',
    languageCode: 'ja',
    storeFrontId: 143462
}, {
    countryCode: 'NL',
    languageCode: 'nl',
    storeFrontId: 143452
}, {
    countryCode: 'ES',
    languageCode: 'es',
    storeFrontId: 143454
}, {
    countryCode: 'SE',
    languageCode: 'sv',
    storeFrontId: 143457
}, {
    countryCode: 'NO',
    languageCode: 'no',
    storeFrontId: 143458
}, {
    countryCode: 'DK',
    languageCode: 'da',
    storeFrontId: 143459
}, {
    countryCode: 'FI',
    languageCode: 'fi',
    storeFrontId: 143447
}, {
    countryCode: 'NZ',
    languageCode: 'en',
    storeFrontId: 143461
}, {
    countryCode: 'IE',
    languageCode: 'en',
    storeFrontId: 143446
}, {
    countryCode: 'CH',
    languageCode: 'de',
    storeFrontId: 143445
}, {
    countryCode: 'AT',
    languageCode: 'de',
    storeFrontId: 143448
}, {
    countryCode: 'BE',
    languageCode: 'fr',
    storeFrontId: 143449
}, {
    countryCode: 'LU',
    languageCode: 'fr',
    storeFrontId: 143451
}, {
    countryCode: 'SG',
    languageCode: 'en',
    storeFrontId: 143464
}, {
    countryCode: 'HK',
    languageCode: 'en',
    storeFrontId: 143465
}, {
    countryCode: 'KR',
    languageCode: 'ko',
    storeFrontId: 143466
}, {
    countryCode: 'TW',
    languageCode: 'zh',
    storeFrontId: 143467
}, {
    countryCode: 'CN',
    languageCode: 'zh',
    storeFrontId: 143468
}, {
    countryCode: 'IN',
    languageCode: 'en',
    storeFrontId: 143470
}, {
    countryCode: 'RU',
    languageCode: 'ru',
    storeFrontId: 143469
}, {
    countryCode: 'TR',
    languageCode: 'tr',
    storeFrontId: 143473
}, {
    countryCode: 'AE',
    languageCode: 'en',
    storeFrontId: 143474
}];

export class ImageApi {
    private readonly _baseURL;
    private readonly _fetch: FetchType | undefined;

    constructor(fetch?: FetchType, baseURL = 'https://webservice.fanart.tv/v3') {
        this._fetch = fetch;
        this._baseURL = baseURL;
    }

    /**
     * Get fan art images for a given library type and id
     * @param type - The library type
     * @param id - The id of the library item
     * @param year - The year of the library item
     * @param apiKey - The fan art api key
     */
    public async getFanArtImages<Library extends LibraryType>(type: Library, id: number, year: number, apiKey: string): Promise<TMDBResponse<FrontImages>> {
        const params = {
            api_key: apiKey
        }

        const request: Request = {
            method: 'GET',
            address: `${this._baseURL}/${this._getFanArtEndpoint(type)}/${id}`,
            query: params,
            fetch: this._fetch
        }

        const data = await makeRequest<FanArtBulkImages>(request);
        if (hasError(data)) {
            return data;
        }

        return {
            data: this._convertImages(data.data, year)
        }
    }

    /**
     * Get images from ben dodson's apple api
     * @param mediaType - The library type
     * @param mediaName - The name of the library item
     * @param options - The options for the request
     */
    public async getAppleImages(mediaType: LibraryType, mediaName: string, options?: AppleOptions): Promise<TMDBResponse<FrontImages>> {
        const result = await this._getImagesFromBenDodson(mediaType, mediaName, options);

        if (hasError(result)) {
            return result;
        }

        const data = result.data as AppleImageItem[];
        const type = mediaType === 'MOVIE' ? 'Movie' : 'Show';
        const filteredData = data.filter((item) => item.type === type);

        if (!filteredData.length) {
            return {
                error: 'No data returned',
                code: 404
            }
        }

        const posters: FrontImage[] = [];
        const backdrops: FrontImage[] = [];
        const logos: FrontImage[] = [];

        filteredData.forEach((item) => {
            const drift = levenshtein(item.title, mediaName);
            const language = options?.languageCode || 'en';
            const year = item.releaseDate ? new Date(item.releaseDate).getFullYear() : options?.year || 0;
            const likes = Math.ceil(2000 / (drift === 0 ? 1 : drift)) + (year === options?.year ? 1000 : -3000);
            const source: 'APPLE' = 'APPLE';
            const data = {
                year, drift, likes,
                language, source
            }

            const poster = item.images.coverArt16X9 || null;
            const logo = item.images.fullColorContentLogo ? item.images.fullColorContentLogo : item.images.singleColorContentLogo || null;
            const background = item.images.previewFrame || null;

            if (poster) {
                posters.push({
                    ...data,
                    url: this._interpretImage(poster, 'jpg', 1280)
                });
            }

            if (background) {
                backdrops.push({
                    ...data,
                    url: this._interpretImage(background, 'jpg')
                });
            }

            if (logo) {
                logos.push({
                    ...data,
                    url: this._interpretImage(logo, 'png')
                });
            }
        });

        return {
            data: {
                posters,
                backdrops,
                logos
            }
        }
    }

    /**
     * Convert the TmDB images to the front end format
     * @param images - The images to convert
     * @param options - The options for the conversion
     */
    public convertTmDBImages(images: AppendedImages, options?: TmDBImageOptions): FrontImages {
        const languageCode = options?.languageCode || 'en';
        const mappedPosters: FrontImage[] = [...images.backdrops, ...images.posters]
            .filter(image => image.file_path !== null)
            .map(image => {
                let likes = 500;
                likes += image.aspect_ratio > 1.5 ?
                    image.iso_639_1 === null ? -500 :
                        image.iso_639_1 === languageCode ? 500 : 200 :
                    image.iso_639_1 === null ? -400 :
                        image.iso_639_1 === languageCode ? -300 : -200;

                likes += (image.vote_count * image.vote_average);

                return {
                    year: options?.year || 0,
                    language: image.iso_639_1,
                    source: 'TmDB',
                    likes: likes,
                    drift: 0,
                    url: 'https://image.tmdb.org/t/p/original' + image.file_path
                }
            })

        const mappedBackdrops: FrontImage[] = [...images.backdrops, ...images.posters]
            .filter(image => image.file_path !== null)
            .map(image => {
                let likes = 0;
                likes += image.aspect_ratio > 1.5 ?
                    image.iso_639_1 === null ? 500 :
                        image.iso_639_1 === languageCode ? -200 : -500 :
                    image.iso_639_1 === null ? 400 :
                        image.iso_639_1 === languageCode ? -200 : -500;

                return {
                    year: options?.year || 0,
                    language: image.iso_639_1,
                    source: 'TmDB',
                    likes: likes,
                    drift: 0,
                    url: 'https://image.tmdb.org/t/p/original' + image.file_path
                }
            })

        const mappedLogos: FrontImage[] = images.logos
            .filter(image => image.file_path !== null)
            .map(image => {
                let likes = Math.floor(image.vote_count * image.vote_average);
                likes += image.iso_639_1 === languageCode ? 1000 :
                    image.iso_639_1 === null ? -1000 : 0;

                return {
                    year: options?.year || 0,
                    language: image.iso_639_1,
                    source: 'TmDB',
                    likes: likes,
                    drift: 0,
                    url: 'https://image.tmdb.org/t/p/original' + image.file_path
                }
            })

        return {
            logos: mappedLogos, backdrops: mappedBackdrops,
            posters: mappedPosters,
        }
    }

    private _interpretImage(image: Image, format: string, newWidth?: number) {
        const ratio = image.width / image.height;
        const newHeight = newWidth ? newWidth / ratio : image.height;

        return image.url.replace('{w}', String(newWidth || image.width))
            .replace('{h}', String(newHeight))
            .replace('{f}', format);
    }

    private async _getImagesFromBenDodson(mediaType: LibraryType, mediaName: string, options?: AppleOptions): Promise<TMDBResponse<AppleImageItem[]>> {
        const storeFrontData = this._getAppleStoreFront(options)
        let storeFront = hasData(storeFrontData) ? storeFrontData.data : appleStoreFronts[0];
        const body = {
            locale: `${storeFront.languageCode}-${storeFront.countryCode}`,
            query: mediaName, storeFront: storeFront.storeFrontId,
        }

        const request: Request = {
            method: 'POST',
            address: 'https://itunesartwork.bendodson.com/url.php',
            body: body,
            fetch: this._fetch
        }

        const result = await makeRequest<{ url: string }>(request);

        if (hasError(result)) {
            return result;
        }

        const url = new URL(result.data.url);

        const searchParams = new URLSearchParams(url.search);

        const params = {
            ...Object.fromEntries(searchParams.entries()),
            sf: storeFront.storeFrontId,
            l: storeFront.languageCode,
            c: storeFront.countryCode,
            q: mediaName,
        }

        const newRequest: Request = {
            method: 'GET',
            address: url.origin + url.pathname,
            query: params,
            fetch: this._fetch
        }

        const newResult = await makeRequest<AppleImages>(newRequest);

        if (hasError(newResult)) {
            return newResult;
        }

        const newData = newResult.data;

        if (newData.data?.canvas?.shelves.length) {
            const movies = newData.data.canvas.shelves.find((shelf) => shelf.title === 'Movies');
            const tvShows = newData.data.canvas.shelves.find((shelf) => shelf.title === 'TV Shows');
            const shelf = mediaType === 'MOVIE' ? movies : tvShows;

            if (shelf && shelf.items.length) {
                return {
                    data: shelf.items
                }
            }
        }

        return {
            error: `No Apple images found for ${mediaName}`,
            code: 404
        };
    }

    private _getFanArtEndpoint(type: LibraryType): string {
        switch (type) {
            case 'MOVIE':
                return 'movies';
            case 'SHOW':
                return 'tv';
        }
    }

    private _getAppleStoreFront(options?: AppleOptions): TMDBResponse<AppleStoreFront> {
        if (!options) {
            return {
                data: appleStoreFronts[0]
            }
        }

        if (options.languageCode) {
            if (options.countryCode) {
                const storeFront = appleStoreFronts.find((front) => front.languageCode === options.languageCode && front.countryCode === options.countryCode);

                if (storeFront) {
                    return {
                        data: storeFront
                    }
                }
            }

            const storeFront = appleStoreFronts.find((front) => front.languageCode === options.languageCode);
            if (storeFront) {
                return {
                    data: storeFront
                }
            }
        } else if (options.countryCode) {
            const storeFront = appleStoreFronts.find((front) => front.countryCode === options.countryCode);
            if (storeFront) {
                return {
                    data: storeFront
                }
            }
        }

        return {
            error: 'No store front found',
            code: 404
        }
    }

    private _convertImages(images: FanArtBulkImages, year: number): FrontImages {
        const logos = images.hdmovielogo || images.hdtvlogo || [];
        const clearArts = images.hdmovieclearart || images.hdclearart || [];
        const posters = images.movieposter || images.tvposter || [];
        const backgrounds = images.moviebackground || images.showbackground || [];
        const thumbs = images.moviethumb || images.tvthumb || [];

        const resultLogos: FrontImage[] = logos.map((logo) => {
            return {
                language: logo.lang,
                likes: +(logo.likes),
                source: 'X-ART',
                url: logo.url,
                drift: 0, year: year
            }
        });

        const resultBackdrops: FrontImage[] = backgrounds.map((backdrop) => {
            return {
                language: backdrop.lang,
                likes: +(backdrop.likes),
                source: 'X-ART',
                url: backdrop.url,
                drift: 0, year: year
            }
        });

        const resultPosters: FrontImage[] = posters.map((poster) => {
            return {
                language: poster.lang,
                likes: +(poster.likes) - 2000,
                source: 'X-ART',
                url: poster.url,
                drift: 0, year: year
            }
        });

        const resultThumbs: FrontImage[] = thumbs.map((thumb) => {
            return {
                language: thumb.lang,
                likes: +(thumb.likes),
                source: 'X-ART',
                url: thumb.url,
                drift: 0, year: year
            }
        });

        const resultClearArts: FrontImage[] = clearArts.map((clearArt) => {
            return {
                language: clearArt.lang,
                likes: +(clearArt.likes) - 1000,
                source: 'X-ART',
                url: clearArt.url,
                drift: 0, year: year
            }
        });


        return {
            logos: resultLogos, backdrops: resultBackdrops,
            posters: [...resultPosters, ...resultThumbs, ...resultClearArts],
        }
    }
}