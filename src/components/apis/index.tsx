import { useGlobalStore } from "#/src/global-state"
import { Endpoint } from "./endpoint"

export const Apis = () => {
  const { state } = useGlobalStore()

  return (
    <section className="block col-12 block-desktop col-12-desktop">
      <div>
        <span>
          <div className="opblock-tag-section is-open">

            <h3 className="opblock-tag no-desc" id="operations-tag-default" data-tag="default" data-is-open="true">
              <a className="nostyle" href="#/default">
                <span>default</span>
              </a>
              <small>
              </small>
              <div>
              </div>
              <button aria-expanded="true" className="expand-operation" title="Collapse operation">
                <svg className="arrow" width="20" height="20" aria-hidden="true" focusable="false">
                  <use href="#large-arrow-up" xlinkHref="#large-arrow-up">
                  </use>
                </svg>
              </button>
            </h3>

            <div className="no-margin">
              <div className="operation-tag-content">
                {state.endpoints?.map((endpoint, index) => {
                  return <Endpoint
                    parameters={endpoint.parameters}
                    key={index}
                    method={endpoint.method}
                    id={endpoint.operationId}
                    path={endpoint.path}
                    href={"#" + endpoint.operationId}
                    requestBody={endpoint.requestBody}
                    responses={endpoint.responses}
                  />
                })}
              </div>

            </div>
          </div>
        </span>
      </div>
    </section>
  )
}