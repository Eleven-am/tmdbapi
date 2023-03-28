
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

function getQueryString(url: URL, query?: Query): URL {
    if (!query) return url;

    Object.entries(query).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            const values = value.filter(v => v !== undefined)
                .map(v => v === null ? 'null' : v!.toString());

            if (values.length === 0) return;
            url.searchParams.append(key, values.join(','));
        } else {
            if (value === undefined) return;
            if (value === null) {
                value = 'null';
            }

            url.searchParams.append(key, value.toString());
        }
    });

    return url;
}

export function makeRequest<DataType>(request: Request): Promise<DataType> {
    let body: string | undefined;
    const {method, headers, query, address} = request;
    const url = getQueryString(new URL(address), query);

    if (request.body && typeof request.body === 'object') {
        body = JSON.stringify(request.body);
    }

    return new Promise((resolve, reject) => {
        let address: string = '';
        let fetch = request.fetch ?? window.fetch;
        try {
            address = url.toString();
        } catch (e) {
            reject(e);
        }

        fetch(address, {
            method,
            headers,
            body,
            signal: request.abortSignal
        })
            .then(async response => {
                try {
                    const json = await response.json();
                    resolve(json as DataType);
                } catch (e) {
                    try {
                        const text = await response.text();
                        resolve(text as unknown as DataType);
                    } catch (e: any) {
                        reject(e);
                    }
                }
            })
            .catch((e) => {
                reject(e);
            });
    });
}
