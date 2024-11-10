import { SwaggerEndpoint } from "#/src/global-state";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type SetState<T> = (
  props: Partial<T> | ((s: Partial<T>) => Partial<T>)
) => void;

export interface Stores {
  state: Partial<{
    method: SwaggerEndpoint["method"];
    path: string;
    id: string;
    href: string;
    parameters: SwaggerEndpoint["parameters"];
    showBody: boolean;
    tryOut: boolean;
    requestBody: SwaggerEndpoint["requestBody"];
    responses: SwaggerEndpoint["responses"];
    requestInit: RequestInit;
    serverResponse: {
      body: unknown;
      contentType: string;
    };
  }>;
  setState: (props: this["state"]) => void;
  setShowBody: (bool: boolean) => void;
  setTryOut: (bool: boolean) => void;
  setParameters: (params: SwaggerEndpoint["parameters"]) => void;
  setRequestInit: SetState<RequestInit>;
  setServerResponse: (response: this["state"]["serverResponse"]) => void;
}

const initState: Stores["state"] = {};

export const useEndpointStore = (key: string) =>
  create<Stores>()(
    persist(
      (set) => ({
        state: initState,
        setState: (props) => {
          set((s) => ({
            ...s,
            state: { ...s.state, ...props },
          }));
        },
        setShowBody: (showBody) => {
          set((s) => ({ state: { ...s.state, showBody } }));
        },
        setTryOut: (tryOut) => {
          set((s) => ({ state: { ...s.state, tryOut } }));
        },
        setParameters: (parameters) => {
          set((s) => ({ state: { ...s.state, parameters } }));
        },
        setServerResponse: (response) => {
          console.log(response)
          set((s) => ({
            state: {
              ...s.state,
              serverResponse: response,
            },
          }));
        },
        setRequestInit: (requestInit) => {
          if (typeof requestInit === "object") {
            return set((s) => ({
              state: {
                ...s.state,
                requestInit: {
                  ...s.state.requestInit,
                  ...requestInit,
                },
              },
            }));
          }

          if (typeof requestInit === "function") {
            return set((s) => ({
              state: {
                ...s.state,
                requestInit: {
                  ...requestInit(s.state),
                },
              },
            }));
          }
        },
      }),
      {
        name: `endpoint-store-${key}`,
        storage: createJSONStorage(() => window.sessionStorage),
      }
    )
  )();
