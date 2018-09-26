var interval = null
var animations = []

const STEP = 2

const __removeCompletedAnimations = () => {
  animations = animations.filter((animation) => {
    return animation.duration > 0
  })
}

const __evaluateAnimations = () => {
  if (animations.length === 0) {
    clearInterval(interval)
    interval = null

    return
  }

  animations.forEach((animation) => {
    animation.callback(STEP)
    animation.duration -= STEP
  })

  __removeCompletedAnimations()
}

const animate = (element, callback, duration) => {
  animations.push({
    callback,
    duration
  })

  if (interval === null) interval = setInterval(__evaluateAnimations, 1)
}

export default animate
