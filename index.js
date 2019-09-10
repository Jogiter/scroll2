require('raf').polyfill()

/**
 * get scrollHeight
 * @return {Number} scrollHeight
 */
export function getScrollHeight () {
  const body = document.body
  const html = document.documentElement
  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  )
  const viewportHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.getElementsByTagName('body')[0].clientHeight
  return height > viewportHeight ? height - viewportHeight : 0
}

/**
 * get scrollTop
 * @return {Number} scrollTop
 */
export function getScrollTop () {
  return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
}

/**
 * scrollto scrollY position
 * @param  {Number}   [scrollY=0]       scroll end position
 * @param  {Number}   [duration=1000]   scroll time
 * @param  {Function} callback          scroll end callback, callback(scrollY, id)
 */
export default function scroll2 (scrollY = 0, duration = 1000, callback) {
  let id
  let speed
  // scrollTop is a intValue
  const scrollTop = getScrollTop()
  const scrollHeight = getScrollHeight()
  scrollY = scrollY < 0 ? 0 : scrollY // hack negative
  scrollY = scrollHeight <= scrollY ? scrollHeight : scrollY // hack max-than-scrollHeight
  speed = (scrollY - scrollTop) * 1000 / 60 / duration

  function _scroll2 () {
    let scrollTop = getScrollTop()
    if (
      (speed > 0 && scrollTop + speed > scrollY) ||
      (speed < 0 && scrollTop + speed < scrollY)
    ) {
      window.scrollTo(0, scrollY)
      cancelAnimationFrame(id)
      callback && typeof callback === 'function' && callback(scrollY, id)
    } else {
      window.scrollTo(0, (scrollTop += speed))
      id = requestAnimationFrame(_scroll2)
    }
  }
  id = requestAnimationFrame(_scroll2)
}
