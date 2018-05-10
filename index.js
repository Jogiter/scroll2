require('raf').polyfill()

/**
 * get scrollHeight
 * @return {Number} scrollHeight
 */
function getScrollHeight() {
  var body = document.body
  var html = document.documentElement
  var height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  )
  var viewportHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.getElementsByTagName('body')[0].clientHeight
  return height > viewportHeight ? height - viewportHeight : 0
}

/**
 * get scrollTop
 * @return {Number} scrollTop
 */
function getScrollTop() {
  return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
}

/**
 * scrollto scrollY position
 * @param  {Number}   [scrollY=0]       scroll end position
 * @param  {Number}   [duration=1000]   scroll time
 * @param  {Function} callback          scroll end callback, callback(scrollY, id)
 */
function scroll2(scrollY = 0, duration = 1000, callback) {
  var id
  var speed
  // scrollTop is a intValue
  var scrollTop = getScrollTop()
  var scrollHeight = getScrollHeight()
  scrollY = scrollY < 0 ? 0 : scrollY // hack negative
  scrollY = scrollHeight <= scrollY ? scrollHeight : scrollY // hack max-than-scrollHeight
  speed = (scrollY - scrollTop) * 1000 / 60 / duration

  function _scroll2() {
    var scrollTop = getScrollTop()
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

module.exports = scroll2
