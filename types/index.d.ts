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

export interface Result<ResultType> {
    page: number;
    results: ResultType[];
    total_pages: number;
    total_results: number;
}

export interface ProviderOption {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
}

export interface CountryProviderOptions {
    buy?: ProviderOption[];
    flatrate?: ProviderOption[];
    rent?: ProviderOption[];
    link: string;
}

export interface BelongsToCollection {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface Video {
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

export interface AppendedVideos {
    results: Video[];
}

export interface Cast {
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

export interface Crew {
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

interface CreditCastDetails {
    credit_id: string;
    character: string;
    order: number;
}

interface CreditCrewDetails {
    credit_id: string;
    department: string;
    job: string;
}

export interface AppendedCredits {
    cast: Cast[];
    crew: Crew[];
}

export interface AppendedPersonCredits<Type> {
    cast: (Type & CreditCastDetails)[];
    crew: (Type & CreditCrewDetails)[];
}

export interface MiniMovie {
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

export interface MiniTVShow {
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

export interface Change {
    id: string;
    action: string;
    time: Date;
    iso_639_1: string;
    value: string;
    original_value: string;
}

export interface Image {
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

export interface Keyword {
    id: number;
    name: string;
}

export interface ReleaseDate {
    certification: string;
    iso_639_1: string;
    note: string;
    release_date: Date;
    type: number;
}

export interface ReleaseDatesResults {
    iso_3166_1: string;
    release_dates: ReleaseDate[];
}

export interface ContentRatingsResult {
    descriptors: any[];
    iso_3166_1: string;
    rating: string;
}

export interface Review {
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

export interface ListItem {
    description: string;
    favorite_count: number;
    id: number;
    item_count: number;
    iso_639_1: string;
    list_type: string;
    name: string;
    poster_path: null | string;

}

export interface AppendedKeywords {
    results: Keyword[];
}

export interface AppendedExternalIds {
    imdb_id: string;
    wikidata_id?: any;
    facebook_id: string;
    instagram_id: string;
    twitter_id: string;
}

export interface AppendedContentRatings {
    results: ContentRatingsResult[];
}

export interface AppendedReleaseDates {
    results: ReleaseDatesResults[];
}

export interface AlternativeTitle {
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

export interface AppendedTranslations {
    translations: Translation[];
}

export interface AppendedProviders {
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

export interface MicroEpisode {
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

export interface BaseEpisode {
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

export interface BaseSeason {
    _id: string;
    air_date: Date;
    episodes: BaseEpisode[];
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
}

export interface MiniSeason {
    air_date: Date;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
}

export interface CreatedBy {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
}

export interface BaseTVShow {
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

export interface AppendedTVShow {
    videos: AppendedVideos;
    credits: AppendedCredits;
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

export interface AppendToSeason {
    videos?: boolean;
    credits?: boolean;
    images?: boolean;
    external_ids?: boolean;
    translations?: boolean;
    watch_providers?: boolean;
}

export interface AppendedSeason {
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

export interface AppendToEpisode {
    videos?: boolean;
    credits?: boolean;
    images?: boolean;
    external_ids?: boolean;
    translations?: boolean;
    watch_providers?: boolean;
}

export interface AppendedEpisode {
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

export interface AppendToPerson {
    movie_credits?: boolean;
    tv_credits?: boolean;
    combined_credits?: boolean;
    external_ids?: boolean;
    images?: boolean;
    tagged_images?: boolean;
    changes?: boolean;
}

export interface KnownFor {
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

export interface MiniPerson {
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

export interface AppendedPersonExternalIds {
    imdb_id: string;
    facebook_id: string;
    instagram_id: string;
    twitter_id: string;
}

export interface AppendedPerson {
    movie_credits: AppendedPersonCredits<MiniMovie>;
    tv_credits: AppendedPersonCredits<MiniTVShow>;
    combined_credits: AppendedPersonCredits<MiniMovie | MiniTVShow>;
    external_ids: AppendedPersonExternalIds;
    images: AppendedImages;
    tagged_images: AppendedTaggedImages;
    changes: AppendedChanges;
}

export interface BasePerson {
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

export interface UpcomingMoviesOptions {
    language?: string;
    page?: number;
    region?: string;
}

export interface NowPlayingMoviesOptions {
    language?: string;
    page?: number;
    region?: string;
}

export interface PopularMediaOptions<Type extends LibraryType> {
    language?: string;
    page?: number;
    region?: string;
    library_type?: Type;
}

export interface TopRatedMediaOptions<Type extends LibraryType> {
    language?: string;
    page?: number;
    region?: string;
    library_type?: Type;
}

export interface TrendingMediaOptions<Type extends LibraryType> {
    language?: string;
    page?: number;
    region?: string;
    library_type?: Type;
    time_window?: 'day' | 'week';
}

export interface AiringShowsOptions {
    language?: string;
    page?: number;
    timezone?: string;
    time_window?: 'airing_today' | 'on_the_air';
}

export interface KeywordOptions<Type extends LibraryType> {
    language?: string;
    page?: number;
    library_type?: Type;
}

export interface RecommendationsOptions<Type extends LibraryType> {
    language?: string;
    page?: number;
    library_type?: Type;
}

export interface MediaOptions<Type extends LibraryType, Append extends AppendToMedia<Type>> {
    language?: string;
    append_to_response?: Append;
    include_image_language?: string | string[];
}

export interface SimilarOptions<Type extends LibraryType> {
    language?: string;
    page?: number;
    library_type?: Type;
}

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
    with_companies?: number | number[];
    with_genres?: number | number[];
    without_genres?: number | number[];
    with_keywords?: string | string[];
    without_keywords?: string | string[];
    with_runtime_gte?: number;
    with_runtime_lte?: number;
    with_original_language?: string;
}

export interface DiscoverOptions<Type extends LibraryType> {
    library_type?: Type;
    language?: string;
    page?: number;
    params?: DiscoverParams;
}

export type LibraryType = 'MOVIE' | 'SHOW' | 'PERSON';

export type AppendedReviews = Result<Review>;

export type AppendedLists = Result<ListItem>;

export type Provider = Record<string, CountryProviderOptions>;

export type AppendedAlternativeTitles = {
    titles: AlternativeTitle[];
}

export type AppendedMovieRecommendations = Result<MiniMovie>;

export type AppendedMovieSimilar = Result<MiniMovie>;

export type AppendedChanges = Result<Change>;

export type AppendedTVShowRecommendations = Result<MiniMovie>;

export type AppendedTVShowSimilar = Result<MiniMovie>;

export type TVShow<Type extends AppendToShow> = BaseTVShow & ReplaceWhenTruthy<Type, AppendedTVShow>;

export type Season<Type extends AppendToSeason> = BaseSeason & ReplaceWhenTrue<Type, AppendedSeason>;

export type Episode<Type extends AppendToEpisode> = BaseEpisode & ReplaceWhenTrue<Type, AppendedEpisode>;

export type Person<Type extends AppendToPerson> = BasePerson & ReplaceWhenTrue<Type, AppendedPerson>;

export type Movie<Type = AppendToMovie> = BaseMovie & ReplaceWhenTrue<Type, AppendedMovie>;

export type LibraryResultType<Type extends LibraryType> = Type extends 'MOVIE' ? MiniMovie : Type extends 'SHOW' ? MiniTVShow : Type extends 'PERSON' ? MiniPerson : never;

export type SearchResult<Type extends LibraryType> = Result<LibraryResultType<Type>>;

export type NowPlayingMovies = Result<MiniMovie>;

export type UpcomingMovies = Result<MiniMovie>;

export type AiringShows = Result<MiniTVShow>;

export type AppendedTaggedImages = Result<Image>;

export type TopRatedMedia<Type extends LibraryType> = Result<LibraryResultType<Type>>;

export type PopularMedia<Type extends LibraryType> = Result<LibraryResultType<Type>>;

export type TrendingMedia<Type extends LibraryType> = Result<LibraryResultType<Type>>;

export type KeywordResult<Type extends LibraryType> = Result<LibraryResultType<Type>>;

export type Recommendations<Type extends LibraryType> = Result<LibraryResultType<Type>>;

export type Similar<Type extends LibraryType> = Result<LibraryResultType<Type>>;

export type DiscoverSortBy = 'popularity.asc' | 'popularity.desc' | 'release_date.asc' | 'release_date.desc' | 'revenue.asc' | 'revenue.desc' | 'primary_release_date.asc' | 'primary_release_date.desc' | 'original_title.asc' | 'original_title.desc' | 'vote_average.asc' | 'vote_average.desc' | 'vote_count.asc' | 'vote_count.desc';

export type Discover<Type extends LibraryType> = Result<LibraryResultType<Type>>;

export type AppendToMedia<Type extends LibraryType> = Type extends 'MOVIE' ? AppendToMovie : Type extends 'SHOW' ? AppendToShow : never;

export type Media<Type extends LibraryType, Append extends AppendToMedia<Type>> =
    Type extends 'MOVIE' ? Movie<Append> :
        Type extends 'SHOW' ? TVShow<Append> :
            never;

export type FetchType = typeof fetch;

export declare class TmDBApi {

