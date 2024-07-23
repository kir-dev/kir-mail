/* tslint:disable */
/* eslint-disable */
/**
 * Kir-Mail
 * Kir-Dev Mailing Service
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError, operationServerMap } from './base';

/**
 * 
 * @export
 * @interface AnalyticsData
 */
export interface AnalyticsData {
    /**
     * 
     * @type {string}
     * @memberof AnalyticsData
     */
    'id': string;
    /**
     * 
     * @type {SingleSendRequestDto}
     * @memberof AnalyticsData
     */
    'data': SingleSendRequestDto;
    /**
     * 
     * @type {string}
     * @memberof AnalyticsData
     */
    'status': string;
    /**
     * 
     * @type {number}
     * @memberof AnalyticsData
     */
    'timestamp': number;
}
/**
 * 
 * @export
 * @interface AnalyticsDto
 */
export interface AnalyticsDto {
    /**
     * 
     * @type {Array<AnalyticsData>}
     * @memberof AnalyticsDto
     */
    'items': Array<AnalyticsData>;
    /**
     * 
     * @type {Array<number>}
     * @memberof AnalyticsDto
     */
    'completedTimestamps': Array<number>;
    /**
     * 
     * @type {Array<number>}
     * @memberof AnalyticsDto
     */
    'failedTimestamps': Array<number>;
}
/**
 * 
 * @export
 * @interface CreateTokenDto
 */
export interface CreateTokenDto {
    /**
     * 
     * @type {string}
     * @memberof CreateTokenDto
     */
    'name': string;
    /**
     * 
     * @type {number}
     * @memberof CreateTokenDto
     */
    'quota': number;
}
/**
 * 
 * @export
 * @interface ResponseDto
 */
export interface ResponseDto {
    /**
     * 
     * @type {number}
     * @memberof ResponseDto
     */
    'status': number;
    /**
     * 
     * @type {string}
     * @memberof ResponseDto
     */
    'message': string;
}
/**
 * 
 * @export
 * @interface SingleSendRequestDto
 */
export interface SingleSendRequestDto {
    /**
     * 
     * @type {string}
     * @memberof SingleSendRequestDto
     */
    'from': string;
    /**
     * 
     * @type {string}
     * @memberof SingleSendRequestDto
     */
    'to': string;
    /**
     * 
     * @type {string}
     * @memberof SingleSendRequestDto
     */
    'subject': string;
    /**
     * 
     * @type {string}
     * @memberof SingleSendRequestDto
     */
    'html': string;
}
/**
 * 
 * @export
 * @interface TokenDto
 */
export interface TokenDto {
    /**
     * 
     * @type {string}
     * @memberof TokenDto
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof TokenDto
     */
    'createdAt': string;
    /**
     * 
     * @type {string}
     * @memberof TokenDto
     */
    'updatedAt': string;
    /**
     * 
     * @type {string}
     * @memberof TokenDto
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof TokenDto
     */
    'value': string;
    /**
     * 
     * @type {number}
     * @memberof TokenDto
     */
    'quota': number;
    /**
     * 
     * @type {number}
     * @memberof TokenDto
     */
    'used': number;
}
/**
 * 
 * @export
 * @interface UpdateTokenQuotaDto
 */
export interface UpdateTokenQuotaDto {
    /**
     * 
     * @type {number}
     * @memberof UpdateTokenQuotaDto
     */
    'quota': number;
}
/**
 * 
 * @export
 * @interface UserDto
 */
export interface UserDto {
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    'displayName': string;
}

/**
 * AuthApi - axios parameter creator
 * @export
 */
