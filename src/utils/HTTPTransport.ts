export enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Delete = 'Delete',
}

type Options = {
  method: Method;
  data?: any;
};

export default class HTTPTransport {
  protected endpoint: string;

  constructor(api = '', endpoint: string) {
    this.endpoint = `${api}${endpoint}`;
  }

  private queryStringify(data: any): string {
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

  public delete<Response>(path: string): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Delete,
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

      xhr.onload = function () {
        resolve(xhr.response);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === Method.Get || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
