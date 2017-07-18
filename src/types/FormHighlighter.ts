import { FormBinder } from './FormBinder'
import { CssId, CssName } from './Highlighter'

export class FormHighlighter {
  private binder: FormBinder

  constructor(binder: FormBinder) {
    this.binder = binder
    this.enable()
  }

  public disable(): FormHighlighter {
    this.binder.element.removeClass(CssName('selectable'))
    this.binder.element.removeClass(CssName('form'))

    this.binder.inputs.removeClass(CssName('selectable'))
    this.binder.inputs.removeClass(CssName('input'))
    return this
  }

  public enable(): FormHighlighter {
    this.binder.element.addClass(CssName('form'))
    this.binder.element.addClass(CssName('selectable'))

    this.binder.inputs.addClass(CssName('input'))
    this.binder.inputs.addClass(CssName('selectable'))
    return this
  }
}
