import {FetchType, makeRequest, Request} from "./request";
import {
    AiringShows, AiringShowsOptions,
    AppendToEpisode,
    AppendToMovie,
    AppendToPerson,
    AppendToSeason,
    AppendToShow,
    Collection,
    Company, Discover, DiscoverOptions,
    Episode,
    EpisodeOptions, KeywordOptions, KeywordResult,
    LibraryType,
    Movie,
    MovieOptions,
    NowPlayingMovies,
    NowPlayingMoviesOptions,
    Person,
    PersonOptions, PopularMedia,
    PopularMediaOptions, Recommendations, RecommendationsOptions,
    SearchOptions,
    SearchResult,
    Season,
    SeasonOptions, Similar, SimilarOptions, TopRatedMedia, TopRatedMediaOptions, TrendingMedia, TrendingMediaOptions,
    TVShow,
    TVShowOptions,
    UpcomingMovies,
    UpcomingMoviesOptions
} from "./tmDBTypes";
import {TMDBResponse, hasError, unwrapOrNull} from "./response";
import {createDates} from "./helpers";

export class TmDBApi {
    private readonly _apiKey: string;
    private readonly _baseUrl: string;
    private readonly _fetch: FetchType | undefined;

    /**
     * Creates an instance of TmDBApi.
     * @param apiKey - The API key for the TMDb API
     * @param fetch - The fetch function to use for requests (optional)
     * @param baseUrl - The base URL for the TMDb API (optional)
     */
    constructor(apiKey: string, fetch?: FetchType, baseUrl: string = 'https://api.themoviedb.org/3') {
        this._apiKey = apiKey;
        this._baseUrl = baseUrl;
        this._fetch = fetch;
    }

    /**
     * Get a collection by id.
     * @param id - The collection id
     * @param language - The language to use for the request (optional)
     */
    public async getCollection(id?: number, language?: string): Promise<TMDBResponse<Collection>> {
        if (!id) {
            return {
                error: 'Collection id is required',
                code: 400
            };
        }

        const params = {
            language,
            api_key: this._apiKey,
            append_to_response: 'images'
        }

        const request: Request = {
            method: 'GET',
            address: `${this._baseUrl}/collection/${id}`,
            query: params,
            fetch: this._fetch
        }

        const data = await makeRequest<Collection>(request);
        return this._getDateObject(data);
    }

    /**
     * Get a Movie by id.
     * @param id - The movie id
     * @param options - The options to use for the request includes the append_to_response and language (optional)
     */
    public async getMovie<Append extends AppendToMovie>(id: number, options?: MovieOptions<Append>): Promise<TMDBResponse<Movie<Append>>> {
        const params = {
            api_key: this._apiKey,
            language: options?.language,
            append_to_response: this._getAppendToResponse(options?.append_to_response)
        }

        const request: Request = {
            method: 'GET',
            address: `${this._baseUrl}/movie/${id}`,
            query: params,
            fetch: this._fetch
        }

        const data = await makeRequest<Movie<Append>>(request);
        const movie = this._getProvider(data, options?.append_to_response);
        if (hasError(movie) || !options?.append_to_response?.collection) {
            return movie;
        }

        const collection = await this.getCollection(movie.data?.belongs_to_collection?.id);
        const newMovie = {
            ...movie.data,
            collection: unwrapOrNull(collection)
        }

        return {
            data: newMovie,
        }
    }

