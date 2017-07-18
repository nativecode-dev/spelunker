import * as $ from 'jquery'

import { FormHighlighter, FormHighlighters } from './types/index'

const log = console.log
const highlighters: FormHighlighter[] = FormHighlighters()

for (const highlighter of highlighters) {
  log(highlighter)
}
