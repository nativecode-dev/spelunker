import * as JQuery from 'jquery'

import { Lincoln, Logger } from '../Logging'
import { FormBinder } from './FormBinder'
import { CssId, CssName, EnableHighlighting } from './Highlighter'

type Element = JQuery<HTMLElement>
type Event = JQuery.Event<HTMLElement>

export class FormHighlighter {
  private readonly binder: FormBinder
  private readonly logger: Lincoln

  constructor(binder: FormBinder) {
    this.binder = binder
    this.binder.element.click((event: Event) => this.click(event))
    this.binder.element.hover((event: Event) => this.entering(event), (event: Event) => this.leaving(event))
    this.logger = Logger.extend('form-highlighter')
    this.enable()
  }

  public get form(): FormBinder {
    return this.binder
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
    this.binder.inputs.attr('disabled', 'true')
    EnableHighlighting(this.binder.inputs)
    return this
  }

  private click(event: Event): Element {
    const $element = JQuery(event.target)
    $element.closest(CssId('can-hilite')).toggleClass(CssName('hilite'))
    this.logger.debug(event, event.target)
    return JQuery(event.target)
  }

  private entering(event: Event): Element {
    return JQuery(event.target)
  }

  private leaving(event: Event): Element {
    return JQuery(event.target)
  }

  private makeSelectable(name: string, tag: string, elements: Element): void {
    elements.addClass(CssName(name))
    elements.addClass(CssName(tag))
  }

  private unmakeSelectable(name: string, tag: string, elements: Element): void {
    elements.removeClass(CssName(tag))
    elements.removeClass(CssName(name))
  }
}
