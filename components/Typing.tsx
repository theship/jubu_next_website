import React from 'react'
import Typed from 'typed.js'

export default function Typing() {
  const el = React.useRef(null)

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        'design and engineering',
        'in the age of AI',
        'for data pipelines',
        'for developers',
        'for civic engagement',
        'for human potential',
        'that matters',
      ],
      typeSpeed: 75,
      loop: true,
      cursorChar: '_',
    })

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <>
      <span ref={el} />
    </>
  )
}
