type ReplaceWhenTrue<FirstObject, SecondObject> = Pick<SecondObject, {
    [Prop in keyof FirstObject]: Prop extends keyof SecondObject ? FirstObject[Prop] extends true ? Prop : never : never
}[keyof FirstObject]>;

type ReplaceWhenTruthy<FirstObject, SecondObject> = Pick<SecondObject, {
    [Prop in keyof FirstObject]: Prop extends keyof SecondObject ? FirstObject[Prop] extends false | null | undefined | '' ? never : Prop : never
}[keyof FirstObject]>;

export interface AppendToMovie {
    videos?: boolean;
    credits?: boolean;
    recommendations?: boolean;
    similar?: boolean;
    changes?: boolean;
    images?: boolean;
    keywords?: boolean;
    release_dates?: boolean;
    external_ids?: boolean;
    reviews?: boolean;
    translations?: boolean;
    lists?: boolean;
    alternative_titles?: boolean;
    collection?: boolean;
    watch_providers?: boolean;
}

export interface Data {
    name: string;
    overview: string;
}

export interface Translation {
    iso_3166_1: string;
    iso_639_1: string;
    name: string;
    english_name: string;
    data: Data;
}

interface Result<ResultType> {
    page: number;
    results: ResultType[];
    total_pages: number;
    total_results: number;
}

interface ProviderOption {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
}

interface CountryProviderOptions {
    buy?: ProviderOption[];
    flatrate?: ProviderOption[];
    rent?: ProviderOption[];
    link: string;
}

interface BelongsToCollection {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}

interface Genre {
    id: number;
    name: string;
}

interface ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

interface Video {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: 'Trailer' | 'Teaser' | 'Clip' | 'Featurette' | 'Behind the Scenes' | 'Bloopers';
    official: boolean;
    published_at: Date;
    id: string;
}

interface AppendedVideos {
    results: Video[];
}

interface Cast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

interface Crew {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    job: string;
}

interface AppendedCredits {
    cast: Cast[];
    crew: Crew[];
}

interface MiniMovie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: Date;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface MiniTVShow {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date: Date;
    name: string;
    vote_average: number;
    vote_count: number;
}

interface Change {
    id: string;
    action: string;
    time: Date;
    iso_639_1: string;
    value: string;
    original_value: string;
}

interface Image {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: string;
    vote_average: number;
    vote_count: number;
    width: number;
}

export interface AppendedImages {
    backdrops: Image[];
    posters: Image[];
    logos: Image[];
}

interface Keyword {
    id: number;
    name: string;
}

interface ReleaseDate {
    certification: string;
    iso_639_1: string;
    note: string;
    release_date: Date;
    type: number;
}

interface ReleaseDatesResults {
    iso_3166_1: string;
    release_dates: ReleaseDate[];
}

interface ContentRatingsResult {
    descriptors: any[];
    iso_3166_1: string;
    rating: string;
}

interface Review {
    author: string;
    author_details: {
        name: string;
        username: string;
        avatar_path: string;
        rating: number;
    };
    content: string;
    created_at: Date;
    id: string;
    updated_at: Date;
    url: string;
}

interface ListItem {
    description: string;
    favorite_count: number;
    id: number;
    item_count: number;
    iso_639_1: string;
    list_type: string;
    name: string;
    poster_path: null | string;

}

interface AppendedKeywords {
    results: Keyword[];
}

interface AppendedExternalIds {
    imdb_id: string;
    wikidata_id?: any;
    facebook_id: string;
    instagram_id: string;
    twitter_id: string;
}

interface AppendedContentRatings {
    results: ContentRatingsResult[];
}

interface AppendedReleaseDates {
    results: ReleaseDatesResults[];
}


interface AlternativeTitle {
    iso_3166_1: string;
    title: Date;
    type: string;
}

export interface Collection {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    parts: MiniMovie[];
    images: AppendedImages;
}

export interface BaseMovie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: BelongsToCollection | null;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: Date;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

type AppendedReviews = Result<Review>;

type AppendedLists = Result<ListItem>;

type Provider = Record<string, CountryProviderOptions>;

type AppendedAlternativeTitles = {
    titles: AlternativeTitle[];
}

type AppendedMovieRecommendations = Result<MiniMovie>;

type AppendedMovieSimilar = Result<MiniMovie>;

type AppendedChanges = Result<Change>;

interface AppendedTranslations {
    translations: Translation[];
}

interface AppendedProviders {
    results: Provider;
}

export interface AppendedMovie {
    videos: AppendedVideos;
    credits: AppendedCredits;
    recommendations: AppendedMovieRecommendations;
    similar: AppendedMovieSimilar;
    changes: AppendedChanges;
    images: AppendedImages;
    keywords: AppendedKeywords;
    release_dates: AppendedReleaseDates;
    external_ids: AppendedExternalIds;
    reviews: AppendedReviews;
    translations: AppendedTranslations;
    lists: AppendedLists;
    alternative_titles: AppendedAlternativeTitles;
    collection: Collection | null;
    watch_providers: AppendedProviders;
}

