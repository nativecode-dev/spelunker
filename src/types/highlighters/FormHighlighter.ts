import * as JQuery from 'jquery'

import { ElementHighlighters } from '../ElementHighlighter'

const DIV: string = 'div'
const FORM: string = 'form'

const Closest = (tag: string, jquery: JQuery<HTMLElement>): JQuery<HTMLElement> =>
  jquery.closest(tag).addClass(`.spelunker-hilite .spelunker-${tag}`)

ElementHighlighters.set(DIV, (jquery) => Closest(DIV, jquery))
ElementHighlighters.set(FORM, (jquery) => Closest(FORM, jquery))
