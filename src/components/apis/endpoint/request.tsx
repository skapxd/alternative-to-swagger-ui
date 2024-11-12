import { useGlobalStore } from "#/src/global-state"
import { getUrlWithParameters } from "./fn/get-url-with-parametes"
import { Parameters } from "./parameters"
import { RequestBody } from "./request-body"
import { useEndpointStore } from "./state"
import mime from 'mime-types'

interface Props {
  id: string
}

export const Request = (props: Props) => {

  const { setTryOut, state } = useEndpointStore(props.id)

  const { state: globalState } = useGlobalStore()
  const { tryOut } = state

  return (
    <div className="opblock-section">
      <div className="opblock-section-header">
        <div className="tab-header">
          <div className="tab-item active">
            <h4 className="opblock-title">
              <span>Parameters</span>
            </h4>
          </div>
        </div>
        <div className="try-out">
          {!tryOut && (
            <button
              className="btn try-out__btn"
              onClick={() => setTryOut(true)}
            >
              Try it out
            </button>
          )}

          {tryOut && (
            <button
              className="btn try-out__btn cancel"
              onClick={() => setTryOut(false)}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <Parameters {...props} />

      <RequestBody {...props} />

      {state.tryOut && (
        <div className="execute-wrapper">
          <button
            className="btn execute opblock-control__btn"
            onClick={async () => {
              if (!globalState.url || !state.requestInit || !state.path) return

              const path = (() => {
                const __ = getUrlWithParameters(state.path, state.parameters ?? [])
                return __
              })()

              const url = new URL(path, globalState.url.origin)

              const resp = await fetch(url, state.requestInit)

              const contentType = mime.contentType(resp.headers.get('content-type') ?? '')

              if (typeof contentType === 'boolean') {
                return
              }

              if (contentType.includes('pdf')) {
                const blob = await resp.blob()
                const body = window.URL.createObjectURL(blob)
                const event = new CustomEvent(`server_response_${props.id}`, {
                  detail:
                  {
                    body,
                    contentType
                  }
                })
                window.dispatchEvent(event)

                return
              }

              if (contentType.includes('json')) {
                const body = await resp.json()
                const event = new CustomEvent(`server_response_${props.id}`, {
                  detail:
                  {
                    body,
                    contentType
                  }
                })
                window.dispatchEvent(event)
                return
              }

              if (contentType.includes('stream')) {
                // Get the reader from the stream
                const reader = resp.body!.getReader();

                // Define a function to read each chunk
                const readChunk = async () => {

                  // Read a chunk from the reader
                  const { value, done } = await reader.read()

                  if (done) return;

                  // Convert the chunk value to a string
                  const chunkString = new TextDecoder().decode(value);

                  window.dispatchEvent(new CustomEvent(`server_response_${props.id}`, {
                    detail:
                    {
                      body: chunkString,
                      contentType
                    }
                  }))

                  // Read the next chunk
                  readChunk();

                };

                // Start reading the first chunk
                await readChunk();
                return
              }
            }}
          >
            Execute
          </button>
        </div>
      )}
    </div>
  )
}