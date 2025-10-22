import createErrorResponse, { type TErrorResponse } from "./response/error";
import createSuccessResponse, {
  type TSuccessResponse,
} from "./response/success";

// Function to check the environment is browser or server
export const getIsBrowser = () => typeof window !== "undefined";

export const localStorageUtil = {
  handlePromise: <T>({
    response,
    resolve,
    reject,
  }: {
    response: TSuccessResponse<T> | TErrorResponse;
    resolve: (value: TSuccessResponse<T>) => void;
    reject: (value: TErrorResponse) => void;
  }) => {
    if (response?.success) {
      return resolve(response as TSuccessResponse<T>);
    } else {
      return reject(response as TErrorResponse);
    }
  },

  getItem<T>(key: string) {
    if (!getIsBrowser()) {
      return createErrorResponse({
        key,
        error: "Browser environment not detected.",
        type: "get",
      });
    }

    try {
      const item = window.localStorage.getItem(key);
      let data: T | null = null;

      try {
        data = item ? JSON.parse(item) : null;
      } catch (error) {
        return createErrorResponse({
          key,
          error: "Invalid JSON data",
          type: "get",
        });
      }

      return createSuccessResponse({
        key,
        data,
        type: "get",
      });
    } catch (error) {
      return createErrorResponse({ key, error, type: "get" });
    }
  },

  setItem<T>(key: string, value: T) {
    if (!getIsBrowser()) {
      return createErrorResponse({
        key,
        error: "Browser environment not detected.",
        type: "set",
      });
    }

    try {
      let serializedValue;
      try {
        serializedValue = JSON.stringify(value);
      } catch (error) {
        return createErrorResponse({
          key,
          error: "Serialization error",
          type: "set",
        });
      }
      window.localStorage.setItem(key, serializedValue);

      return createSuccessResponse({
        key,
        data: value,
        type: "set",
      });
    } catch (error) {
      return createErrorResponse({ key, error, type: "set" });
    }
  },

  removeItem(key: string) {
    if (!getIsBrowser()) {
      return createErrorResponse({
        key,
        error: "Browser environment not detected.",
        type: "remove",
      });
    }

    try {
      window.localStorage.removeItem(key);
      return createSuccessResponse({
        key,
        data: null,
        type: "remove",
      });
    } catch (error) {
      return createErrorResponse({ key, error, type: "remove" });
    }
  },

  clear() {
    if (!getIsBrowser()) {
      return createErrorResponse({
        key: "all",
        error: "Browser environment not detected.",
        type: "remove",
      });
    }

    try {
      window.localStorage.clear();
      return createSuccessResponse({
        key: "all",
        data: null,
        type: "remove",
      });
    } catch (error) {
      return createErrorResponse({ key: "all", error, type: "remove" });
    }
  },

  async getItemAsync<T>(key: string): Promise<TSuccessResponse<T>> {
    return new Promise((resolve, reject) => {
      const response = this.getItem<T>(key);

      return this.handlePromise<T>({ response, resolve, reject });
    });
  },

  async setItemAsync<T>(key: string, value: T): Promise<TSuccessResponse<T>> {
    return new Promise((resolve, reject) => {
      const response = this.setItem(key, value);

      return this.handlePromise<T>({ response, resolve, reject });
    });
  },

  async removeItemAsync(key: string): Promise<TSuccessResponse<null>> {
    return new Promise((resolve, reject) => {
      const response = this.removeItem(key);
      return this.handlePromise<null>({ response, resolve, reject });
    });
  },

  async clearAsync(): Promise<TSuccessResponse<null>> {
    return new Promise((resolve, reject) => {
      const response = this.clear();

      return this.handlePromise<null>({ response, resolve, reject });
    });
  },
};
