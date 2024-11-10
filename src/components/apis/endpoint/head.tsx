import { SwaggerEndpoint } from "#/src/global-state"
import { IconNames } from "../../icons"

interface Props {
  method: SwaggerEndpoint['method']
  path: string
  href: string
  showBody: boolean
  onClick: () => void
}

export const Head = (props: Props) => {
  const { method, path, href, showBody, onClick } = props ?? {}
  const lowerCaseMethod = method.toLowerCase()

  const icon = showBody
    ? IconNames.LARGE_ARROW_UP
    : IconNames.LARGE_ARROW_DOWN

  return (
    <div className={`opblock-summary opblock-summary-${lowerCaseMethod}`} onClick={onClick}>

      <button aria-label={`${lowerCaseMethod} ${path}`} aria-expanded="false" className="opblock-summary-control">
        <span className="opblock-summary-method">{method}</span>
        <span className="opblock-summary-path" data-path={path}>
          <a className="nostyle" href={href}>
            <span>{path}</span>
          </a>
        </span>
        <div className="opblock-summary-description">
        </div>
        <svg className="arrow" width="20" height="20" aria-hidden="true" focusable="false">
          <use href={icon} xlinkHref={icon}>
          </use>
        </svg>
      </button>

      <button className="authorization__btn unlocked" aria-label="authorization button unlocked">
        <svg width="20" height="20">
          <use href="#unlocked" xlinkHref="#unlocked">
          </use>
        </svg>
      </button>
    </div>
  )
}