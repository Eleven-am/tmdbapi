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
export function hasError<DataType>(response: TMDBResponse<DataType>): response is Failed {
    return (response as Failed).error !== undefined;
}

/**
 * Checks if the response has data, returns true if it does
 * @param response - The response to check
 */
export function hasData<DataType>(response: TMDBResponse<DataType>): response is Success<DataType> {
    return (response as Success<DataType>).data !== undefined;
}

/**
 * Unwraps the data from the response, returns null if there is no data
 * @param response - The response to unwrap
 */
export function unwrapOrNull<DataType>(response: TMDBResponse<DataType>): DataType | null {
    if (hasData(response)) {
        return response.data;
    }
    return null;
}