    /**
     * Get a TV Show by id.
     * @param id - The show id
     * @param options - The options to use for the request includes the append_to_response and language (optional)
     */
    public async getShow<Append extends AppendToShow>(id: number, options?: TVShowOptions<Append>): Promise<TMDBResponse<TVShow<Append>>> {
        const params = {
            api_key: this._apiKey,
            language: options?.language,
            append_to_response: this._getAppendToResponse(options?.append_to_response)
        }

        const request: Request = {
            method: 'GET',
            address: `${this._baseUrl}/tv/${id}`,
            query: params,
            fetch: this._fetch
        }

        const data = await makeRequest<TVShow<Append>>(request);
        const show = this._getProvider(data, options?.append_to_response);
        if (hasError(show) || !options?.append_to_response?.appendSeasons) {
            return show;
        }

        if (options?.append_to_response?.appendSeasons === 'all') {
            options.append_to_response.appendSeasons = show.data?.seasons?.
                map(season => season.season_number);
            return this.getShow(id, options);
        }

        const newShow: any = {...show.data};
        const appended = Array.isArray(options?.append_to_response?.appendSeasons) ? options?.append_to_response?.appendSeasons : [options?.append_to_response?.appendSeasons];
        newShow.appendSeasons = appended.map(season => {
            const temp = newShow[`season/${season}`];
            delete newShow[`season/${season}`];
            if (temp) {
                return temp;
            }
        }).filter(season => season);

        return {
            data: newShow
        }
    }

    /**
     * Get a Season by Show id and Season number.
     * @param id - The show id
     * @param seasonNumber - The season number
     * @param options - The options to use for the request includes the append_to_response and language (optional)
     */
    public async getSeason<Append extends AppendToSeason>(id: number, seasonNumber: number, options?: SeasonOptions<Append>): Promise<TMDBResponse<Season<Append>>> {
        const params = {
            api_key: this._apiKey,
            language: options?.language,
            append_to_response: this._getAppendToResponse(options?.append_to_response)
        }

        const request: Request = {
            method: 'GET',
            address: `${this._baseUrl}/tv/${id}/season/${seasonNumber}`,
            query: params,
            fetch: this._fetch
        }

        const data = await makeRequest<Season<Append>>(request);
        return this._getProvider(data, options?.append_to_response);
    }

    /**
     * Get an Episode by Show id, Season number and Episode number.
     * @param id - The show id
     * @param seasonNumber - The season number
     * @param episodeNumber - The episode number
     * @param options - The options to use for the request includes the append_to_response and language (optional)
     */
    public async getEpisode<Append extends AppendToEpisode>(id: number, seasonNumber: number, episodeNumber: number, options?: EpisodeOptions<Append>): Promise<TMDBResponse<Episode<Append>>> {
        const params = {
            api_key: this._apiKey,
            language: options?.language,
            append_to_response: this._getAppendToResponse(options?.append_to_response)
        }

        const request: Request = {
            method: 'GET',
            address: `${this._baseUrl}/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}`,
            query: params,
            fetch: this._fetch
        }

        const data = await makeRequest<Episode<Append>>(request);
        return this._getProvider(data, options?.append_to_response);
    }

    /**
     * Get a Person by id.
     * @param id - The person id
     * @param options - The options to use for the request includes the append_to_response and language (optional)
     */
    public async getPerson<Append extends AppendToPerson>(id: number, options?: PersonOptions<Append>): Promise<TMDBResponse<Person<Append>>> {
        const params = {
            api_key: this._apiKey,
            language: options?.language,
            append_to_response: this._getAppendToResponse(options?.append_to_response)
        }

        const request: Request = {
            method: 'GET',
            address: `${this._baseUrl}/person/${id}`,
            query: params,
            fetch: this._fetch
        }

        const data = await makeRequest<Person<Append>>(request);
        return this._getProvider(data, options?.append_to_response);
    }

    /**
     * Get a Company by id.
     * @param id - The company id
     * @param language - The language to use for the request (optional)
     */
    public async getCompany(id: number, language?: string): Promise<TMDBResponse<Company>> {
        const params = {
            api_key: this._apiKey,
            language: language,
        }

        const request: Request = {
            method: 'GET',
            address: `${this._baseUrl}/company/${id}`,
            query: params,
            fetch: this._fetch
        }

        const data = await makeRequest<Company>(request);
        return this._getDateObject(data);
    }

