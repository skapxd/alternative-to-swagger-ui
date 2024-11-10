import { useGlobalStore } from "../global-state"

export const Header = () => {
  const { state } = useGlobalStore()

  return (
    <div className="information-container wrapper" >
      <section className="block col-12">
        <div>
          <div className="info">
            <hgroup className="main">
              <h2 className="title">
                {state.json?.info.title}
                <span>
                  <small>
                    <pre className="version">{state.json?.info.version}</pre>
                  </small>
                  <small className="version-stamp">
                    <pre className="version">OAS3</pre>
                  </small>
                </span>
              </h2>
              <a target="_blank" href={state.json?.info.description} rel="noopener noreferrer" className="link">
                <span className="url">
                  {state.url?.toString()}
                </span>
              </a>
            </hgroup>
            <div className="description">
              <div className="renderedMarkdown">
                <p>{state.json?.info.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div >
  )
}