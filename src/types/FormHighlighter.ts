import * as JQuery from 'jquery'

import { FormBinder } from './FormBinder'
import { CssId, CssName, Highlight } from './Highlighter'

export class FormHighlighter {
  private binder: FormBinder

  constructor(binder: FormBinder) {
    this.binder = binder
    this.enable()
  }

  public disable(): FormHighlighter {
    this.unmakeSelectable('selectable', 'form', this.binder.element)
    this.unmakeSelectable('selectable', 'input', this.binder.inputs)
    return this
  }

  public enable(): FormHighlighter {
    this.makeSelectable('selectable', 'input', this.binder.inputs)
    this.makeSelectable('selectable', 'form', this.binder.element)

    const entering = (element: JQuery.Event<HTMLElement>): void => {
      JQuery(element).addClass(CssName('hilite'))
    }

    const leaving = (element: JQuery.Event<HTMLElement>): void => {
      JQuery(element).removeClass(CssName('hilite'))
    }

    this.binder.element.hover<HTMLElement>(entering, leaving)
    Highlight(this.binder.inputs)
    return this
  }

  private makeSelectable(name: string, tag: string, elements: JQuery<HTMLElement>): void {
    elements.addClass(CssName(name))
    elements.addClass(CssName(tag))
  }

  private unmakeSelectable(name: string, tag: string, elements: JQuery<HTMLElement>): void {
    elements.removeClass(CssName(tag))
    elements.removeClass(CssName(name))
  }
}
