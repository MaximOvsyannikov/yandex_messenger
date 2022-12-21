export enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Patch = 'Patch',
  Delete = 'Delete',
}

type Options = {
  method: Method;
  data?: any;
};

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  private queryStringify(data?: any): string {
    if (!data) return '';

    if (typeof data !== 'object') {
      throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    if (keys.length === 0) return '';

    return keys.reduce(
      (result, key, index) =>
        `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
      '?'
    );
  }

  public get<Response>(path = '/', data?: unknown): Promise<Response> {
    return this.request<Response>(
      this.endpoint + path + this.queryStringify(data)
    );
  }

  public post<Response = void>(
    path: string,
    data?: unknown
  ): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Post,
      data,
    });
  }

  public put<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Put,
      data,
    });
  }

  public patch<Response = void>(
    path: string,
    data: unknown
  ): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Patch,
      data,
    });
  }

  public delete<Response>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Delete,
      data,
    });
  }

  private request<Response>(
    url: string,
    options: Options = { method: Method.Get }
  ): Promise<Response> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === Method.Get || !data) {
        xhr.send();
      } else {
        xhr.send(data instanceof FormData ? data : JSON.stringify(data));
      }
    });
  }
}
