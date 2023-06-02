const npa = require('npm-package-arg')
const semver = require('semver')

class OverrideSet {
  constructor ({ overrides, key, parent }) {
    this.parent = parent
    this.children = new Map()

    if (typeof overrides === 'string') {
      overrides = { '.': overrides }
    }

    // change a literal empty string to * so we can use truthiness checks on
    // the value property later
    if (overrides['.'] === '') {
      overrides['.'] = '*'
    }

    if (parent) {
      const spec = npa(key)
      if (!spec.name) {
        throw new Error(`Override without name: ${key}`)
      }

      this.name = spec.name
      spec.name = ''
      this.key = key
      this.keySpec = spec.toString()
      this.value = overrides['.'] || this.keySpec
    }

    for (const [key, childOverrides] of Object.entries(overrides)) {
      if (key === '.') {
        continue
      }

      const child = new OverrideSet({
        parent: this,
        key,
        overrides: childOverrides,
      })

      this.children.set(child.key, child)
    }
  }

  getEdgeRule (edge) {
    for (const rule of this.ruleset.values()) {
      if (rule.name !== edge.name) {
        continue
      }

      // if keySpec is * we found our override
      if (rule.keySpec === '*') {
        return rule
      }

      let spec = npa(`${edge.name}@${edge.spec}`)
      if (spec.type === 'alias') {
        spec = spec.subSpec
      }

      if (spec.type === 'git') {
        if (spec.gitRange && semver.intersects(spec.gitRange, rule.keySpec)) {
          return rule
        }

        continue
      }

      if (spec.type === 'range' || spec.type === 'version') {
        if (semver.intersects(spec.fetchSpec, rule.keySpec)) {
          return rule
        }

        continue
      }

      // if we got this far, the spec type is one of tag, directory or file
      // which means we have no real way to make version comparisons, so we
      // just accept the override
      return rule
    }

    return this
  }

  getNodeRule (node) {
    for (const rule of this.ruleset.values()) {
      if (rule.name !== node.name) {
        continue
      }

      if (semver.satisfies(node.version, rule.keySpec) ||
        semver.satisfies(node.version, rule.value)) {
        return rule
      }
    }

    return this
  }

  getMatchingRule (node) {
    for (const rule of this.ruleset.values()) {
      if (rule.name !== node.name) {
        continue
      }

      if (semver.satisfies(node.version, rule.keySpec) ||
        semver.satisfies(node.version, rule.value)) {
        return rule
      }
    }

    return null
  }

  * ancestry () {
    for (let ancestor = this; ancestor; ancestor = ancestor.parent) {
      yield ancestor
    }
  }

  get isRoot () {
    return !this.parent
  }

  get ruleset () {
    const ruleset = new Map()

    for (const override of this.ancestry()) {
      for (const kid of override.children.values()) {
        if (!ruleset.has(kid.key)) {
          ruleset.set(kid.key, kid)
        }
      }

      if (!override.isRoot && !ruleset.has(override.key)) {
        ruleset.set(override.key, override)
      }
    }

    return ruleset
  }
}

module.exports = OverrideSet
