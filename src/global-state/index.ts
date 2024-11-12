import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ContentTypes =
  | "application/json"
  | "application/xml"
  | "application/x-www-form-urlencoded"
  | "multipart/form-data"
  | "text/plain"
  | "text/html"
  | "application/octet-stream"
  | "application/pdf"
  | "image/png"
  | "image/jpeg"
  | "image/gif"
  | "text/stream";

type Range = `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
type StatusCodes = `${0 | 1 | 2 | 3 | 4 | 5}${Range}${Range}`;

export interface SwaggerEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  operationId: string;
  schema: Record<string, unknown>;
  requestBody: {
    required: boolean;
    content: Record<ContentTypes, { schema: { $ref: string } }>;
  };
  responses: Record<
    StatusCodes,
    {
      description: string;
      content: Record<ContentTypes, { schema: { $ref: string } }>;
    }
  >;
  parameters: Array<{
    name: string;
    required: boolean;
    in: "query" | "path" | "header" | "cookie";
    value: unknown;
    schema: {
      default?: unknown;
      type: unknown;
    };
  }>;
}

export interface Stores {
  state: Partial<{
    url: URL;
    json: Record<string, unknown>;
    endpoints: SwaggerEndpoint[];
  }>;
  getSwagger: (path: string) => Promise<void>;
}

const initState: Stores["state"] = {};

export const useGlobalStore = create<Stores>()(
  persist(
    (set, get) => ({
      state: initState,
      getSwagger: async (path: string) => {
        try {
          const url = (() => {
            const isValidURL = URL.canParse(path);
            if (isValidURL) return new URL(path);

            return new URL(path, window.location.origin);
          })();

          const swaggerAsJson: Swagger = await fetch(url).then((res) =>
            res.json()
          );

          if (swaggerAsJson.openapi !== "3.0.0") {
            throw new Error("This app only supports OpenAPI 3.0.0");
          }

          const abc = Object.entries(swaggerAsJson?.paths).map(
            ([path, methods]) => {
              return Object.entries(methods).map(
                ([
                  method,
                  { operationId, requestBody, responses, parameters },
                ]) => {
                  return {
                    path,
                    method,
                    operationId,
                    responses,
                    requestBody,
                    parameters: parameters.map((_) => ({
                      ..._,
                      value: _.schema.default,
                    })),
                  };
                }
              );
            }
          );

          const _ = abc.flat().map((_) => ({
            ..._,
            method: _.method.toUpperCase(),
          }));

          set({
            state: {
              url,
              json: swaggerAsJson,
              endpoints: _,
            },
          });
        } catch (error) {
          console.error(error);
        }
      },
    }),
    {
      name: "swagger-store",
      storage: createJSONStorage(() => window.sessionStorage),
    }
  )
);