    /**
     * Creates an instance of TmDBApi.
     * @param apiKey - The API key for the TMDb API
     * @param fetch - The fetch function to use for requests (optional)
     * @param baseUrl - The base URL for the TMDb API (optional)
     */
    constructor(apiKey: string, fetch?: FetchType, baseUrl?: string);

    /**
     * Get a collection by id.
     * @param id - The collection id
     * @param language - The language to use for the request (optional)
     */
    getCollection(id?: number, language?: string): Promise<Collection>;

    /**
     * Get a Movie by id.
     * @param id - The movie id
     * @param options - The options to use for the request includes the append_to_response and language (optional)
     */
    getMovie<Append extends AppendToMovie>(id: number, options?: MovieOptions<Append>): Promise<Movie<Append>>;

    /**
     * Get a TV Show by id.
     * @param id - The show id
     * @param options - The options to use for the request includes the append_to_response and language (optional)
     */
    getShow<Append extends AppendToShow>(id: number, options?: TVShowOptions<Append>): Promise<TVShow<Append>>;

    /**
     * Gets a media item by id. Can be a Movie, TV Show or Person.
     * @param id - The media id
     * @param library - The library type
     * @param options - The options to use for the request includes the append_to_response and language (optional)
     */
    getMedia<Library extends LibraryType, Append extends AppendToMedia<Library>>(id: number, library: Library, options?: MediaOptions<Library, Append>): Promise<Media<Library, Append>>;

