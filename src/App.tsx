import { useEffect } from 'react'
import { Apis } from './components/apis'
import { Auth } from './components/auth'
import { Header } from './components/header'
import { Icons } from './components/icons'
import { Schemas } from './components/schemas'
import { useGlobalStore } from './global-state'

interface Props {
  url: string
}

function App(props: Props) {
  const { url } = props ?? {}

  const store = useGlobalStore()

  useEffect(() => {
    store.getSwagger(url)
  }, [])

  return (
    <div data-reactroot="" className="swagger-ui">
      <Icons />
      <div>
        <Header />
        <Auth />
        <div className="wrapper">
          <Apis />
        </div>
        <div className="wrapper">
          <Schemas />
        </div>
      </div>
    </div>
  )
}

export default App
