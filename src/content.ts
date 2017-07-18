import { FormHighlighters } from './types/FormBinder'
import { FormHighlighter } from './types/FormHighlighter'

const log = console.log
const highlighters: FormHighlighter[] = FormHighlighters()

for (const highlighter of highlighters) {
  log(highlighter)
}