    /**
     * Get a Network by id.
     * @param id - The network id
     * @param language - The language to use for the request (optional)
     */
    public async getNetwork(id: number, language?: string): Promise<TMDBResponse<Company>> {
        const params = {
            api_key: this._apiKey,
            language: language,
        }

        const request: Request = {
            method: 'GET',
            address: `${this._baseUrl}/network/${id}`,
            query: params,
            fetch: this._fetch
        }

        const data = await makeRequest<Company>(request);
        return this._getDateObject(data);
    }

    /**
     * Search for a Movie, TV Show or Person.
     * @param query - The query to search for
     * @param options - The options to use for the request includes the library_type, language, page, include_adult, region, year, primary_release_year and first_air_date_year (optional)
     */
    public async searchTmDB<Library extends LibraryType>(query: string, options?: SearchOptions<Library>): Promise<TMDBResponse<SearchResult<Library>>> {
        const params = {
            api_key: this._apiKey,
            language: options?.language,
            query: query,
            page: options?.page,
            include_adult: options?.include_adult,
            region: options?.region,
            year: options?.year,
            primary_release_year: options?.primary_release_year,
            first_air_date_year: options?.first_air_date_year
        }

        const request: Request = {
            method: 'GET',
            address: `${this._baseUrl}/search/${this._getSearchType(options?.library_type)}`,
            query: params,
            fetch: this._fetch
        }

        const data = await makeRequest<SearchResult<Library>>(request);
        return this._getDateObject(data);
    }

    /**
     * Get the Upcoming Movies.
     * @param options - The options to use for the request includes the language, page and region (optional)
     */
    public async getUpcomingMovies(options?: UpcomingMoviesOptions): Promise<TMDBResponse<UpcomingMovies>> {
        const params = {
            api_key: this._apiKey,
            language: options?.language,
            page: options?.page,
            region: options?.region
        }

        const request: Request = {
            method: 'GET',
            address: `${this._baseUrl}/movie/upcoming`,
            query: params,
            fetch: this._fetch
        }

        const data = await makeRequest<UpcomingMovies>(request);
        return this._getDateObject(data);
    }

    /**
     * Get the Now Playing Movies.
     * @param options - The options to use for the request includes the language, page and region (optional)
     */
    public async getNowPlayingMovies(options?: NowPlayingMoviesOptions): Promise<TMDBResponse<NowPlayingMovies>> {
        const params = {
            api_key: this._apiKey,
            language: options?.language,
            page: options?.page,
            region: options?.region
        }

        const request: Request = {
            method: 'GET',
            address: `${this._baseUrl}/movie/now_playing`,
            query: params,
            fetch: this._fetch
        }

        const data = await makeRequest<NowPlayingMovies>(request);
        return this._getDateObject(data);
    }

    /**
     * Get the Popular Media.
     * @param options - The options to use for the request includes the library_type, language, page and region (optional)
     */
    public async getPopularMedia<Library extends LibraryType>(options?: PopularMediaOptions<Library>): Promise<TMDBResponse<PopularMedia<Library>>> {
        const params = {
            api_key: this._apiKey,
            language: options?.language,
            page: options?.page,
            region: options?.region
        }

        const request: Request = {
            method: 'GET',
            address: `${this._baseUrl}/${this._getSearchType(options?.library_type)}/popular`,
            query: params,
            fetch: this._fetch
        }

        const data = await makeRequest<PopularMedia<Library>>(request);
        return this._getDateObject(data);
    }

    /**
     * Get the Top Rated Media.
     * @param options - The options to use for the request includes the library_type, language, page and region (optional)
     */
    public async getTopRatedMedia<Library extends LibraryType>(options?: TopRatedMediaOptions<Library>): Promise<TMDBResponse<TopRatedMedia<Library>>> {
        const params = {
            api_key: this._apiKey,
            language: options?.language,
            page: options?.page,
            region: options?.region
        }

        const request: Request = {
            method: 'GET',
            address: `${this._baseUrl}/${this._getSearchType(options?.library_type)}/top_rated`,
            query: params,
            fetch: this._fetch
        }

        const data = await makeRequest<TopRatedMedia<Library>>(request);
        return this._getDateObject(data);
    }

