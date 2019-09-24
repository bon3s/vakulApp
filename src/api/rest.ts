import { Service, WeatherReply } from '../service/service';
import { HTTPClient } from '../http/client';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export class URL {
    private url: string;
    private apiKey: string;
    constructor(scheme: string, backend: string, apikey: string) {
        this.url = scheme + '://' + backend;
        this.apiKey = apikey;
    }
    public path(): string {
        return this.url;
    }
    public apiAccess(): string {
        return this.apiKey;
    }
}

export enum ErrorType {
    Unknown,
    BadInput,
    NotFound,
    PermissionDenied,
    Unauthenticated,
    Internal,
    Unavailable,
    Timeout,
    Offline,
}

export class ServiceError extends Error {
    public type: ErrorType;
    public endpoint: string;

    constructor(ep: string, type: ErrorType, message?: string) {
        super(`${ep} request failed: ${message || 'no message'}`);
        this.endpoint = ep;
        this.type = type;
    }
    public toString(): string {
        return 'ServiceError(endpoint=${this.endpoint}, type=${this.type}, message=${this.message})';
    }

    public toJSON(): string {
        return this.toString();
    }
}

class REST implements Service {
    public backend: string;
    public url: URL;
    private client: HTTPClient;

    constructor(httpClient: HTTPClient, url: URL) {
        this.client = httpClient;
        this.url = url;
    }

    public async getWeather(city: string): Promise<WeatherReply> {
        const res = await this.request(this.getWeather, {
            method: 'POST',
            url: this.url.path() + city + '&APPID=' + this.url.apiAccess(),
            data: {},
        });
        return WeatherReply.fromJSON(res.data.result.weather);
    }

    private request(
        endpoint: Function,
        req: AxiosRequestConfig
    ): Promise<AxiosResponse> {
        return new Promise((resolve, reject) => {
            this.client
                .request(req)
                .then(resp => resolve(resp))
                .catch((err: AxiosError) => {
                    reject(newServiceError(endpoint.name, err));
                });
        });
    }
}

const newServiceError = (ep: string, err: AxiosError): ServiceError => {
    if (err.response) {
        const { data, status } = err.response;

        if (status === 401) {
            return new ServiceError(ep, ErrorType.Unauthenticated);
        }

        if (status === 403) {
            return new ServiceError(ep, ErrorType.PermissionDenied);
        }

        if (status === 404) {
            return new ServiceError(ep, ErrorType.NotFound);
        }

        if (status === 408 || err.code === 'ECONNABORTED') {
            return new ServiceError(ep, ErrorType.Timeout);
        }

        if (status >= 500) {
            return new ServiceError(ep, ErrorType.Internal, data.message);
        }

        return new ServiceError(ep, ErrorType.BadInput, data.message);
    } else if (err.request) {
        if (err.code === 'ECONNABORTED') {
            return new ServiceError(ep, ErrorType.Timeout);
        }

        return new ServiceError(ep, ErrorType.Unavailable);
    }

    return new ServiceError(ep, ErrorType.Unknown, err.message);
};

export default REST;
