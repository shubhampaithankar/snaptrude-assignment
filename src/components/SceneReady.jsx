import React from "react"
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Texture, StandardMaterial, Color3 } from "@babylonjs/core"
import SceneComponent from "./SceneComponent"


let box
const onSceneReady = (scene, image) => {
  // This creates and positions a free camera (non-mesh)
  const camera = new FreeCamera("camera1", new Vector3(0, 5, -5), scene)

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero())

  const canvas = scene.getEngine().getRenderingCanvas()

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true)

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight("light", new Vector3(1, 2, 0), scene)
  light.intensity = 0.8

  // Our built-in 'box' shape.
  box = MeshBuilder.CreateBox("box", { height: 2, width: 4 }, scene)

  // Move the box upward 1/2 its height
  box.position.y = 1

  
  let mat = new StandardMaterial("mat", scene)
  if (image.length) {
    mat.diffuseTexture = new Texture(image, scene)
  } else {
    mat.diffuseColor = new Color3(190, 194, 203)
  }
  box.material = mat
  
  // Our built-in 'ground' shape.
  MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene)
}

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene) => {
  if (box !== undefined) {
    const deltaTimeInMillis = scene.getEngine().getDeltaTime()

    const rpm = 10
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000)
  }
} 

const SceneReady = ({ image: { image }, box: { box } }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100%' }}>
      <SceneComponent antialias image={image} box={box} onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
    </div>
  )
}

export default SceneReady
