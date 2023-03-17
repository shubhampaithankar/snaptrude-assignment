import { useEffect, useRef } from "react"
import { Engine, Scene } from "@babylonjs/core"

const SceneComponent = ({ antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, image, ...rest }) => {
  const reactCanvas = useRef(null)

  // set up basic engine and scene
  useEffect(() => {
    const { current: canvas } = reactCanvas

    if (!canvas) return

    const engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio)
    const scene = new Scene(engine, sceneOptions)
    if (scene.isReady()) {
      onSceneReady(scene, image)
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene, image))
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === "function") onRender(scene)
      scene.render()
    })

    const resize = () => {
      scene.getEngine().resize()
    }

    if (window) {
      window.addEventListener("resize", resize)
    }


    return () => {
      scene.getEngine().dispose()
      if (window) {
        window.removeEventListener("resize", resize)
      }
    }
  }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, image])

  return <canvas style={{ width: '800px' }} ref={reactCanvas} {...rest} />
}

export default SceneComponent