    /**
     * Get a Season by Show id and Season number.
     * @param id - The show id
     * @param seasonNumber - The season number
     * @param options - The options to use for the request includes the append_to_response and language (optional)
     */
    getSeason<Append extends AppendToSeason>(id: number, seasonNumber: number, options?: SeasonOptions<Append>): Promise<Season<Append>>;

    /**
     * Get an Episode by Show id, Season number and Episode number.
     * @param id - The show id
     * @param seasonNumber - The season number
     * @param episodeNumber - The episode number
     * @param options - The options to use for the request includes the append_to_response and language (optional)
     */
    getEpisode<Append extends AppendToEpisode>(id: number, seasonNumber: number, episodeNumber: number, options?: EpisodeOptions<Append>): Promise<Episode<Append>>;

    /**
     * Get a Person by id.
     * @param id - The person id
     * @param options - The options to use for the request includes the append_to_response and language (optional)
     */
    getPerson<Append extends AppendToPerson>(id: number, options?: PersonOptions<Append>): Promise<Person<Append>>;

    /**
     * Get a Company by id.
     * @param id - The company id
     * @param language - The language to use for the request (optional)
     */
    getCompany(id: number, language?: string): Promise<Company>;

    /**
     * Get a Network by id.
     * @param id - The network id
     * @param language - The language to use for the request (optional)
     */
    getNetwork(id: number, language?: string): Promise<Company>;

    /**
     * Search for a Movie, TV Show or Person.
     * @param query - The query to search for
     * @param options - The options to use for the request includes the library_type, language, page, include_adult, region, year, primary_release_year and first_air_date_year (optional)
     */
    searchTmDB<Library extends LibraryType>(query: string, options?: SearchOptions<Library>): Promise<SearchResult<Library>>;

    /**
     * Get the Upcoming Movies.
     * @param options - The options to use for the request includes the language, page and region (optional)
     */
    getUpcomingMovies(options?: UpcomingMoviesOptions): Promise<UpcomingMovies>;

    /**
     * Get the Now Playing Movies.
     * @param options - The options to use for the request includes the language, page and region (optional)
     */
    getNowPlayingMovies(options?: NowPlayingMoviesOptions): Promise<NowPlayingMovies>;

    /**
     * Get the Popular Media.
     * @param options - The options to use for the request includes the library_type, language, page and region (optional)
     */
    getPopularMedia<Library extends LibraryType>(options?: PopularMediaOptions<Library>): Promise<PopularMedia<Library>>;

    /**
     * Get the Top Rated Media.
     * @param options - The options to use for the request includes the library_type, language, page and region (optional)
     */
    getTopRatedMedia<Library extends LibraryType>(options?: TopRatedMediaOptions<Library>): Promise<TopRatedMedia<Library>>;

    /**
     * Get the Trending Media.
     * @param options - The options to use for the request includes the library_type, language, page, region and time_window (optional)
     */
    getTrendingMedia<Library extends LibraryType>(options?: TrendingMediaOptions<Library>): Promise<TrendingMedia<Library>>;

    /**
     * Get the Airing Shows.
     * @param options - The options to use for the request includes the language, page, timezone and time_window (optional)
     */
    getAiringShows(options?: AiringShowsOptions): Promise<AiringShows>;

    /**
     * Get the Media by keyword.
     * @param id - The keyword id
     * @param options - The options to use for the request includes the library_type, language and page (optional)
     */
    getByKeyword<Library extends LibraryType>(id: number, options?: KeywordOptions<Library>): Promise<KeywordResult<Library>>;

    /**
     * Get the Recommendations for a media item.
     * @param id - The media id
     * @param options - The options to use for the request includes the language and page (optional)
     */
    getRecommendations<Library extends LibraryType>(id: number, options?: RecommendationsOptions<Library>): Promise<Recommendations<Library>>;

    /**
     * Get the Similar media items.
     * @param id - The media id
     * @param options - The options to use for the request includes the language and page (optional)
     */
    getSimilar<Library extends LibraryType>(id: number, options?: SimilarOptions<Library>): Promise<Similar<Library>>;

    /**
     * Discover Media.
     * @param options - The options to use for the request includes the library_type, language, page, region, sort_by, certification_country, certification, certification_lte, certification_gte, include_adult, include_video, primary_release_year, primary_release_date_gte, primary_release_date_lte, release_date_gte, release_date_lte, with_release_type, year, vote_count_gte, vote_count_lte, vote_average_gte, vote_average_lte, with_cast, with_crew, with_people, with_companies, with_genres, without_genres
     */
    discoverMedia<Library extends LibraryType>(options?: DiscoverOptions<Library>): Promise<Discover<Library>>;

}
