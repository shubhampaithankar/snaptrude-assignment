import React, { Suspense, useState, useRef } from "react"
import Navbar from './components/Navbar'

import './styles.css'

const Mapbox= React.lazy(() => import('./components/Mapbox'))
const SceneReady = React.lazy(() => import('./components/SceneReady'))

const App = () => {
  const mapRef = useRef(null)

  const [image, setImage] = useState('')
  const [box, setBox] = useState('Cuboid')
  const [viewState, setViewState] = useState({
    longitude: 80,
    latitude: 22,
    zoom: 4
  })

  const props = {
    viewState: { viewState, setViewState },
    image: { image, setImage },
    box: { box, setBox }, 
    mapRef
  }

  return (
    <>
    <Navbar {...props}/>
      <main className="container-fluid">
        <Suspense fallback={<Loader />}>
          <div className="row">
            <div className="col-6">
              <Mapbox {...props} />
            </div>
            <div className="col-6">
              <SceneReady {...props}/>
            </div>
          </div>
        </Suspense>
      </main>
    </>
  )
}

const Loader = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100%' }}>
      Loading...
    </div>
  )
}

export default App
