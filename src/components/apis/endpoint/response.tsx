import { useGlobalStore } from "#/src/global-state"
import { useEffect, useState } from "react"
import { Monaco } from "../../monaco"
import { getDefaultRequestBody } from "./fn/get-default-request-body"
import { useEndpointStore } from "./state"

interface Props {
  id: string
}

export const Response = (props: Props) => {
  const { state } = useEndpointStore(props.id)

  if (!state.responses || Object.keys(state.responses).length === 0) {
    return (<></>)
  }

  return (
    <div className="responses-wrapper">
      <div className="opblock-section-header">
        <h4>Responses</h4>
      </div>
      <div className="responses-inner">
        <table aria-live="polite" className="responses-table" id="post_api_responses" role="region">
          <thead>
            <tr className="responses-header">
              <td className="col_header response-col_status">Code</td>
              <td className="col_header response-col_description">Description</td>
              <td className="col col_header response-col_links">Links</td>
            </tr>
          </thead>
          <tbody>
            {Object.entries(state?.responses ?? {}).map(([key, value], index) => {
              return (
                <SingleResponse
                  key={key + index}
                  value={value}
                  keys={key}
                  id={props.id}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const SingleResponse = (props) => {
  const { state: globalState } = useGlobalStore()
  const { value, keys: key } = props
  const { setRequestInit } = useEndpointStore(props.id)
  const [mediaType, setMediaType] = useState('')
  const [defaultValue, setDefaultValue] = useState({})


  const responseContentTypeOptions = Object.entries(value.content ?? {})
    .map(([key, value]) => {
      return (<option key={props.id + key} value={key}>{key}</option>)
    })


  useEffect(() => {
    const mediaType = Object.keys(value.content ?? {})[0]

    setMediaType(mediaType)

  }, [value.content])


  useEffect(() => {

    const content = value?.content?.[mediaType]

    if (!content?.schema || globalState.json == null || content == null) return

    const schemaRef = content.schema.$ref;
    // const schemaName = schemaRef?.split('/').pop();
    const _ = getDefaultRequestBody({ $ref: schemaRef, swaggerAsJson: globalState.json })

    setDefaultValue(_)

  }, [JSON.stringify({ mediaType, globalState })])

  if (responseContentTypeOptions.length === 0) {
    return (
      <tr key={props.id + key} className="response " data-code={key}>
        <td className="response-col_status">{key}</td>
        <td className="response-col_description">
          <div className="response-col_description__inner">
          </div>
        </td>
        <td className="response-col_links">
          <i>No links</i>
        </td>
      </tr>
    )
  }

  return (
    <tr key={props.id + key} className="response " data-code={key}>

      <td className="response-col_status">{key}</td>
      <td className="response-col_description">
        <div className="response-col_description__inner">
          <div className="renderedMarkdown">
            <p>{value.description}</p>
          </div>
        </div>
        <section className="response-controls">
          <div className="response-control-media-type response-control-media-type--accept-controller">
            <small className="response-control-media-type__title">Media type</small>
            <label className="content-type-wrapper"
              onChange={(e) => {
                // @ts-expect-error: ERR
                const value = e.target.value
                setMediaType(value)

                setRequestInit((s) => ({
                  ...s,
                  // body: 
                  headers: {
                    ...s.headers,
                    'accept': value
                  }
                }))
              }}>
              <select
                id="mediaTypeSelect"
                aria-label="Media Type"
                className="content-type"
                title="Select Media Type"
              >
                {responseContentTypeOptions}
              </select>
            </label>
            <small className="response-control-media-type__accept-message" style={{ display: 'block' }}>
              Controls <code>Accept</code> header.
            </small>
          </div>
        </section>
        <div className="model-example">
          <ul className="tab" role="tablist">
            <li className="tabitem active" role="presentation">
              <button aria-controls="zJzrVMQ=" aria-selected="true" className="tablinks" data-name="example" id="zpKLTic=" role="tab">Example Value</button>
            </li>
            <li className="tabitem" role="presentation">
              <button aria-controls="fzp4yGE=" aria-selected="false" className="tablinks" data-name="model" id="p+unu5o=" role="tab">Schema</button>
            </li>
          </ul>
          <div aria-hidden="false" aria-labelledby="zpKLTic=" data-name="examplePanel" id="zJzrVMQ=" role="tabpanel" tabIndex={0}>
            <div>
              <div className="highlight-code">
                <pre className="example microlight" style={{
                  display: "block",
                  overflowX: "auto",
                  padding: "0.5em",
                  background: "rgb(51, 51, 51)",
                  color: "white"
                }}>

                  <Monaco
                    options={{ readOnly: true }}
                    value={JSON.stringify(defaultValue, null, 2)}
                  />

                </pre>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className="response-col_links">
        <i>No links</i>
      </td>


    </tr>
  )
}