export interface MovieOptions<Type = AppendToMovie> {
    language?: string;
    append_to_response?: Type;
    include_image_language?: string | string[];
}

export type Movie<Type = AppendToMovie> = BaseMovie & ReplaceWhenTrue<Type, AppendedMovie>;

export interface AppendToShow {
    videos?: boolean;
    credits?: boolean;
    recommendations?: boolean;
    similar?: boolean;
    changes?: boolean;
    images?: boolean;
    keywords?: boolean;
    external_ids?: boolean;
    appendSeasons?: number | number[] | 'all';
    watch_providers?: boolean;
    content_ratings?: boolean;
    translations?: boolean;
}

interface MicroEpisode {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: Date;
    episode_number: number;
    production_code: Date;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
}

interface BaseEpisode {
    air_date: Date;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: Date;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
    crew: Crew[];
    guest_stars: Cast[];
}

interface BaseSeason {
    _id: string;
    air_date: Date;
    episodes: BaseEpisode[];
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
}

interface MiniSeason {
    air_date: Date;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
}

interface CreatedBy {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
}

interface BaseTVShow {
    adult: boolean;
    backdrop_path: string;
    created_by: CreatedBy[];
    episode_run_time: number[];
    first_air_date: Date;
    genres: Genre[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: Date;
    last_episode_to_air: MicroEpisode;
    name: string;
    next_episode_to_air: MicroEpisode | null;
    networks: ProductionCompany[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    seasons: MiniSeason[];
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
}

type AppendedTVShowRecommendations = Result<MiniMovie>;

type AppendedTVShowSimilar = Result<MiniMovie>;

interface AppendedTVShow {
    videos: AppendedVideos;
    tv_credits: AppendedCredits;
    recommendations: AppendedTVShowRecommendations;
    similar: AppendedTVShowSimilar;
    changes: AppendedChanges;
    images: AppendedImages;
    keywords: AppendedKeywords;
    external_ids: AppendedExternalIds;
    appendSeasons: BaseSeason[];
    watch_providers: AppendedProviders;
    content_ratings: AppendedContentRatings;
    translations: AppendedTranslations;
}

export interface TVShowOptions<Type extends AppendToShow> {
    language?: string;
    append_to_response?: Type;
    include_image_language?: string | string[];
}

export type TVShow<Type extends AppendToShow> = BaseTVShow & ReplaceWhenTruthy<Type, AppendedTVShow>;

export interface AppendToSeason {
    videos?: boolean;
    credits?: boolean;
    images?: boolean;
    external_ids?: boolean;
    translations?: boolean;
    watch_providers?: boolean;
}

interface AppendedSeason {
    videos: AppendedVideos;
    credits: AppendedCredits;
    images: AppendedImages;
    external_ids: AppendedExternalIds;
    translations: AppendedTranslations;
    watch_providers: AppendedProviders;
}

export interface SeasonOptions<Type extends AppendToSeason> {
    language?: string;
    append_to_response?: Type;
    include_image_language?: string | string[];
}

export type Season<Type extends AppendToSeason> = BaseSeason & ReplaceWhenTrue<Type, AppendedSeason>;

export interface AppendToEpisode {
    videos?: boolean;
    credits?: boolean;
    images?: boolean;
    external_ids?: boolean;
    translations?: boolean;
    watch_providers?: boolean;
}

interface AppendedEpisode {
    videos: AppendedVideos;
    credits: AppendedCredits;
    images: {
        stills: Image[];
    }
    external_ids: AppendedExternalIds;
    translations: AppendedTranslations;
    watch_providers: AppendedProviders;
}

export interface EpisodeOptions<Type extends AppendToEpisode> {
    language?: string;
    append_to_response?: Type;
    include_image_language?: string | string[];
}

export type Episode<Type extends AppendToEpisode> = BaseEpisode & ReplaceWhenTrue<Type, AppendedEpisode>;

export interface AppendToPerson {
    movie_credits?: boolean;
    tv_credits?: boolean;
    combined_credits?: boolean;
    external_ids?: boolean;
    images?: boolean;
    tagged_images?: boolean;
    changes?: boolean;
}

interface KnownFor {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface MiniPerson {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    known_for: KnownFor[];
}

interface AppendedPersonExternalIds {
    imdb_id: string;
    facebook_id: string;
    instagram_id: string;
    twitter_id: string;
}

type AppendedTaggedImages = Result<Image>;

interface AppendedPerson {
    movie_credits: AppendedCredits;
    tv_credits: AppendedCredits;
    combined_credits: AppendedCredits;
    external_ids: AppendedPersonExternalIds;
    images: AppendedImages;
    tagged_images: AppendedTaggedImages;
    changes: AppendedChanges;
}

interface BasePerson {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: Date;
    deathday?: Date;
    gender: number;
    homepage?: string;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
}

export interface PersonOptions<Type extends AppendToPerson> {
    language?: string;
    append_to_response?: Type;
    include_image_language?: string | string[];
}

export type Person<Type extends AppendToPerson> = BasePerson & ReplaceWhenTrue<Type, AppendedPerson>;

export interface Company {
    description: string;
    headquarters: string;
    homepage: string;
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
    parent_company: null;
    images: {
        logos: Array<{
            aspect_ratio: number;
            file_path: string;
            height: number;
            id: string;
            file_type: string;
            vote_average: number;
            vote_count: number;
            width: number;
        }>;
    };
    alternative_names: {
        results: Array<{
            name: string;
            type: string;
        }>;
    };
}

export type LibraryType = 'MOVIE' | 'SHOW' | 'PERSON';

export type LibraryResultType<Type extends LibraryType> = Type extends 'MOVIE' ? MiniMovie : Type extends 'SHOW' ? MiniTVShow : Type extends 'PERSON' ? MiniPerson : never;

export interface SearchOptions<Type extends LibraryType> {
    language?: string;
    page?: number;
    include_adult?: boolean;
    library_type?: Type;
    region?: string;
    year?: number;
    primary_release_year?: number;
    first_air_date_year?: number;
}

export type SearchResult<Type extends LibraryType> = Result<LibraryResultType<Type>>;

export interface UpcomingMoviesOptions {
    language?: string;
    page?: number;
    region?: string;
}

export type UpcomingMovies = Result<MiniMovie>;

export interface NowPlayingMoviesOptions {
    language?: string;
    page?: number;
    region?: string;
}

export type NowPlayingMovies = Result<MiniMovie>;

export interface PopularMediaOptions<Type extends LibraryType> {
    language?: string;
    page?: number;
    region?: string;
    library_type?: Type;
}

export type PopularMedia<Type extends LibraryType> = Result<LibraryResultType<Type>>;

export interface TopRatedMediaOptions<Type extends LibraryType> {
    language?: string;
    page?: number;
    region?: string;
    library_type?: Type;
}

export type TopRatedMedia<Type extends LibraryType> = Result<LibraryResultType<Type>>;

export interface TrendingMediaOptions<Type extends LibraryType> {
    language?: string;
    page?: number;
    region?: string;
    library_type?: Type;
    time_window?: 'day' | 'week';
}

export type TrendingMedia<Type extends LibraryType> = Result<LibraryResultType<Type>>;

export interface AiringShowsOptions {
    language?: string;
    page?: number;
    timezone?: string;
    time_window?: 'airing_today' | 'on_the_air';
}

export type AiringShows = Result<MiniTVShow>;

export interface KeywordOptions<Type extends LibraryType> {
    language?: string;
    page?: number;
    library_type?: Type;
}

export type KeywordResult<Type extends LibraryType> = Result<LibraryResultType<Type>>;

export interface RecommendationsOptions<Type extends LibraryType> {
    language?: string;
    page?: number;
    library_type?: Type;
}

export type Recommendations<Type extends LibraryType> = Result<LibraryResultType<Type>>;

export interface SimilarOptions<Type extends LibraryType> {
    language?: string;
    page?: number;
    library_type?: Type;
}

export type Similar<Type extends LibraryType> = Result<LibraryResultType<Type>>;

export interface DiscoverParams {
    region?: string;
    sort_by?: DiscoverSortBy;
    certification_country?: string;
    certification?: string;
    certification_lte?: string;
    certification_gte?: string;
    include_adult?: boolean;
    include_video?: boolean;
    primary_release_year?: number;
    primary_release_date_gte?: string;
    primary_release_date_lte?: string;
    release_date_gte?: string;
    release_date_lte?: string;
    with_release_type?: number;
    year?: number;
    vote_count_gte?: number;
    vote_count_lte?: number;
    vote_average_gte?: number;
    vote_average_lte?: number;
    with_cast?: string;
    with_crew?: string;
    with_people?: string;
    with_companies?: string;
    with_genres?: string;
    without_genres?: string;
    with_keywords?: string;
    without_keywords?: string;
    with_runtime_gte?: number;
    with_runtime_lte?: number;
    with_original_language?: string;
}

type DiscoverSortBy = 'popularity.asc' | 'popularity.desc' | 'release_date.asc' | 'release_date.desc' | 'revenue.asc' | 'revenue.desc' | 'primary_release_date.asc' | 'primary_release_date.desc' | 'original_title.asc' | 'original_title.desc' | 'vote_average.asc' | 'vote_average.desc' | 'vote_count.asc' | 'vote_count.desc';

export interface DiscoverOptions<Type extends LibraryType> {
    library_type?: Type;
    language?: string;
    page?: number;
    params?: DiscoverParams;
}

export type Discover<Type extends LibraryType> = Result<LibraryResultType<Type>>;
