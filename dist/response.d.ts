interface Failed {
    error: string;
    code: number;
}
interface Success<DataType> {
    data: DataType;
    code?: number;
}
export type TMDBResponse<DataType> = Failed | Success<DataType>;
export declare function hasError<DataType>(response: TMDBResponse<DataType>): response is Failed;
export declare function hasData<DataType>(response: TMDBResponse<DataType>): response is Success<DataType>;
export declare function unwrapOrNull<DataType>(response: TMDBResponse<DataType>): DataType | null;
export {};
