import { useGlobalStore } from "#/src/global-state"
import { Parameters } from "./parameters"
import { RequestBody } from "./request-body"
import { useEndpointStore } from "./state"
import mime from 'mime-types'

interface Props {
  id: string
}

export const Request = (props: Props) => {

  const { setTryOut, state, setServerResponse } = useEndpointStore(props.id)

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

              const url = new URL(state.path, globalState.url.origin)

              const resp = await fetch(url, state.requestInit)

              const contentType = mime.contentType(resp.headers.get('content-type') ?? '')
              console.log('requestContentTypeOptions: ', contentType)
              console.log('Request: ', props.id)
              if (typeof contentType === 'boolean') {
                return
              }

              if (contentType.includes('application/pdf')) {
                const blob = await resp.blob()
                const body = window.URL.createObjectURL(blob)
                setServerResponse({ body, contentType })
                return
              }

              if (contentType.includes('application/json')) {
                const body = await resp.json()
                setServerResponse({ body, contentType })
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