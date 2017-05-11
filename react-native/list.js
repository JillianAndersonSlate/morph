import { extractCode } from './code.js'
import morphBlock from './morph-block.js'
import morphProps from './morph-props.js'

export default function* List(
  {
    blocks,
    helpers,
    index: listIndex = 'i',
    from: rawFrom,
    style,
    tag = 'View',
    variable = 'item',
  },
  { block, custom, debug, index }
) {
  const props = {}
  const accessed = []
  const uses = []
  let nextIndex = index + 1

  if (tag !== false) {
    if (style && (style.overflowY === 'auto' || style.overflowY === 'scroll')) {
      tag = 'ScrollView'
    }
    uses.push(tag)
    yield `<${tag}`

    // TODO review if we need to explicitly set flexDirection here or if we can just let it be
    if (style) props.style = style
    const { accessed: accessedProps, hasProps } = yield* morphProps(props, {
      block,
      debug,
      index,
    })
    if (hasProps) {
      accessedProps.forEach(a => !accessed.includes(a) && accessed.push(a))
    }

    yield '>\n'
  }

  const rblock = Array.isArray(blocks) && blocks[0]

  if (rawFrom && rblock) {
    // TODO like this keep at pushign used props into uses
    // TODO isValid to push message upstream to the code as a linter?
    // TODO item in context of list?
    // TODO ...
    const { accessed: accessedFrom, code: from } = extractCode(rawFrom)
    accessedFrom.forEach(a => !accessed.includes(a) && accessed.push(a))

    if (!rblock.key) {
      rblock.key = `{${listIndex}}`
    }

    yield `{${from} && ${from}.map((${variable}, ${listIndex}) => `

    if (helpers) {
      const { accessed: accessedHelpers, codeRaw: helpersCode } = extractCode(
        helpers.replace(/\\n/g, '')
      )
      accessedHelpers.forEach(a => !accessed.includes(a) && accessed.push(a))
      yield `{\n${helpersCode}\nreturn `
    }

    yield '(\n'

    const res = yield* morphBlock(rblock, {
      block,
      custom,
      debug,
      index: nextIndex,
    })
    nextIndex = res.index
    res.accessed.forEach(b => !accessed.includes(b) && accessed.push(b))
    res.uses.forEach(b => !uses.includes(b) && uses.push(b))

    yield `\n)`

    if (helpers) yield '}'
    yield ')}'
  }

  if (tag !== false) {
    yield `\n</${tag}>\n`
  }

  return {
    accessed,
    captures: [],
    index: nextIndex,
    uses,
  }
}