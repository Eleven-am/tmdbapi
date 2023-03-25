interface Failed {
    error: string;
    code: number;
}

interface Success<DataType> {
    data: DataType;
    code?: number;
}

export type TMDBResponse<DataType> = Failed | Success<DataType>;

export function hasError<DataType>(response: TMDBResponse<DataType>): response is Failed {
    return (response as Failed).error !== undefined;
}

export function hasData<DataType>(response: TMDBResponse<DataType>): response is Success<DataType> {
    return (response as Success<DataType>).data !== undefined;
}

export function unwrapOrNull<DataType>(response: TMDBResponse<DataType>): DataType | null {
    if (hasData(response)) {
        return response.data;
    }
    return null;
}