    /**
     * Get the Trending Media.
     * @param options - The options to use for the request includes the library_type, language, page, region and time_window (optional)
     */
    public async getTrendingMedia<Library extends LibraryType>(options?: TrendingMediaOptions<Library>): Promise<TMDBResponse<TrendingMedia<Library>>> {
        const params = {
            api_key: this._apiKey,
            language: options?.language,
            page: options?.page,
            region: options?.region,
            time_window: options?.time_window
        }

        const request: Request = {
            method: 'GET',
            address: `${this._baseUrl}/trending/${this._getSearchType(options?.library_type)}/${options?.time_window ?? 'day'}`,
            query: params,
            fetch: this._fetch
        }

        const data = await makeRequest<TrendingMedia<Library>>(request);
        return this._getDateObject(data);
    }

    /**
     * Get the Airing Shows.
     * @param options - The options to use for the request includes the language, page, timezone and time_window (optional)
     */
    public async getAiringShows(options?: AiringShowsOptions): Promise<TMDBResponse<AiringShows>> {
        const params = {
            api_key: this._apiKey,
            language: options?.language,
            page: options?.page,
            timezone: options?.timezone
        }

        const request: Request = {
            method: 'GET',
            address: `${this._baseUrl}/tv/${options?.time_window ?? 'airing_today'}`,
            query: params,
            fetch: this._fetch
        }

        const data = await makeRequest<AiringShows>(request);
        return this._getDateObject(data);
    }

    /**
     * Get the Media by keyword.
     * @param id - The keyword id
     * @param options - The options to use for the request includes the library_type, language and page (optional)
     */
    public async getByKeyword<Library extends LibraryType>(id: number, options?: KeywordOptions<Library>): Promise<TMDBResponse<KeywordResult<Library>>> {
        const params = {
            api_key: this._apiKey,
            language: options?.language,
            page: options?.page
        }

        const request: Request = {
            method: 'GET',
            address: `${this._baseUrl}/keyword/${id}/${this._getSearchType(options?.library_type)}`,
            query: params,
            fetch: this._fetch
        }

        const data = await makeRequest<KeywordResult<Library>>(request);
        return this._getDateObject(data);
    }

    /**
     * Get the Recommendations for a media item.
     * @param id - The media id
     * @param options - The options to use for the request includes the language and page (optional)
     */
    public async getRecommendations<Library extends LibraryType>(id: number, options?: RecommendationsOptions<Library>): Promise<TMDBResponse<Recommendations<Library>>> {
        const params = {
            api_key: this._apiKey,
            language: options?.language,
            page: options?.page
        }

        const request: Request = {
            method: 'GET',
            address: `${this._baseUrl}/${this._getSearchType(options?.library_type)}/${id}/recommendations`,
            query: params,
            fetch: this._fetch
        }

        const data = await makeRequest<Recommendations<Library>>(request);
        return this._getDateObject(data);
    }

    /**
     * Get the Similar media items.
     * @param id - The media id
     * @param options - The options to use for the request includes the language and page (optional)
     */
    public async getSimilar<Library extends LibraryType>(id: number, options?: SimilarOptions<Library>): Promise<TMDBResponse<Similar<Library>>> {
        const params = {
            api_key: this._apiKey,
            language: options?.language,
            page: options?.page
        }

        const request: Request = {
            method: 'GET',
            address: `${this._baseUrl}/${this._getSearchType(options?.library_type)}/${id}/similar`,
            query: params,
            fetch: this._fetch
        }

        const data = await makeRequest<Similar<Library>>(request);
        return this._getDateObject(data);
    }

