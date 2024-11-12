import { useEffect, useState } from "react"
import { Body } from "./body"
import { Head } from "./head"
import { SwaggerEndpoint } from "#/src/global-state"
import { useEndpointStore } from "./state"

interface Props {
  method: SwaggerEndpoint['method']
  path: string
  id: string
  href: string
  parameters: SwaggerEndpoint['parameters']
  requestBody: SwaggerEndpoint['requestBody']
  responses: SwaggerEndpoint['responses']
}

export const Endpoint = (props: Props) => {
  const { method, id, path, href, parameters, requestBody, responses } = props

  const [showBody, setShowBody] = useState(false)

  const { setState } = useEndpointStore(id)

  useEffect(() => {

    const firstContentType = (() => {
      const _ = Object.keys(requestBody?.content ?? {})[0]

      return _
    })()

    setState(
      {
        [id]: {
          method,
          path,
          id,
          href,
          parameters,
          tryOut: false,
          showBody: false,
          requestBody,
          responses,
          serverResponse: { body: null, contentType: '' },
          requestInit: {
            method,
            headers: {
              "Content-Type": firstContentType
            }
          }
        }
      }
    )
  }, [])

  return (
    <span>
      <div className={`opblock opblock-${method.toLocaleLowerCase()}`} id={id} >
        <Head
          href={href}
          method={method}
          path={path}
          showBody={showBody}
          onClick={() => setShowBody((state) => !state)}
        />

        {showBody && <Body id={id} />}
      </div>
    </span>
  )
}