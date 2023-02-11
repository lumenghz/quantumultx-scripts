/**
 * Thanks njzydark
 * https://github.com/njzydark/QuantumultX-Scripts/blob/main/src/types/quantumultX.d.ts
 */

type QuanXRequest = {
  scheme: string;
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "HEAD";
  url: string;
  path: string;
  headers: {
    [prop: string]: any;
  };
};

type QuanXResponse = {
  status: string;
  statusCode: number;
  headers: {
    [prop: string]: any;
  };
  body: string;
  bodyBytes: ArrayBuffer;
};

declare const $jsbox: any

declare const $request: QuanXRequest

declare const $response: QuanXResponse

declare function $done(response?: Partial<QuanXResponse>): void;

declare function $notify(title: string, subTitle?: string, content?: string): void

declare namespace $task {
  function fetch<T extends QuanXResponse>(request: Partial<QuanXRequest>): Promise<T>;
}

declare namespace $prefs {
  function valueForKey(key: string): ?string
  function setValueForKey(value: string, key: string): boolean
  function removeValueForKey(value: string): boolean
  function removeAllValues(): boolean
}