    /**
     * Discover Media.
     * @param options - The options to use for the request includes the library_type, language, page, region, sort_by, certification_country, certification, certification_lte, certification_gte, include_adult, include_video, primary_release_year, primary_release_date_gte, primary_release_date_lte, release_date_gte, release_date_lte, with_release_type, year, vote_count_gte, vote_count_lte, vote_average_gte, vote_average_lte, with_cast, with_crew, with_people, with_companies, with_genres, without_genres
     */
    public async discoverMedia<Library extends LibraryType>(options?: DiscoverOptions<Library>): Promise<TMDBResponse<Discover<Library>>> {
        const params = {
            ...options?.params,
            api_key: this._apiKey,
            language: options?.language,
            page: options?.page
        }

        const request: Request = {
            method: 'GET',
            address: `${this._baseUrl}/discover/${this._getSearchType(options?.library_type)}`,
            query: params,
            fetch: this._fetch
        }

        const data = await makeRequest<Discover<Library>>(request);
        return this._getDateObject(data);
    }

    private _getAppendToResponse(options?: AppendToMovie | AppendToShow | AppendToPerson): string[] | undefined {
        let appendToResponse: string[] = [];
        if (options?.changes) appendToResponse.push('changes');
        if (options?.images) appendToResponse.push('images');
        if (options && 'release_dates' in options) appendToResponse.push('release_dates');
        if (options && 'keywords' in options) appendToResponse.push('keywords');
        if (options && 'videos' in options) appendToResponse.push('videos');
        if (options && 'credits' in options) appendToResponse.push('credits');
        if (options && 'recommendations' in options) appendToResponse.push('recommendations');
        if (options && 'similar' in options) appendToResponse.push('similar');
        if (options?.external_ids) appendToResponse.push('external_ids');
        if (options && 'reviews' in options) appendToResponse.push('reviews');
        if (options && 'translations' in options) appendToResponse.push('translations');
        if (options && 'lists' in options) appendToResponse.push('lists');
        if (options && 'appendSeasons' in options) appendToResponse.push(...this._getSeasonsAppendToShowResponse(options.appendSeasons));
        if (options && 'watch_providers' in options) appendToResponse.push('watch/providers');
        if (options && 'movie_credits' in options) appendToResponse.push('movie_credits');
        if (options && 'tv_credits' in options) appendToResponse.push('tv_credits');
        if (options && 'combined_credits' in options) appendToResponse.push('combined_credits');
        if (options && 'tagged_images' in options) appendToResponse.push('tagged_images');
        if (appendToResponse.length === 0) return undefined;
        return appendToResponse;
    }

    private _getSeasonsAppendToShowResponse(options?: number | number[] | 'all'): string[] {
        if (!options || options === 'all') return [];
        return Array.isArray(options) ? options.map(o => `season/${o}`) : [`season/${options}`];
    }

    private _getProvider<DataType>(data: TMDBResponse<DataType>, options?: AppendToMovie | AppendToShow | AppendToPerson): TMDBResponse<DataType> {
        data = this._getDateObject(data);
        if (hasError(data) || !options || !('watch_providers' in options)) {
            return data;
        }

        const newResponse: any = {
            ...data.data,
        }

        const watchProviders = newResponse['watch/providers'];
        delete newResponse['watch/providers'];

        if (watchProviders) {
            newResponse.watch_providers = watchProviders;
        }

        return {
            data: newResponse
        }
    }

    private _getDateObject<DataType>(data: TMDBResponse<DataType>) : TMDBResponse<DataType> {
        if (hasError(data)) {
            return data;
        }

        return createDates(data);
    }

    private _getSearchType(type?: LibraryType): string {
        switch (type) {
            case 'MOVIE':
                return 'movie';
            case 'SHOW':
                return 'tv';
            case 'PERSON':
                return 'person';
            default:
                return 'multi';
        }
    }
}