"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TmDBApi = void 0;
const request_1 = require("./request");
const helpers_1 = require("./helpers");
class TmDBApi {
    /**
     * Creates an instance of TmDBApi.
     * @param apiKey - The API key for the TMDb API
     * @param fetch - The fetch function to use for requests (optional)
     * @param baseUrl - The base URL for the TMDb API (optional)
     */
    constructor(apiKey, fetch, baseUrl = 'https://api.themoviedb.org/3') {
        this._apiKey = apiKey;
        this._baseUrl = baseUrl;
        this._fetch = fetch;
    }
    /**
     * Get a collection by id.
     * @param id - The collection id
     * @param language - The language to use for the request (optional)
     */
    getCollection(id, language) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error('Collection id is required');
            }
            const params = {
                language,
                api_key: this._apiKey,
                append_to_response: 'images'
            };
            const request = {
                method: 'GET',
                address: `${this._baseUrl}/collection/${id}`,
                query: params,
                fetch: this._fetch
            };
            const data = yield (0, request_1.makeRequest)(request);
            return this._getDateObject(data);
        });
    }
    /**
     * Get a Movie by id.
     * @param id - The movie id
     * @param options - The options to use for the request includes the append_to_response and language (optional)
     */
    getMovie(id, options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                api_key: this._apiKey,
                language: options === null || options === void 0 ? void 0 : options.language,
                append_to_response: this._getAppendToResponse(options === null || options === void 0 ? void 0 : options.append_to_response)
            };
            const request = {
                method: 'GET',
                address: `${this._baseUrl}/movie/${id}`,
                query: params,
                fetch: this._fetch
            };
            const data = yield (0, request_1.makeRequest)(request);
            const movie = this._getProvider(data, options === null || options === void 0 ? void 0 : options.append_to_response);
            if (!((_a = options === null || options === void 0 ? void 0 : options.append_to_response) === null || _a === void 0 ? void 0 : _a.collection) || !((_b = movie === null || movie === void 0 ? void 0 : movie.belongs_to_collection) === null || _b === void 0 ? void 0 : _b.id)) {
                return movie;
            }
            const collection = yield this.getCollection(movie.belongs_to_collection.id);
            const newMovie = Object.assign(Object.assign({}, movie), { collection: collection !== null && collection !== void 0 ? collection : null });
            return Object.assign({}, newMovie);
        });
    }
    /**
     * Get a TV Show by id.
     * @param id - The show id
     * @param options - The options to use for the request includes the append_to_response and language (optional)
     */
    getShow(id, options) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                api_key: this._apiKey,
                language: options === null || options === void 0 ? void 0 : options.language,
                append_to_response: this._getAppendToResponse(options === null || options === void 0 ? void 0 : options.append_to_response)
            };
            const request = {
                method: 'GET',
                address: `${this._baseUrl}/tv/${id}`,
                query: params,
                fetch: this._fetch
            };
            const data = yield (0, request_1.makeRequest)(request);
            const show = this._getProvider(data, options === null || options === void 0 ? void 0 : options.append_to_response);
            if (!((_a = options === null || options === void 0 ? void 0 : options.append_to_response) === null || _a === void 0 ? void 0 : _a.appendSeasons)) {
                return show;
            }
            if (((_b = options === null || options === void 0 ? void 0 : options.append_to_response) === null || _b === void 0 ? void 0 : _b.appendSeasons) === 'all') {
                const seasons = (0, helpers_1.groupByLength)(show.seasons.map(season => season.season_number), 20);
                const seasonPromises = seasons.map(season => this.getShow(id, Object.assign(Object.assign({}, options), { append_to_response: {
                        appendSeasons: season
                    } })));
                const seasonData = yield Promise.all(seasonPromises);
                const appendSeasons = seasonData.map(season => season.appendSeasons).flat();
                return Object.assign(Object.assign({}, show), { appendSeasons });
            }
            const newShow = Object.assign({}, show);
            const appended = Array.isArray((_c = options === null || options === void 0 ? void 0 : options.append_to_response) === null || _c === void 0 ? void 0 : _c.appendSeasons) ? (_d = options === null || options === void 0 ? void 0 : options.append_to_response) === null || _d === void 0 ? void 0 : _d.appendSeasons : [(_e = options === null || options === void 0 ? void 0 : options.append_to_response) === null || _e === void 0 ? void 0 : _e.appendSeasons];
            newShow.appendSeasons = appended.map(season => {
                const temp = newShow[`season/${season}`];
                delete newShow[`season/${season}`];
                if (temp) {
                    return temp;
                }
            }).filter(season => season);
            return Object.assign({}, newShow);
        });
    }
    getMedia(id, library, options) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (library) {
                case 'MOVIE':
                    return yield this.getMovie(id, options);
                case 'SHOW':
                    return yield this.getShow(id, options);
                default:
                    throw new Error('Invalid library type');
            }
        });
    }
    /**
     * Get a Season by Show id and Season number.
     * @param id - The show id
     * @param seasonNumber - The season number
     * @param options - The options to use for the request includes the append_to_response and language (optional)
     */
    getSeason(id, seasonNumber, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                api_key: this._apiKey,
                language: options === null || options === void 0 ? void 0 : options.language,
                append_to_response: this._getAppendToResponse(options === null || options === void 0 ? void 0 : options.append_to_response)
            };
            const request = {
                method: 'GET',
                address: `${this._baseUrl}/tv/${id}/season/${seasonNumber}`,
                query: params,
                fetch: this._fetch
            };
            const data = yield (0, request_1.makeRequest)(request);
            return this._getProvider(data, options === null || options === void 0 ? void 0 : options.append_to_response);
        });
    }
    /**
     * Get an Episode by Show id, Season number and Episode number.
     * @param id - The show id
     * @param seasonNumber - The season number
     * @param episodeNumber - The episode number
     * @param options - The options to use for the request includes the append_to_response and language (optional)
     */
    getEpisode(id, seasonNumber, episodeNumber, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                api_key: this._apiKey,
                language: options === null || options === void 0 ? void 0 : options.language,
                append_to_response: this._getAppendToResponse(options === null || options === void 0 ? void 0 : options.append_to_response)
            };
            const request = {
                method: 'GET',
                address: `${this._baseUrl}/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}`,
                query: params,
                fetch: this._fetch
            };
            const data = yield (0, request_1.makeRequest)(request);
            return this._getProvider(data, options === null || options === void 0 ? void 0 : options.append_to_response);
        });
    }
    /**
     * Get a Person by id.
     * @param id - The person id
     * @param options - The options to use for the request includes the append_to_response and language (optional)
     */
    getPerson(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                api_key: this._apiKey,
                language: options === null || options === void 0 ? void 0 : options.language,
                append_to_response: this._getAppendToResponse(options === null || options === void 0 ? void 0 : options.append_to_response)
            };
            const request = {
                method: 'GET',
                address: `${this._baseUrl}/person/${id}`,
                query: params,
                fetch: this._fetch
            };
            const data = yield (0, request_1.makeRequest)(request);
            return this._getProvider(data, options === null || options === void 0 ? void 0 : options.append_to_response);
        });
    }
    /**
     * Get a Company by id.
     * @param id - The company id
     * @param language - The language to use for the request (optional)
     */
    getCompany(id, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                api_key: this._apiKey,
                language: language,
            };
            const request = {
                method: 'GET',
                address: `${this._baseUrl}/company/${id}`,
                query: params,
                fetch: this._fetch
            };
            const data = yield (0, request_1.makeRequest)(request);
            return this._getDateObject(data);
        });
    }
    /**
     * Get a Network by id.
     * @param id - The network id
     * @param language - The language to use for the request (optional)
     */
    getNetwork(id, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                api_key: this._apiKey,
                language: language,
            };
            const request = {
                method: 'GET',
                address: `${this._baseUrl}/network/${id}`,
                query: params,
                fetch: this._fetch
            };
            const data = yield (0, request_1.makeRequest)(request);
            return this._getDateObject(data);
        });
    }
    /**
     * Search for a Movie, TV Show or Person.
     * @param query - The query to search for
     * @param options - The options to use for the request includes the library_type, language, page, include_adult, region, year, primary_release_year and first_air_date_year (optional)
     */
    searchTmDB(query, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                api_key: this._apiKey,
                language: options === null || options === void 0 ? void 0 : options.language,
                query: query,
                page: options === null || options === void 0 ? void 0 : options.page,
                include_adult: options === null || options === void 0 ? void 0 : options.include_adult,
                region: options === null || options === void 0 ? void 0 : options.region,
                year: options === null || options === void 0 ? void 0 : options.year,
                primary_release_year: options === null || options === void 0 ? void 0 : options.primary_release_year,
                first_air_date_year: options === null || options === void 0 ? void 0 : options.first_air_date_year
            };
            const request = {
                method: 'GET',
                address: `${this._baseUrl}/search/${this._getSearchType(options === null || options === void 0 ? void 0 : options.library_type)}`,
                query: params,
                fetch: this._fetch
            };
            const data = yield (0, request_1.makeRequest)(request);
            return this._getDateObject(data);
        });
    }
    /**
     * Get the Upcoming Movies.
     * @param options - The options to use for the request includes the language, page and region (optional)
     */
    getUpcomingMovies(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                api_key: this._apiKey,
                language: options === null || options === void 0 ? void 0 : options.language,
                page: options === null || options === void 0 ? void 0 : options.page,
                region: options === null || options === void 0 ? void 0 : options.region
            };
            const request = {
                method: 'GET',
                address: `${this._baseUrl}/movie/upcoming`,
                query: params,
                fetch: this._fetch
            };
            const data = yield (0, request_1.makeRequest)(request);
            return this._getDateObject(data);
        });
    }
    /**
     * Get the Now Playing Movies.
     * @param options - The options to use for the request includes the language, page and region (optional)
     */
    getNowPlayingMovies(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                api_key: this._apiKey,
                language: options === null || options === void 0 ? void 0 : options.language,
                page: options === null || options === void 0 ? void 0 : options.page,
                region: options === null || options === void 0 ? void 0 : options.region
            };
            const request = {
                method: 'GET',
                address: `${this._baseUrl}/movie/now_playing`,
                query: params,
                fetch: this._fetch
            };
            const data = yield (0, request_1.makeRequest)(request);
            return this._getDateObject(data);
        });
    }
    /**
     * Get the Popular Media.
     * @param options - The options to use for the request includes the library_type, language, page and region (optional)
     */
    getPopularMedia(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                api_key: this._apiKey,
                language: options === null || options === void 0 ? void 0 : options.language,
                page: options === null || options === void 0 ? void 0 : options.page,
                region: options === null || options === void 0 ? void 0 : options.region
            };
            const request = {
                method: 'GET',
                address: `${this._baseUrl}/${this._getSearchType(options === null || options === void 0 ? void 0 : options.library_type)}/popular`,
                query: params,
                fetch: this._fetch
            };
            const data = yield (0, request_1.makeRequest)(request);
            return this._getDateObject(data);
        });
    }
    /**
     * Get the Top Rated Media.
     * @param options - The options to use for the request includes the library_type, language, page and region (optional)
     */
    getTopRatedMedia(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                api_key: this._apiKey,
                language: options === null || options === void 0 ? void 0 : options.language,
                page: options === null || options === void 0 ? void 0 : options.page,
                region: options === null || options === void 0 ? void 0 : options.region
            };
            const request = {
                method: 'GET',
                address: `${this._baseUrl}/${this._getSearchType(options === null || options === void 0 ? void 0 : options.library_type)}/top_rated`,
                query: params,
                fetch: this._fetch
            };
            const data = yield (0, request_1.makeRequest)(request);
            return this._getDateObject(data);
        });
    }
    /**
     * Get the Trending Media.
     * @param options - The options to use for the request includes the library_type, language, page, region and time_window (optional)
     */
    getTrendingMedia(options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                api_key: this._apiKey,
                language: options === null || options === void 0 ? void 0 : options.language,
                page: options === null || options === void 0 ? void 0 : options.page,
                region: options === null || options === void 0 ? void 0 : options.region,
                time_window: options === null || options === void 0 ? void 0 : options.time_window
            };
            const request = {
                method: 'GET',
                address: `${this._baseUrl}/trending/${this._getSearchType(options === null || options === void 0 ? void 0 : options.library_type)}/${(_a = options === null || options === void 0 ? void 0 : options.time_window) !== null && _a !== void 0 ? _a : 'day'}`,
                query: params,
                fetch: this._fetch
            };
            const data = yield (0, request_1.makeRequest)(request);
            return this._getDateObject(data);
        });
    }
    /**
     * Get the Airing Shows.
     * @param options - The options to use for the request includes the language, page, timezone and time_window (optional)
     */
    getAiringShows(options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                api_key: this._apiKey,
                language: options === null || options === void 0 ? void 0 : options.language,
                page: options === null || options === void 0 ? void 0 : options.page,
                timezone: options === null || options === void 0 ? void 0 : options.timezone
            };
            const request = {
                method: 'GET',
                address: `${this._baseUrl}/tv/${(_a = options === null || options === void 0 ? void 0 : options.time_window) !== null && _a !== void 0 ? _a : 'airing_today'}`,
                query: params,
                fetch: this._fetch
            };
            const data = yield (0, request_1.makeRequest)(request);
            return this._getDateObject(data);
        });
    }
    /**
     * Get the Media by keyword.
     * @param id - The keyword id
     * @param options - The options to use for the request includes the library_type, language and page (optional)
     */
    getByKeyword(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                api_key: this._apiKey,
                language: options === null || options === void 0 ? void 0 : options.language,
                page: options === null || options === void 0 ? void 0 : options.page
            };
            const request = {
                method: 'GET',
                address: `${this._baseUrl}/keyword/${id}/${this._getSearchType(options === null || options === void 0 ? void 0 : options.library_type)}`,
                query: params,
                fetch: this._fetch
            };
            const data = yield (0, request_1.makeRequest)(request);
            return this._getDateObject(data);
        });
    }
    /**
     * Get the Recommendations for a media item.
     * @param id - The media id
     * @param options - The options to use for the request includes the language and page (optional)
     */
    getRecommendations(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                api_key: this._apiKey,
                language: options === null || options === void 0 ? void 0 : options.language,
                page: options === null || options === void 0 ? void 0 : options.page
            };
            const request = {
                method: 'GET',
                address: `${this._baseUrl}/${this._getSearchType(options === null || options === void 0 ? void 0 : options.library_type)}/${id}/recommendations`,
                query: params,
                fetch: this._fetch
            };
            const data = yield (0, request_1.makeRequest)(request);
            return this._getDateObject(data);
        });
    }
    /**
     * Get the Similar media items.
     * @param id - The media id
     * @param options - The options to use for the request includes the language and page (optional)
     */
    getSimilar(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                api_key: this._apiKey,
                language: options === null || options === void 0 ? void 0 : options.language,
                page: options === null || options === void 0 ? void 0 : options.page
            };
            const request = {
                method: 'GET',
                address: `${this._baseUrl}/${this._getSearchType(options === null || options === void 0 ? void 0 : options.library_type)}/${id}/similar`,
                query: params,
                fetch: this._fetch
            };
            const data = yield (0, request_1.makeRequest)(request);
            return this._getDateObject(data);
        });
    }
    /**
     * Discover Media.
     * @param options - The options to use for the request includes the library_type, language, page, region, sort_by, certification_country, certification, certification_lte, certification_gte, include_adult, include_video, primary_release_year, primary_release_date_gte, primary_release_date_lte, release_date_gte, release_date_lte, with_release_type, year, vote_count_gte, vote_count_lte, vote_average_gte, vote_average_lte, with_cast, with_crew, with_people, with_companies, with_genres, without_genres
     */
    discoverMedia(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.params), { api_key: this._apiKey, language: options === null || options === void 0 ? void 0 : options.language, page: options === null || options === void 0 ? void 0 : options.page });
            const request = {
                method: 'GET',
                address: `${this._baseUrl}/discover/${this._getSearchType(options === null || options === void 0 ? void 0 : options.library_type)}`,
                query: params,
                fetch: this._fetch
            };
            const data = yield (0, request_1.makeRequest)(request);
            return this._getDateObject(data);
        });
    }
    _getAppendToResponse(options) {
        let appendToResponse = [];
        if (options === null || options === void 0 ? void 0 : options.changes)
            appendToResponse.push('changes');
        if (options === null || options === void 0 ? void 0 : options.images)
            appendToResponse.push('images');
        if (options && 'release_dates' in options)
            appendToResponse.push('release_dates');
        if (options && 'keywords' in options)
            appendToResponse.push('keywords');
        if (options && 'videos' in options)
            appendToResponse.push('videos');
        if (options && 'credits' in options)
            appendToResponse.push('credits');
        if (options && 'recommendations' in options)
            appendToResponse.push('recommendations');
        if (options && 'similar' in options)
            appendToResponse.push('similar');
        if (options === null || options === void 0 ? void 0 : options.external_ids)
            appendToResponse.push('external_ids');
        if (options && 'reviews' in options)
            appendToResponse.push('reviews');
        if (options && 'translations' in options)
            appendToResponse.push('translations');
        if (options && 'lists' in options)
            appendToResponse.push('lists');
        if (options && 'appendSeasons' in options)
            appendToResponse.push(...this._getSeasonsAppendToShowResponse(options.appendSeasons));
        if (options && 'watch_providers' in options)
            appendToResponse.push('watch/providers');
        if (options && 'movie_credits' in options)
            appendToResponse.push('movie_credits');
        if (options && 'tv_credits' in options)
            appendToResponse.push('tv_credits');
        if (options && 'combined_credits' in options)
            appendToResponse.push('combined_credits');
        if (options && 'tagged_images' in options)
            appendToResponse.push('tagged_images');
        if (options && 'content_ratings' in options)
            appendToResponse.push('content_ratings');
        if (appendToResponse.length === 0)
            return undefined;
        return appendToResponse;
    }
    _getSeasonsAppendToShowResponse(options) {
        if (!options || options === 'all')
            return [];
        return Array.isArray(options) ? options.map(o => `season/${o}`) : [`season/${options}`];
    }
    _getProvider(data, options) {
        data = this._getDateObject(data);
        if (!options || !('watch_providers' in options)) {
            return data;
        }
        const newResponse = Object.assign({}, data);
        const watchProviders = newResponse['watch/providers'];
        delete newResponse['watch/providers'];
        if (watchProviders) {
            newResponse.watch_providers = watchProviders;
        }
        return Object.assign({}, newResponse);
    }
    _getDateObject(data) {
        return (0, helpers_1.createDates)(data);
    }
    _getSearchType(type) {
        switch (type) {
            case 'MOVIE':
                return 'movie';
            case 'SHOW':
                return 'tv';
            case 'PERSON':
                return 'person';
            case 'COMPANY':
                return 'company';
            case 'KEYWORD':
                return 'keyword';
            case 'COLLECTION':
                return 'collection';
            default:
                return 'multi';
        }
    }
}
exports.TmDBApi = TmDBApi;
