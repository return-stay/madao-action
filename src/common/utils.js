export const ssDom = {
  // 判断时候是否有该class
  hasClass (el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
  },

  addClass (el, className) {
    if (this.hasClass(el, className)) {
      return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
  },

  removeClass (el, className) {
    if (this.hasClass(el, className)) {
      let newClass = el.className.split(' ')
      for (let i = 0; i < newClass.length; i++) {
        if (newClass[i] === className) {
          newClass.splice(i, 1)
        }
      }
      el.className = newClass.join(' ')
    }
  }
}

export function toggleClass (element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}
