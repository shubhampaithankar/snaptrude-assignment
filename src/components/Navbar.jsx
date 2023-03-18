import React from 'react'
import '../styles.css'

const Navbar = (props) => {
  const { viewState: { viewState, setViewState }, shape: { shape, setShape }, mapRef } = props

  const HandleSubmit = (e) => {
    e.preventDefault()
    setViewState({
      longitude: Number(e.target[0].value).toFixed(4),
      latitude: Number(e.target[1].value).toFixed(4),
      zoom: Number(e.target[2].value).toFixed(4),
    })
    
    mapRef.current.flyTo({ center: [Number(e.target[0].value).toFixed(4), Number(e.target[1].value).toFixed(4)], zoom: Number(e.target[2].value).toFixed(4), duration: 2000 })
  }

  const HandleReset = (e) => {
    setViewState({
      longitude: 80,
      latitude: 22,
      zoom: 4,
    })

    mapRef.current.flyTo({ center: ['80', '22'], zoom: 4, duration: 2000 })
  }
  
  const shortNum = (num) => Number(num).toFixed(4)
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light navbar-new'>
      <div className='row align-items-center' style={{ width: '100%' }}>
        <div className='col-3 text-center'>
          <span className='my-1 mx-4 p-1'>Longitude: {shortNum(viewState.longitude)} | Latitude: {shortNum(viewState.latitude)} | Zoom: {shortNum(viewState.zoom)}</span>
        </div>
        <div className='col-3'>
          <div className='d-flex align-items-center'>
            <h5 className='m-1 p-1'>Go To:</h5>
            <form className='d-flex align-items-center justify-content-evenly' style={{ width: '80%' }} onSubmit={HandleSubmit} onReset={HandleReset}>
              <div className='form-group'>
                <label>Longitude</label>
                <input type='number'  className='form-control'  min={-180} max={180} step=".0001" required/>
              </div>
              <div className='form-group'>
                <label>Latitude</label>
                <input type='number'  className='form-control' min={-90} max={900} step=".0001" required/>
              </div>
              <div className='form-group'>
                <label>Zoom</label>
                <input type='number'  className='form-control' min={0} max={22} step=".0001" required/>
              </div>
              <div className='form-group'>
                <button type='submit' className='btn btn-success mt-2 mx-1'>Go</button>
                <button type='reset' className='btn btn-danger mt-2 mx-1'>Reset</button>
              </div>
            </form>
          </div>
        </div>
        <div className='col-6'>
          <div className='d-flex align-items-center justify-content-center'>
            <select className='form-select' onChange={e => setShape(e.target.value)} defaultValue={shape}> 
              <option value='Cuboid'>Cuboid</option>
              <option value='Cube'>Cube</option>
              <option value='Sphere'>Sphere</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar