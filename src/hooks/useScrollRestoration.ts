import { useEffect } from 'react'
import { useLocation } from 'react-router'

/** Scrolls to top on route change, or to the #hash target once it has mounted. */
export function useScrollRestoration() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
      return
    }
    let tries = 0
    let timer = 0
    const seek = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior })
        // correct once more after late layout (fonts, images) settles
        timer = window.setTimeout(() => el.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior }), 350)
      } else if (tries++ < 40) {
        timer = window.setTimeout(seek, 60)
      }
    }
    timer = window.setTimeout(seek, 400)
    return () => window.clearTimeout(timer)
  }, [pathname, hash])
}
