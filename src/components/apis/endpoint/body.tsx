import { Request } from "./request"
import { Response } from "./response"
import { ServerResponse } from "./server-response"

interface Props {
  id: string
}

export const Body = (props: Props) => {

  return (
    <div className="no-margin">

      <div className="opblock-body">
        <Request {...props} />

        <ServerResponse {...props} />

        <Response {...props} />
      </div>

    </div>
  )
}