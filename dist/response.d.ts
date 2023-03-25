interface Failed {
    error: string;
    code: number;
}
interface Success<DataType> {
    data: DataType;
    code?: number;
}
export type TMDBResponse<DataType> = Failed | Success<DataType>;
/**
 * Checks if the response is an error, returns true if it is
 * @param response - The response to check
 */
export declare function hasError<DataType>(response: TMDBResponse<DataType>): response is Failed;
/**
 * Checks if the response has data, returns true if it does
 * @param response - The response to check
 */
export declare function hasData<DataType>(response: TMDBResponse<DataType>): response is Success<DataType>;
/**
 * Unwraps the data from the response, returns null if there is no data
 * @param response - The response to unwrap
 */
export declare function unwrapOrNull<DataType>(response: TMDBResponse<DataType>): DataType | null;
export {};