export const AuthApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerLogin: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/auth/login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerMe: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/auth/me`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {any} code 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerOauthRedirect: async (code: any, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'code' is not null or undefined
            assertParamExists('authControllerOauthRedirect', 'code', code)
            const localVarPath = `/api/auth/callback`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (code !== undefined) {
                for (const [key, value] of Object.entries(code)) {
                    localVarQueryParameter[key] = value;
                }
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AuthApi - functional programming interface
 * @export
 */
export const AuthApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AuthApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authControllerLogin(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.authControllerLogin(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AuthApi.authControllerLogin']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authControllerMe(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.authControllerMe(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AuthApi.authControllerMe']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {any} code 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authControllerOauthRedirect(code: any, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.authControllerOauthRedirect(code, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AuthApi.authControllerOauthRedirect']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * AuthApi - factory interface
 * @export
 */
export const AuthApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AuthApiFp(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerLogin(options?: any): AxiosPromise<void> {
            return localVarFp.authControllerLogin(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerMe(options?: any): AxiosPromise<UserDto> {
            return localVarFp.authControllerMe(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {any} code 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerOauthRedirect(code: any, options?: any): AxiosPromise<void> {
            return localVarFp.authControllerOauthRedirect(code, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AuthApi - object-oriented interface
 * @export
 * @class AuthApi
 * @extends {BaseAPI}
 */
export class AuthApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public authControllerLogin(options?: RawAxiosRequestConfig) {
        return AuthApiFp(this.configuration).authControllerLogin(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public authControllerMe(options?: RawAxiosRequestConfig) {
        return AuthApiFp(this.configuration).authControllerMe(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {any} code 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public authControllerOauthRedirect(code: any, options?: RawAxiosRequestConfig) {
        return AuthApiFp(this.configuration).authControllerOauthRedirect(code, options).then((request) => request(this.axios, this.basePath));
    }
}



/**
 * GatewayApi - axios parameter creator
 * @export
 */
export const GatewayApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gatewayControllerGetData: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/data`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gatewayControllerGetHealth: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/health`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {SingleSendRequestDto} singleSendRequestDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gatewayControllerSendMessage: async (singleSendRequestDto: SingleSendRequestDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'singleSendRequestDto' is not null or undefined
            assertParamExists('gatewayControllerSendMessage', 'singleSendRequestDto', singleSendRequestDto)
            const localVarPath = `/api/send`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(singleSendRequestDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * GatewayApi - functional programming interface
 * @export
 */
export const GatewayApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = GatewayApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gatewayControllerGetData(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AnalyticsDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.gatewayControllerGetData(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['GatewayApi.gatewayControllerGetData']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gatewayControllerGetHealth(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.gatewayControllerGetHealth(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['GatewayApi.gatewayControllerGetHealth']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {SingleSendRequestDto} singleSendRequestDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gatewayControllerSendMessage(singleSendRequestDto: SingleSendRequestDto, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ResponseDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.gatewayControllerSendMessage(singleSendRequestDto, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['GatewayApi.gatewayControllerSendMessage']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * GatewayApi - factory interface
 * @export
 */
export const GatewayApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = GatewayApiFp(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gatewayControllerGetData(options?: any): AxiosPromise<AnalyticsDto> {
            return localVarFp.gatewayControllerGetData(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gatewayControllerGetHealth(options?: any): AxiosPromise<void> {
            return localVarFp.gatewayControllerGetHealth(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {SingleSendRequestDto} singleSendRequestDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gatewayControllerSendMessage(singleSendRequestDto: SingleSendRequestDto, options?: any): AxiosPromise<ResponseDto> {
            return localVarFp.gatewayControllerSendMessage(singleSendRequestDto, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * GatewayApi - object-oriented interface
 * @export
 * @class GatewayApi
 * @extends {BaseAPI}
 */
export class GatewayApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GatewayApi
     */
    public gatewayControllerGetData(options?: RawAxiosRequestConfig) {
        return GatewayApiFp(this.configuration).gatewayControllerGetData(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GatewayApi
     */
    public gatewayControllerGetHealth(options?: RawAxiosRequestConfig) {
        return GatewayApiFp(this.configuration).gatewayControllerGetHealth(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {SingleSendRequestDto} singleSendRequestDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GatewayApi
     */
    public gatewayControllerSendMessage(singleSendRequestDto: SingleSendRequestDto, options?: RawAxiosRequestConfig) {
        return GatewayApiFp(this.configuration).gatewayControllerSendMessage(singleSendRequestDto, options).then((request) => request(this.axios, this.basePath));
    }
}



/**
 * TokenApi - axios parameter creator
 * @export
 */
export const TokenApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {CreateTokenDto} createTokenDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tokenControllerCreateToken: async (createTokenDto: CreateTokenDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createTokenDto' is not null or undefined
            assertParamExists('tokenControllerCreateToken', 'createTokenDto', createTokenDto)
            const localVarPath = `/api/token`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createTokenDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tokenControllerDeleteToken: async (id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('tokenControllerDeleteToken', 'id', id)
            const localVarPath = `/api/token/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tokenControllerGetTokens: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/token`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {UpdateTokenQuotaDto} updateTokenQuotaDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tokenControllerUpdateTokenQuota: async (id: string, updateTokenQuotaDto: UpdateTokenQuotaDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('tokenControllerUpdateTokenQuota', 'id', id)
            // verify required parameter 'updateTokenQuotaDto' is not null or undefined
            assertParamExists('tokenControllerUpdateTokenQuota', 'updateTokenQuotaDto', updateTokenQuotaDto)
            const localVarPath = `/api/token/{id}/quota`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateTokenQuotaDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TokenApi - functional programming interface
 * @export
 */
export const TokenApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = TokenApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {CreateTokenDto} createTokenDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async tokenControllerCreateToken(createTokenDto: CreateTokenDto, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TokenDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.tokenControllerCreateToken(createTokenDto, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['TokenApi.tokenControllerCreateToken']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async tokenControllerDeleteToken(id: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.tokenControllerDeleteToken(id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['TokenApi.tokenControllerDeleteToken']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async tokenControllerGetTokens(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<TokenDto>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.tokenControllerGetTokens(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['TokenApi.tokenControllerGetTokens']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} id 
         * @param {UpdateTokenQuotaDto} updateTokenQuotaDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async tokenControllerUpdateTokenQuota(id: string, updateTokenQuotaDto: UpdateTokenQuotaDto, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TokenDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.tokenControllerUpdateTokenQuota(id, updateTokenQuotaDto, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['TokenApi.tokenControllerUpdateTokenQuota']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * TokenApi - factory interface
 * @export
 */
export const TokenApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = TokenApiFp(configuration)
    return {
        /**
         * 
         * @param {CreateTokenDto} createTokenDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tokenControllerCreateToken(createTokenDto: CreateTokenDto, options?: any): AxiosPromise<TokenDto> {
            return localVarFp.tokenControllerCreateToken(createTokenDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tokenControllerDeleteToken(id: string, options?: any): AxiosPromise<void> {
            return localVarFp.tokenControllerDeleteToken(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tokenControllerGetTokens(options?: any): AxiosPromise<Array<TokenDto>> {
            return localVarFp.tokenControllerGetTokens(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} id 
         * @param {UpdateTokenQuotaDto} updateTokenQuotaDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tokenControllerUpdateTokenQuota(id: string, updateTokenQuotaDto: UpdateTokenQuotaDto, options?: any): AxiosPromise<TokenDto> {
            return localVarFp.tokenControllerUpdateTokenQuota(id, updateTokenQuotaDto, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * TokenApi - object-oriented interface
 * @export
 * @class TokenApi
 * @extends {BaseAPI}
 */
export class TokenApi extends BaseAPI {
    /**
     * 
     * @param {CreateTokenDto} createTokenDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TokenApi
     */
    public tokenControllerCreateToken(createTokenDto: CreateTokenDto, options?: RawAxiosRequestConfig) {
        return TokenApiFp(this.configuration).tokenControllerCreateToken(createTokenDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TokenApi
     */
    public tokenControllerDeleteToken(id: string, options?: RawAxiosRequestConfig) {
        return TokenApiFp(this.configuration).tokenControllerDeleteToken(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TokenApi
     */
    public tokenControllerGetTokens(options?: RawAxiosRequestConfig) {
        return TokenApiFp(this.configuration).tokenControllerGetTokens(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} id 
     * @param {UpdateTokenQuotaDto} updateTokenQuotaDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TokenApi
     */
    public tokenControllerUpdateTokenQuota(id: string, updateTokenQuotaDto: UpdateTokenQuotaDto, options?: RawAxiosRequestConfig) {
        return TokenApiFp(this.configuration).tokenControllerUpdateTokenQuota(id, updateTokenQuotaDto, options).then((request) => request(this.axios, this.basePath));
    }
}



