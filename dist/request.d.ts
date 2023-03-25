import { TMDBResponse } from "./response";
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
type PrimitiveType = string | number | boolean | null | undefined;
type Headers = Record<string, string>;
type Body = Record<string, any> | string | null;
type Query = Record<string, PrimitiveType | PrimitiveType[]>;
export type FetchType = typeof fetch;
export interface Request {
    method: Method;
    headers?: Headers;
    body?: Body;
    query?: Query;
    address: string;
    abortSignal?: AbortSignal;
    fetch?: FetchType;
}
export declare function makeRequest<DataType>(request: Request): Promise<TMDBResponse<DataType>>;
export {};
