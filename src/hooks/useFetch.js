import axios from "axios";
import { useState, useRef, useCallback } from "react";

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 30000,
});

/**
 * Detailed error object structure
 * @typedef {Object} FetchError
 * @property {number|null} status - HTTP status code
 * @property {string} message - Error message
 * @property {string} code - Error code from server or axios
 * @property {any} details - Full error details
 */

/**
 * useFetch hook return type
 * @typedef {Object} UseFetchReturn
 * @property {any} data - The fetched data or initial data
 * @property {boolean} loading - Loading state during request
 * @property {FetchError|null} error - Error object if request failed, null otherwise
 * @property {(method: "GET"|"POST"|"PUT"|"DELETE"|"PATCH", payload?: any, config?: import("axios").AxiosRequestConfig) => Promise<any>} run - Generic method to execute any HTTP method
 * @property {(config?: import("axios").AxiosRequestConfig) => Promise<any>} get - Execute GET request
 * @property {(payload: any, config?: import("axios").AxiosRequestConfig) => Promise<any>} post - Execute POST request
 * @property {(payload: any, config?: import("axios").AxiosRequestConfig) => Promise<any>} put - Execute PUT request
 * @property {(payload: any, config?: import("axios").AxiosRequestConfig) => Promise<any>} patch - Execute PATCH request
 * @property {(config?: import("axios").AxiosRequestConfig) => Promise<any>} delete - Execute DELETE request
 * @property {() => Promise<any>} retry - Retries the last failed request
 */

/**
 * Custom hook for making HTTP requests with detailed error handling
 * @param {any} initialData - Initial data state
 * @param {string} url - URL to fetch from
 * @returns {UseFetchReturn} Hook return object with data, loading, error, HTTP method functions, and retry
 *
 * @example
 * const { data, loading, error, get, retry } = useFetch([], `/drivers/${driverId}`);
 * const handleFetch = async () => {
 *   try {
 *     await get();
 *   } catch (err) {
 *     // Later, user can retry
 *     await retry();
 *   }
 * };
 */
export function useFetch(initialData, url) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const lastRequestRef = useRef(null);

  /**
   * Creates a detailed error object from axios error
   * @param {Error} errorResponse - Axios error response
   * @returns {FetchError} Structured error object
   * @private
   */
  const createErrorObject = (errorResponse) => {
    const status = errorResponse?.response?.status || null;
    const message =
      errorResponse?.response?.data?.message ||
      errorResponse?.response?.statusText ||
      errorResponse?.message ||
      "An unknown error occurred";
    const code = errorResponse?.code || "UNKNOWN_ERROR";

    return {
      status,
      message,
      code,
      details: errorResponse,
    };
  };

  /**
   * Generic handler for all HTTP requests
   * @param {string} method - HTTP method
   * @param {any} [payload] - Request payload for POST/PUT/PATCH
   * @param {import("axios").AxiosRequestConfig} [config] - Additional axios config
   * @returns {Promise<any>} Response data
   * @private
   */
  const handleRequest = useCallback(async (method, payload, config = {}) => {
    // Store the last request for retry functionality
    lastRequestRef.current = { method, payload, config };

    setLoading(true);
    setError(null);

    try {
      const requestConfig = {
        method,
        url,
        ...config,
      };

      if (payload && ["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
        requestConfig.data = payload;
      }

      const response = await api(requestConfig);
      setData(response.data);
      setLoading(false);

      return response.data;
    } catch (err) {
      const errorObj = createErrorObject(err);
      setError(errorObj);
      setLoading(false);

      console.error(`[${method}] ${url}:`, errorObj);
      // Return a rejected promise but don't throw - let caller decide
      return Promise.reject(errorObj);
    }
  }, [url]);

  /**
   * GET request
   * @param {import("axios").AxiosRequestConfig} [config] - Additional axios config
   * @returns {Promise<any>}
   */
  const get = useCallback((config) => handleRequest("GET", null, config), [handleRequest]);

  /**
   * POST request
   * @param {any} payload - Request payload
   * @param {import("axios").AxiosRequestConfig} [config] - Additional axios config
   * @returns {Promise<any>}
   */
  const post = useCallback((payload, config) =>
    handleRequest("POST", payload, config), [handleRequest]);

  /**
   * PUT request
   * @param {any} payload - Request payload
   * @param {import("axios").AxiosRequestConfig} [config] - Additional axios config
   * @returns {Promise<any>}
   */
  const put = useCallback((payload, config) => handleRequest("PUT", payload, config), [handleRequest]);

  /**
   * PATCH request
   * @param {any} payload - Request payload
   * @param {import("axios").AxiosRequestConfig} [config] - Additional axios config
   * @returns {Promise<any>}
   */
  const patch = useCallback((payload, config) =>
    handleRequest("PATCH", payload, config), [handleRequest]);

  /**
   * DELETE request
   * @param {import("axios").AxiosRequestConfig} [config] - Additional axios config
   * @returns {Promise<any>}
   */
  const deleteRequest = useCallback((config) =>
    handleRequest("DELETE", null, config), [handleRequest]);

  /**
   * Generic run method to execute any HTTP method
   * @param {"GET"|"POST"|"PUT"|"DELETE"|"PATCH"} method - HTTP method
   * @param {any} [payload] - Request payload for POST/PUT/PATCH
   * @param {import("axios").AxiosRequestConfig} [config] - Additional axios config
   * @returns {Promise<any>}
   */
  const run = useCallback(async (method, payload, config) => {
    const methodMap = {
      GET: () => get(config),
      POST: () => post(payload, config),
      PUT: () => put(payload, config),
      PATCH: () => patch(payload, config),
      DELETE: () => deleteRequest(config),
    };

    const methodFunc = methodMap[method?.toUpperCase()];

    if (!methodFunc) {
      const errorObj = {
        status: null,
        message: `Unsupported HTTP method: ${method}`,
        code: "INVALID_METHOD",
        details: null,
      };
      setError(errorObj);
      return Promise.reject(errorObj);
    }

    return methodFunc();
  }, [get, post, put, patch, deleteRequest]);

  /**
   * Retries the last failed request
   * @returns {Promise<any>}
   */
  const retry = useCallback(async () => {
    if (!lastRequestRef.current) {
      const errorObj = {
        status: null,
        message: "No previous request to retry",
        code: "NO_PREVIOUS_REQUEST",
        details: null,
      };
      setError(errorObj);
      return Promise.reject(errorObj);
    }

    const { method, payload, config } = lastRequestRef.current;
    return run(method, payload, config);
  }, [run]);

  return {
    data,
    loading,
    error,
    run,
    get,
    post,
    put,
    patch,
    delete: deleteRequest,
    retry,
  };
}
