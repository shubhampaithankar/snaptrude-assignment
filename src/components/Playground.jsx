import React, { useEffect, useRef } from 'react'
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Texture, StandardMaterial, Color3, Engine, Scene } from '@babylonjs/core'

let box
const Playground = ({ image: { image, setImage }, shape: { shape }, antialias, engineOptions, adaptToDeviceRatio, sceneOptions }) => {

  const reactCanvas = useRef(null)

  const setBoxShape = (shape, scene) => {
    switch (shape) {
      case 'Cuboid': return box = MeshBuilder.CreateBox('box', { height: 2, width: 4 }, scene)
      case 'Cube': return box = MeshBuilder.CreateBox('box', { height: 3, width: 3, depth: 3 }, scene)
      case 'Sphere': return box = MeshBuilder.CreateSphere('sphere', { diameter: 3 }, scene)
      default: return box = MeshBuilder.CreateSphere('sphere', { diameter: 3 }, scene)
    }
  }
  const onSceneReady = (scene, image, box) => {
    const camera = new FreeCamera('camera1', new Vector3(0, 7, -7), scene)
    camera.setTarget(Vector3.Zero())
  
    const canvas = scene.getEngine().getRenderingCanvas()

    camera.attachControl(canvas, true)
  
    const light = new HemisphericLight('light', new Vector3(1, 2, 0), scene)
    light.intensity = 0.8
  
    box.position.y = 2
    
    let mat = new StandardMaterial('mat', scene)
    if (image.length) {
      mat.diffuseTexture = new Texture(image, scene)
    } else {
      mat.diffuseColor = new Color3(1, 1, 1)
    }
    box.material = mat
    
    MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene)
  }

  const onRender = (scene, box) => {
    if (box !== undefined) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime()
  
      const rpm = 10
      box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000)
    }
  } 

  
  useEffect(() => {

    const { current: canvas } = reactCanvas
  
    if (!canvas) return
  
    const engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio)
    const scene = new Scene(engine, sceneOptions)

    setBoxShape(shape, scene)

    if (scene.isReady()) {
      onSceneReady(scene, image, box)
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene, image, box))
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === 'function') onRender(scene, box)
      scene.render()
    })

    const resize = () => {
      scene.getEngine().resize()
    }

    if (window) {
      window.addEventListener('resize', resize)
    }


    return () => {
      scene.getEngine().dispose()
      if (window) {
        window.removeEventListener('resize', resize)
      }
    }

  }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, shape, image])

  return (
    <div className='d-flex flex-column align-items-center justify-content-center' style={{ height: '100%' }}>
      {/* <SceneComponent antialias image={image} box={box} onSceneReady={onSceneReady} onRender={onRender} id='my-canvas' /> */}
      <canvas style={{ width: '800px' }} ref={reactCanvas}/>
      <h5 className='mx-2 my-3'>Control using mouse and arrow keys</h5>
    </div>
  )
}

export default Playground
