interface FanArtImage {
    id: string,
    url: string,
    lang: string,
    likes: string
}

export interface FanArtBulkImages {
    name: string;
    hdmovielogo?: FanArtImage[];
    hdtvlogo?: FanArtImage[];
    moviethumb?: FanArtImage[];
    tvthumb?: FanArtImage[];
    moviebackground?: FanArtImage[];
    showbackground?: FanArtImage[];
    hdclearart?: FanArtImage[];
    hdmovieclearart?: FanArtImage[];
    movieposter?: FanArtImage[];
    tvposter?: FanArtImage[];
}

export type LibraryType = 'MOVIE' | 'SHOW';

export interface Image {
    width: number;
    height: number;
    url: string;
}

interface AppleImage {
    coverArt: {
        width: number;
        height: number;
        url: string;
        supportsLayeredImage: boolean;
        joeColor: string;
    };
    previewFrame: {
        width: number;
        height: number;
        url: string;
        joeColor: string;
    };
    singleColorContentLogo: {
        width: number;
        height: number;
        url: string;
        joeColor: string;
    };
    fullColorContentLogo: {
        width: number;
        height: number;
        url: string;
        joeColor: string;
    };
    centeredFullScreenBackgroundImage: {
        width: number;
        height: number;
        url: string;
        joeColor: string;
    };
    centeredFullScreenBackgroundSmallImage: {
        width: number;
        height: number;
        url: string;
        joeColor: string;
    };
    coverArt16X9: {
        width: number;
        height: number;
        url: string;
        supportsLayeredImage: boolean;
        joeColor: string;
    };
}

export interface AppleImageItem {
    id: string;
    type: string;
    isEntitledToPlay: boolean;
    title: string;
    description: string;
    releaseDate: number;
    rating: {
        name: string;
        value: number;
        system: string;
        displayName: string;
        reason: string;
    };
    contentAdvisories: Array<string>;
    tomatometerFreshness: string;
    tomatometerPercentage: number;
    commonSenseRecommendedAge: number;
    images: AppleImage;
    url: string;
    rolesSummary: {
        cast: Array<string>;
        directors: Array<string>;
    };
    duration: number;
}

export interface AppleImages {
    data?: {
        q: string;
        canvas?: {
            id: string;
            type: 'movie' | 'tvShow';
            title: string;
            nextToken: null;
            shelves: Array<{
                title: string;
                id: string;
                items: AppleImageItem[];
                url: string;
                displayType: string;
                version: string;
                nextToken: null;
            }>;
        };
    };
    utsk: string;
}

export interface AppleStoreFront {
    languageCode: string;
    storeFrontId: number;
    countryCode: string;
}

export interface AppleOptions {
    languageCode?: string;
    countryCode?: string;
    year?: number;
}

export interface FrontImage {
    language: string | null;
    source: 'APPLE' | 'TmDB' | 'X-ART';
    year: number;
    drift: number;
    likes: number;
    url: string;
}

export interface FrontImages {
    backdrops: FrontImage[];
    posters: FrontImage[];
    logos: FrontImage[];
}

export type TmDBImageOptions = AppleOptions;