import * as JQuery from 'jquery'
import * as uuid from 'uuidjs'

import { StringHash } from '../Utils'
import { FormHighlighter } from './FormHighlighter'

const BUTTON: string = 'button'
const FORM: string = 'form'
const ID: string = 'id'
const INPUT: string = 'input'
const NAME: string = 'name'
const SELECT: string = 'select'
const SPACE: string = ' '

const syntheticId = (element: HTMLElement) => {
  const $element: JQuery<HTMLElement> = JQuery(element)
  const id: string = $element.attr(ID) || ''
  const name: string = $element.attr(NAME) || ''
  const url: string = document.URL

  const canon: string[] = [id, name, url]
  return btoa(StringHash(canon.join('::')).toString())
}

export class FormBinder {
  private readonly form: HTMLElement
  private readonly synthId: string
  private readonly $form: JQuery<HTMLElement>

  constructor(form: HTMLElement) {
    this.form = form
    this.synthId = syntheticId(this.form)
    this.$form = JQuery(this.form)
  }

  public get buttons(): JQuery<HTMLElement> {
    const tags = [
      BUTTON,
      `${INPUT}[type="button"]`,
      `${INPUT}[type="cancel"]`,
      `${INPUT}[type="submit"]`,
    ]
    return this.$form.find(tags.join(SPACE))
  }

  public get element(): JQuery<HTMLElement> {
    return this.$form
  }

  public get id(): string | undefined {
    return this.$form.attr(ID) || this.syntheticId
  }

  public get hidden(): JQuery<HTMLElement> {
    return this.$form.find(`${INPUT}[type="hidden"]`)
  }

  public get inputs(): JQuery<HTMLElement> {
    return this.$form.find(INPUT)
  }

  public get name(): string | undefined {
    return this.$form.attr(NAME) || this.syntheticId
  }

  public get selects(): JQuery<HTMLElement> {
    return this.$form.find(SELECT)
  }

  public get syntheticId(): string {
    return this.synthId
  }
}

export const FormHighlighters = (): FormHighlighter[] => {
  return JQuery(FORM).toArray()
    .map((element: HTMLElement) => new FormBinder(element))
    .map((binder: FormBinder) => new FormHighlighter(binder))
}
