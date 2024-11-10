import { SwaggerEndpoint } from "#/src/global-state";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type SetState<T> = (
  props: Partial<T> | ((s: Partial<T>) => Partial<T>)
) => void;

export interface Stores {
  state: Array<
    Partial<{
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
    }>
  >;
  setState: (props: this["state"]) => void;
  setShowBody: (id: string, bool: boolean) => void;
  setTryOut: (id: string, bool: boolean) => void;
  setParameters: (id: string, params: SwaggerEndpoint["parameters"]) => void;
  setRequestInit: (id: string, params: RequestInit) => void;
  setServerResponse: (
    id: string,
    response: this["state"][number]["serverResponse"]
  ) => void;
}

const initState: Stores["state"] = [];

const Store = create<Stores>()(
  persist(
    (set) => ({
      state: initState,
      setState: (props) => {
        set((s) => ({
          ...s,
          state: [...s.state, ...props],
        }));
      },
      setShowBody: (id, showBody) => {
        set((s) => ({
          state: s.state.map((endpoint) => ({
            ...endpoint,
            showBody: endpoint.id === id ? showBody : endpoint.showBody,
          })),
        }));
      },
      setTryOut: (id, tryOut) => {
        set((s) => ({
          state: s.state.map((endpoint) => ({
            ...endpoint,
            tryOut: endpoint.id === id ? tryOut : endpoint.tryOut,
          })),
        }));
      },
      setParameters: (id, parameters) => {
        set((s) => ({
          state: s.state.map((endpoint) => ({
            ...endpoint,
            parameters: endpoint.id === id ? parameters : endpoint.parameters,
          })),
        }));
      },
      setServerResponse: (id, response) => {
        set((s) => ({
          state: s.state.map((endpoint) => ({
            ...endpoint,
            serverResponse:
              endpoint.id === id ? response : endpoint.serverResponse,
          })),
        }));
      },
      setRequestInit: (id, requestInit) => {
        set((s) => ({
          state: s.state.map((endpoint) => ({
            ...endpoint,
            requestInit:
              endpoint.id === id
                ? { ...endpoint.requestInit, ...requestInit }
                : endpoint.requestInit,
          })),
        }));
      },
    }),
    {
      name: `endpoint-store`,
      storage: createJSONStorage(() => window.sessionStorage),
    }
  )
);

export const useEndpointStore = (id: string) => {
  const store = Store();

  const setState = (props: Stores["state"]) => store.setState(props);

  return {
    state: store.state.find((endpoint) => endpoint.id === id)!,
    setState,
  };
};
