import React, { Suspense, useState, useRef, Component } from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

import './styles.css'

const Mapbox= React.lazy(() => import('./components/Mapbox'))
const Playground = React.lazy(() => import('./components/Playground'))

const App = () => {
  const mapRef = useRef(null)

  const [image, setImage] = useState('')
  const [shape, setShape] = useState('Cuboid')
  const [viewState, setViewState] = useState({
    longitude: 80,
    latitude: 22,
    zoom: 3.25
  })

  const props = {
    viewState: { viewState, setViewState },
    image: { image, setImage },
    shape: { shape, setShape }, 
    mapRef
  }

  return (
    <>
      <ErrorBoundary>
        <Navbar {...props}/>
        <main className='container-fluid'>
          <Suspense fallback={<Loader />}>
            <div className='row'>
              <div className='col-6'>
                <Mapbox {...props} />
              </div>
              <div className='col-6'>
                <Playground {...props}/>
              </div>
            </div>
          </Suspense>
        </main>
        <Footer />
      </ErrorBoundary>
    </>
  )
}

const Loader = () => {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center' style={{ height: '100%' }}>
      Loading...
    </div>
  )
}

class ErrorBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) { return { hasError: true }  }

  // componentDidCatch(error, errorInfo) { logErrorToMyService(error, errorInfo);  }

  
  render() {
    if (this.state.hasError) { return <h1>There was an error.</h1>;    }
    return this.props.children; 
  }
}

export default App
