export default class {
  constructor () {
    this.elements = Array.from(document.querySelectorAll('.journey__page'))
    this.transitioning = false
    this.position = this.__getCurrentPosition()

    this.__watchForWheel()
  }

  __getCurrentPosition () {
    const closestToTop = this.elements
      .map((element, index) => {
        return {
          top: Math.abs(element.getBoundingClientRect().top),
          index
        }
      })
      .sort((a, b) => a.top - b.top)

    return closestToTop[0].index
  }

  __watchForWheel () {
    let accelerating = false
    let lastTime = 0
    let speed = 0
    let scrollingTimeout = null

    window.addEventListener('wheel', (event) => {
      const currentSpeed = event.deltaY / (event.timeStamp - lastTime)

      if (currentSpeed > speed) {
        accelerating = true
      } else if (currentSpeed < speed && accelerating) {
        accelerating = false

        this.__transition(event.deltaY)
      }

      lastTime = event.timeStamp
      speed = currentSpeed
    })

    window.addEventListener('scroll', () => {
      if (scrollingTimeout !== null) {
        clearTimeout(scrollingTimeout)
        scrollingTimeout = null
      }

      scrollingTimeout = setTimeout(() => {
        this.position = this.__getCurrentPosition()
        scrollingTimeout = null
      }, 66)
    })
  }

  __transition (deltaY) {
    if (this.transitioning) return

    this.transitioning = true

    if (deltaY > 0) this.__moveToNextElement()
    if (deltaY < 0) this.__moveToPreviousElement()

    setTimeout(() => {
      this.transitioning = false
    }, 1250)
  }

  __moveToNextElement () {
    this.__incrementPosition(1)

    window.scrollTo({
      top: window.scrollY + this.elements[this.position].getBoundingClientRect().top,
      behavior: 'smooth'
    })
  }

  __moveToPreviousElement () {
    this.__incrementPosition(-1)

    window.scrollTo({
      top: window.scrollY + this.elements[this.position].getBoundingClientRect().top,
      behavior: 'smooth'
    })
  }

  __incrementPosition (amount) {
    let nextPosition = this.position + amount

    if (nextPosition < 0) nextPosition = 0
    else if (nextPosition >= this.elements.length) nextPosition = this.elements.length - 1

    this.position = nextPosition
  }
}
