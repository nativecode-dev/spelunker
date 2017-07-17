import * as $ from 'jquery'

const log = console.log

$('form, form input').each((index: number, element: HTMLElement): void => {
  log(element)
  $(element).addClass('spelunker-selectable')
});

const hoverIn = (target: JQuery.Event<HTMLElement, null>): void => {
  log(target)
  $(target).addClass('spelunker-selected')
}

const hoverOut = (target: JQuery.Event<HTMLElement, null>): void => {
  log(target)
  $(target).removeClass('spelunker-selected')
}

$('.spelunker-selectable').hover(hoverIn, hoverOut)
