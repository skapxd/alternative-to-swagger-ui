import { Monaco } from "../../monaco"
import { useEndpointStore } from "./state"

interface Props {
  id: string
}

export const ServerResponse = (props: Props) => {
  const { id } = props ?? {}

  const { state } = useEndpointStore(id)
  const { serverResponse } = state
  console.log('ServerResponse: ', props.id)
  console.log({ serverResponse })
  if (serverResponse == null) return <></>

  return (
    <div className="responses-inner">
      <div>
        <div>
          <div className="curl-command">
            <h4>Curl</h4>
            <div className="copy-to-clipboard">
              <button>
              </button>
            </div>
            <div>
              <pre
                className="curl microlight"
                style={{
                  display: 'block', overflowX: 'auto', padding: '0.5em', background: 'rgb(51, 51, 51)', color: 'white',
                }}>
                <code className="language-bash" style={{ whiteSpace: 'pre' }}>
                  <span>

                    curl -X

                  </span>
                  <span style={{ color: 'rgb(162, 252, 162)' }}>

                    'GET'

                  </span>
                  <span>

                    \

                  </span>
                  <span>

                  </span>
                  <span style={{ color: 'rgb(162, 252, 162)' }}>

                    'http://localhost:3001/api/mongoose'

                  </span>
                  <span>

                    \

                  </span>
                  <span>

                    -H

                  </span>
                  <span style={{ color: 'rgb(162, 252, 162)' }}>

                    'accept: */*'

                  </span>
                </code>
              </pre>
            </div>
          </div>
          <div>
            <h4>Request URL</h4>
            <div className="request-url">
              <pre className="microlight">http://localhost:3001/api/mongoose</pre>
            </div>
          </div>
          <h4>Server response</h4>
          <table className="responses-table live-responses-table">
            <thead>
              <tr className="responses-header">
                <td className="col_header response-col_status">Code</td>
                <td className="col_header response-col_description">Details</td>
              </tr>
            </thead>
            <tbody>
              <tr className="response">
                <td className="response-col_status">

                  200

                </td>
                <td className="response-col_description">
                  <div>
                    <h5>Response body</h5>
                    <div className="highlight-code">
                      <div className="download-contents">Download</div>
                      <div className="copy-to-clipboard">
                        <button>
                        </button>
                      </div>
                      <pre className=" microlight" style={{
                        display: 'block', overflowX: 'auto', padding: '0.5em', background: 'rgb(51, 51, 51)', color: 'white'
                      }}>
                        {JSON.stringify(serverResponse, null, 2)}
                      </pre>
                    </div>
                  </div>
                  <div>
                    <h5>Response headers</h5>
                    <pre className="microlight">
                      <span className="headerline">

                        access-control-allow-origin

                        :

                        *

                      </span>
                      <span className="headerline">

                        content-length

                        :

                        2

                      </span>
                      <span className="headerline">

                        content-type

                        :

                        application/json; charset=utf-8

                      </span>
                      <span className="headerline">

                        date

                        :

                        Fri,08 Nov 2024 04:05:02 GMT

                      </span>
                      <span className="headerline">

                        etag

                        :

                        W/"2-l9Fw4VUO7kr8CvBlt4zaMCqXZ0w"

                      </span>
                      <span className="headerline">

                        x-powered-by

                        :

                        Express

                      </span>
                    </pre>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4>Responses</h4>
      </div>
      <table aria-live="polite" className="responses-table" id="get_api_mongoose_responses" role="region">
        <thead>
          <tr className="responses-header">
            <td className="col_header response-col_status">Code</td>
            <td className="col_header response-col_description">Description</td>
            <td className="col col_header response-col_links">Links</td>
          </tr>
        </thead>
        <tbody>
          <tr className="response response_current" data-code="200">
            <td className="response-col_status">200</td>
            <td className="response-col_description">
              <div className="response-col_description__inner">

              </div>
            </td>
            <td className="response-col_links">
              <i>No links</i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}