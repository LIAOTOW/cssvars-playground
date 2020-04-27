const cloneDeep = require('lodash/cloneDeep')
const tailwindDefault = require('tailwindcss/defaultTheme')

module.exports = function (options = {}, varModules = {
  colors: 'color',
  fontSize: 'text',
  lineHeight: 'leading',
  letterSpacing: 'tracking',
  backgroundSize: 'bg',
  borderWidth: 'border',
  borderRadius: 'rounded',
  minWidth: 'min-w',
  minHeight: 'min-h',
  maxWidth: 'max-w',
  maxHeight: 'max-h',
  boxShadow: 'shadows',
  zIndex: 'z',
  opacity: 'opacity',
  // screens: 'screens',
  fontWeight: 'font',
}) {
  const root = {}
  const mergedConfig = merge(tailwindDefault, options)
  const varsConfig = cloneDeep(mergedConfig)

  Object.keys(varModules).forEach(moduleKey => {
    const moduleName = varModules[moduleKey]
    const config = varsConfig[moduleKey]

    for (let key in config) {
      const val = config[key]
      if (typeof val === 'string') {
        let varName = `--${moduleName}-${key}`.replace(/-default$/, '')
        root[varName] = val
        varsConfig[moduleKey][key] = `var(${varName})`
      } else if (isObject(val)) {

        for (let keykey in val) {
          const valval = val[keykey]
          if (typeof valval === 'string') {
            let varName = `--${moduleName}-${key}-${keykey}`.replace(/-default$/, '')
            root[varName] = valval
            varsConfig[moduleKey][key][keykey] = `var(${varName})`
          }
        }
      }
    }
  })

  return {
    root,
    varsConfig,
    mergedConfig,
  }
}

const isObject = (value) => {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}

const merge = (source, other) => {
  if (!isObject(source) || !isObject(other)) {
    return other === undefined ? source : other
  }
  // 合并两个对象的 key，另外要区分数组的初始值为 []
  return Object.keys({
    ...source,
    ...other
  }).reduce((acc, key) => {
    // 递归合并 value
    acc[key] = merge(source[key], other[key])
    return acc
  }, Array.isArray(source) ? [] : {})
}
