import * as JQuery from 'jquery'

import * as highlighters from './highlighters'

export type ElementHighlighter = (jquery: JQuery<HTMLElement>) => JQuery<HTMLElement>
export const ElementHighlighters: Map<string, ElementHighlighter> = new Map<string, ElementHighlighter>()

export const Highlight = (jquery: JQuery<HTMLElement>): JQuery<HTMLElement> => {
  let current = jquery
  for (const highlighter of ElementHighlighters.values()) {
    current = highlighter(current)
  }
  return current
}

export const HighlightOnly = (selector: string, jquery: JQuery<HTMLElement>): JQuery<HTMLElement> => {
  const highlighter = ElementHighlighters.get(selector)
  if (highlighter) {
    return highlighter(jquery)
  }
  return jquery
}
