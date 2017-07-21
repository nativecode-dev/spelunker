import { FormHighlighter, FormHighlighters } from '../scripts/Index'

const log = console.log
const highlighters: FormHighlighter[] = FormHighlighters()

for (const highlighter of highlighters) {
  log(highlighter)
}
