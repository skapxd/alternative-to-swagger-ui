import { useGlobalStore } from "#/src/global-state"
import { useEffect, useState } from "react"
import { Monaco } from "../../monaco"
import { getDefaultRequestBody } from "./fn/get-default-request-body"
import { useEndpointStore } from "./state"

interface Props {
  id: string
}

export const RequestBody = (props: Props) => {
  const { id } = props ?? {}

  const { state, setRequestInit } = useEndpointStore(id)
  const { state: globalState } = useGlobalStore()
  const [defaultValue, setDefaultValue] = useState({})

  useEffect(() => {
    const contentType = state.requestInit?.headers?.['Content-Type'] as string;
    if (!contentType) return

    const content = state.requestBody?.content?.[contentType];
    if (!content) return

    if (!content?.schema || globalState.json == null) return
    const schemaRef = content.schema.$ref;
    const _ = getDefaultRequestBody({ $ref: schemaRef, swaggerAsJson: globalState.json })

    setDefaultValue(_)
  }, [JSON.stringify(state)])


  if (!state.requestBody) {
    return (<></>)
  }

  const requestContentTypeOptions = Object.entries(state.requestBody.content)
    .map(([key, value]) => {
      return (
        <option key={key} value={key}>{key}</option>
      )
    })

  return (
    <>
      <div className="opblock-section opblock-section-request-body">
        <form onChange={(e) => {
          // Get Form
          const data = new FormData(e.currentTarget)
          const entries = Array.from(data.entries())
          const object = Object.fromEntries(entries)

          setRequestInit((s) => ({
            ...s,
            headers: {
              ...s.headers,
              'Content-Type': object['content-type'] as string
            }
          }))
        }}>

          <div className="opblock-section-header">
            <h4 className="opblock-title parameter__name required">Request body</h4>
            <label>
              <div className="content-type-wrapper body-param-content-type">
                <select aria-label="Request content type" className="content-type" name="content-type" title="content-type">
                  {requestContentTypeOptions}
                </select>
              </div>
            </label>
          </div>

          <div className="opblock-description-wrapper">
            <div>
              <div className="model-example">
                <ul className="tab" role="tablist">
                  <li className="tabitem active" role="presentation">
                    <button aria-controls="C/cHzSA=" aria-selected="true" className="tablinks" data-name="example" id="kD0FCaY=" role="tab">Example Value</button>
                  </li>
                  <li className="tabitem" role="presentation">
                    <button aria-controls="QsiV9pE=" aria-selected="false" className="tablinks" data-name="model" id="k3zrUBw=" role="tab">Schema</button>
                  </li>
                </ul>
                <div aria-hidden="false" aria-labelledby="kD0FCaY=" data-name="examplePanel" id="C/cHzSA=" role="tabpanel" tabIndex={0}>
                  <div className="highlight-code">
                    <pre className="body-param__example microlight" style={{
                      display: "block",
                      overflowX: "auto",
                      padding: "0.5em",
                      background: "rgb(51, 51, 51)",
                      color: "white"
                    }}>
                      <Monaco
                        options={{ readOnly: !state.tryOut }}
                        onChange={(e) => {
                          setDefaultValue(JSON.parse(e))

                          setRequestInit((s) => ({
                            ...s,
                            body: e
                          }))
                        }}
                        value={JSON.stringify(defaultValue, null, 2)}
                      />
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </form>

      </div>
    </>

  )
}