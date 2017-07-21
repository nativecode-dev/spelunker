import { FormHighlighter, FormHighlighters } from '../Highlighting'

const log = console.log
const highlighters: FormHighlighter[] = FormHighlighters()

for (const highlighter of highlighters) {
  log(highlighter)
}
