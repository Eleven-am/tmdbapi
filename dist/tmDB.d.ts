import { FetchType } from "./request";
import { AiringShows, AiringShowsOptions, AppendToEpisode, AppendToMovie, AppendToPerson, AppendToSeason, AppendToShow, Collection, Company, Discover, DiscoverOptions, Episode, EpisodeOptions, KeywordOptions, KeywordResult, LibraryType, Movie, MovieOptions, NowPlayingMovies, NowPlayingMoviesOptions, Person, PersonOptions, PopularMedia, PopularMediaOptions, Recommendations, RecommendationsOptions, SearchOptions, SearchResult, Season, SeasonOptions, Similar, SimilarOptions, TopRatedMedia, TopRatedMediaOptions, TrendingMedia, TrendingMediaOptions, TVShow, TVShowOptions, UpcomingMovies, UpcomingMoviesOptions } from "./tmDBTypes";
import { TMDBResponse } from "./response";
export declare class TmDBApi {
    private readonly _apiKey;
    private readonly _baseUrl;
    private readonly _fetch;
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
    getCollection(id?: number, language?: string): Promise<TMDBResponse<Collection>>;
    /**
     * Get a Movie by id.
     * @param id - The movie id
     * @param options - The options to use for the request includes the append_to_response and language (optional)
     */
    getMovie<Append extends AppendToMovie>(id: number, options?: MovieOptions<Append>): Promise<TMDBResponse<Movie<Append>>>;
    /**
     * Get a TV Show by id.
     * @param id - The show id
     * @param options - The options to use for the request includes the append_to_response and language (optional)
     */
    getShow<Append extends AppendToShow>(id: number, options?: TVShowOptions<Append>): Promise<TMDBResponse<TVShow<Append>>>;
    /**
     * Get a Season by Show id and Season number.
     * @param id - The show id
     * @param seasonNumber - The season number
     * @param options - The options to use for the request includes the append_to_response and language (optional)
     */
    getSeason<Append extends AppendToSeason>(id: number, seasonNumber: number, options?: SeasonOptions<Append>): Promise<TMDBResponse<Season<Append>>>;
    /**
     * Get an Episode by Show id, Season number and Episode number.
     * @param id - The show id
     * @param seasonNumber - The season number
     * @param episodeNumber - The episode number
     * @param options - The options to use for the request includes the append_to_response and language (optional)
     */
    getEpisode<Append extends AppendToEpisode>(id: number, seasonNumber: number, episodeNumber: number, options?: EpisodeOptions<Append>): Promise<TMDBResponse<Episode<Append>>>;
    /**
     * Get a Person by id.
     * @param id - The person id
     * @param options - The options to use for the request includes the append_to_response and language (optional)
     */
    getPerson<Append extends AppendToPerson>(id: number, options?: PersonOptions<Append>): Promise<TMDBResponse<Person<Append>>>;
    /**
     * Get a Company by id.
     * @param id - The company id
     * @param language - The language to use for the request (optional)
     */
    getCompany(id: number, language?: string): Promise<TMDBResponse<Company>>;
    /**
     * Get a Network by id.
     * @param id - The network id
     * @param language - The language to use for the request (optional)
     */
    getNetwork(id: number, language?: string): Promise<TMDBResponse<Company>>;
    /**
     * Search for a Movie, TV Show or Person.
     * @param query - The query to search for
     * @param options - The options to use for the request includes the library_type, language, page, include_adult, region, year, primary_release_year and first_air_date_year (optional)
     */
    searchTmDB<Library extends LibraryType>(query: string, options?: SearchOptions<Library>): Promise<TMDBResponse<SearchResult<Library>>>;
    /**
     * Get the Upcoming Movies.
     * @param options - The options to use for the request includes the language, page and region (optional)
     */
    getUpcomingMovies(options?: UpcomingMoviesOptions): Promise<TMDBResponse<UpcomingMovies>>;
    /**
     * Get the Now Playing Movies.
     * @param options - The options to use for the request includes the language, page and region (optional)
     */
    getNowPlayingMovies(options?: NowPlayingMoviesOptions): Promise<TMDBResponse<NowPlayingMovies>>;
    /**
     * Get the Popular Media.
     * @param options - The options to use for the request includes the library_type, language, page and region (optional)
     */
    getPopularMedia<Library extends LibraryType>(options?: PopularMediaOptions<Library>): Promise<TMDBResponse<PopularMedia<Library>>>;
    /**
     * Get the Top Rated Media.
     * @param options - The options to use for the request includes the library_type, language, page and region (optional)
     */
    getTopRatedMedia<Library extends LibraryType>(options?: TopRatedMediaOptions<Library>): Promise<TMDBResponse<TopRatedMedia<Library>>>;
    /**
     * Get the Trending Media.
     * @param options - The options to use for the request includes the library_type, language, page, region and time_window (optional)
     */
    getTrendingMedia<Library extends LibraryType>(options?: TrendingMediaOptions<Library>): Promise<TMDBResponse<TrendingMedia<Library>>>;
    /**
     * Get the Airing Shows.
     * @param options - The options to use for the request includes the language, page, timezone and time_window (optional)
     */
    getAiringShows(options?: AiringShowsOptions): Promise<TMDBResponse<AiringShows>>;
    /**
     * Get the Media by keyword.
     * @param id - The keyword id
     * @param options - The options to use for the request includes the library_type, language and page (optional)
     */
    getByKeyword<Library extends LibraryType>(id: number, options?: KeywordOptions<Library>): Promise<TMDBResponse<KeywordResult<Library>>>;
    /**
     * Get the Recommendations for a media item.
     * @param id - The media id
     * @param options - The options to use for the request includes the language and page (optional)
     */
    getRecommendations<Library extends LibraryType>(id: number, options?: RecommendationsOptions<Library>): Promise<TMDBResponse<Recommendations<Library>>>;
    /**
     * Get the Similar media items.
     * @param id - The media id
     * @param options - The options to use for the request includes the language and page (optional)
     */
    getSimilar<Library extends LibraryType>(id: number, options?: SimilarOptions<Library>): Promise<TMDBResponse<Similar<Library>>>;
    /**
     * Discover Media.
     * @param options - The options to use for the request includes the library_type, language, page, region, sort_by, certification_country, certification, certification_lte, certification_gte, include_adult, include_video, primary_release_year, primary_release_date_gte, primary_release_date_lte, release_date_gte, release_date_lte, with_release_type, year, vote_count_gte, vote_count_lte, vote_average_gte, vote_average_lte, with_cast, with_crew, with_people, with_companies, with_genres, without_genres
     */
    discoverMedia<Library extends LibraryType>(options?: DiscoverOptions<Library>): Promise<TMDBResponse<Discover<Library>>>;
    private _getAppendToResponse;
    private _getSeasonsAppendToShowResponse;
    private _getProvider;
    private _getDateObject;
    private _getSearchType;
}
