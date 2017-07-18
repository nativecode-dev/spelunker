import * as JQuery from 'jquery'

export const CssId = (...names: string[]): string => {
  return `.${CssName(...names)}`
}

export const CssName = (...names: string[]): string => {
  return `spelunker-${names.join('-')}`
}

export type Highlighter = (jquery: JQuery<HTMLElement>) => JQuery<HTMLElement>
export const Highlighters: Map<string, Highlighter> = new Map<string, Highlighter>()

export const Highlight = (jquery: JQuery<HTMLElement>): JQuery<HTMLElement> => {
  let current = jquery
  for (const highlighter of Highlighters.values()) {
    current = highlighter(current)
  }
  return current
}

export const HighlightOnly = (selector: string, jquery: JQuery<HTMLElement>): JQuery<HTMLElement> => {
  const highlighter = Highlighters.get(selector)
  if (highlighter) {
    return highlighter(jquery)
  }
  return jquery
}

const DIV: string = 'div'
const FORM: string = 'form'

const Closest = (tag: string, jquery: JQuery<HTMLElement>): JQuery<HTMLElement> =>
  jquery.closest(tag).addClass(`.spelunker-hilite .spelunker-${tag}`)

Highlighters.set(DIV, (jquery) => Closest(DIV, jquery))
Highlighters.set(FORM, (jquery) => Closest(FORM, jquery))
