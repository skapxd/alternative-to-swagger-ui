import { useEndpointStore } from "./state"

interface Props {
  id: string
}

export const Parameters = (props: Props) => {
  const { id } = props ?? {}

  const { state, setParameters } = useEndpointStore(id)

  const { parameters } = state

  if (!parameters || parameters?.length === 0) {
    return (
      <div className="parameters-container">
        <div className="opblock-description-wrapper">
          <p>No parameters</p>
        </div>
      </div>
    )
  }

  return (
    <div className="parameters-container">
      <div className="table-container">
        <form onChange={(e) => {
          // Get Form
          const data = new FormData(e.currentTarget)
          const entries = Array.from(data.entries())
          const object = Object.fromEntries(entries)

          // Update local variables parameters
          for (const key in object) {
            const param = parameters.find((p) => p.name === key)
            if (param) {
              param.value = object[key]
            }
          }

          // Update State, used [structuredClone] to overwrite the state
          const deepClone = structuredClone(parameters)
          setParameters(deepClone)
        }}>
          <table className="parameters">
            <thead>
              <tr>
                <th className="col_header parameters-col_name">Name</th>
                <th className="col_header parameters-col_description">Description</th>
              </tr>
            </thead>

            <tbody>
              {parameters.map((e) => {
                return (
                  <tr key={id + e.name} data-param-name={e.name} data-param-in={e.in}>
                    <td className="parameters-col_name">
                      <div className="parameter__name required">
                        {e.name} {e.required && <span>&nbsp;*</span>}
                      </div>
                      <div className="parameter__type">
                        {e.schema.type as string}
                      </div>
                      <div className="parameter__deprecated">
                      </div>
                      <div className="parameter__in">
                        ({e.in})
                      </div>
                    </td>
                    <td className="parameters-col_description">
                      <div className="parameter__default renderedMarkdown">
                        <p>
                          <i>Default value</i> : {e.schema.default as string}</p>
                      </div>
                      <input
                        name={e.name}
                        type="text"
                        placeholder={e.name}
                        disabled={!state.tryOut}
                        defaultValue={e.schema.default as string}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  )
}