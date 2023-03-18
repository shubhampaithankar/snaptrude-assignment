import React from 'react'
import { Map, MapProvider } from 'react-map-gl'

import config from '../config.json'

const Mapbox = (props) => {
    const { viewState: { viewState, setViewState }, image: { setImage }, mapRef } = props

    const captureMap = async () => {
      const imageApiUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${viewState.longitude},${viewState.latitude},${viewState.zoom}/500x500?access_token=${config.mapbox_token}`
      fetch(imageApiUrl)
      .then(response => response.blob())
      .then(imageBlob => {
          const imageObjectURL = URL.createObjectURL(imageBlob)
          setImage(imageObjectURL)
      })
    }
    return (
      <div className='d-flex flex-column align-items-center justify-content-center' style={{ height: '100%' }}>
        <MapProvider>
          <Map
            ref={mapRef}
            id='map'
            mapboxAccessToken={config.mapbox_token}
            initialViewState={viewState}
            onMove={evt => setViewState(evt.viewState)}
            style={{width: 500, height: 500}}
            mapStyle='mapbox://styles/mapbox/streets-v9'
          />
          <button className='btn btn-primary my-1' onClick={captureMap}>Capture Map</button>
        </MapProvider>
      </div>
    )
}

export default Mapbox