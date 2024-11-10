export const Auth = () => {
  return (
    <div className="scheme-container">
      <section className="schemes wrapper block col-12">
        <div className="auth-wrapper">
          <button className="btn authorize unlocked">
            <span>Authorize
            </span>
            <svg width="20" height="20">
              <use href="#unlocked" xlinkHref="#unlocked">
              </use>
            </svg>
          </button>
        </div>
      </section>
    </div>
  )
}