import { SwaggerEndpoint } from "#/src/global-state";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type SetState<T> = (
  props: Partial<T> | ((s: Partial<T>) => Partial<T>)
) => void;

export interface Stores {
  state: Record<
    string,
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
    response: (
      props: this["state"][string]["serverResponse"]
    ) =>
      | this["state"][string]["serverResponse"]
      | this["state"][string]["serverResponse"]
  ) => void;
}

const initState: Stores["state"] = {};

const Store = create<Stores>()(
  persist(
    (set, get) => ({
      state: initState,
      setState: (props) => {
        set((s) => ({
          ...s,
          state: { ...s.state, ...props },
        }));
      },
      setShowBody: (id, showBody) => {
        set((s) => ({
          state: {
            ...s.state,
            [id]: {
              ...s.state[id],
              showBody,
            },
          },
        }));
      },
      setTryOut: (id, tryOut) => {
        set((s) => ({
          state: {
            ...s.state,
            [id]: {
              ...s.state[id],
              tryOut,
            },
          },
        }));
      },
      setParameters: (id, parameters) => {
        set((s) => ({
          state: {
            ...s.state,
            [id]: {
              ...s.state[id],
              parameters,
            },
          },
        }));
      },
      setServerResponse: (id, response) => {
        if (typeof response === "function") {
          const current = get().state[id];
          set((s) => ({
            state: {
              ...s.state,
              [id]: {
                ...s.state[id],
                serverResponse: response(current.serverResponse),
              },
            },
          }));
          return;
        }

        if (typeof response === "object") {
          set((s) => ({
            state: {
              ...s.state,
              [id]: {
                ...s.state[id],
                serverResponse: response,
              },
            },
          }));
          return;
        }
      },
      setRequestInit: (id, requestInit) => {
        set((s) => ({
          state: {
            ...s.state,
            [id]: {
              ...s.state[id],
              requestInit: {
                ...s.state[id].requestInit,
                ...requestInit,
              },
            },
          },
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

  const setParameters = (props: SwaggerEndpoint["parameters"]) =>
    store.setParameters(id, props);

  const setRequestInit = (props: RequestInit) =>
    store.setRequestInit(id, props);

  const setTryOut = (props: boolean) => store.setTryOut(id, props);

  const setServerResponse = (
    props: Parameters<Stores["setServerResponse"]>[1]
  ) => store.setServerResponse(id, props);

  return {
    state: store.state[id] ?? {},
    setState,
    setParameters,
    setRequestInit,
    setTryOut,
    setServerResponse,
  };
};
