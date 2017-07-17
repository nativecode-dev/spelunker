import * as $ from 'jquery'

$('form, form input').each((index: number, element: HTMLElement): void => {
  $(element).addClass('spelunker-selectable')
});

const hoverIn = (target: JQuery.Event<HTMLElement, null>): void => {
  $(target).addClass('spelunker-selected')
}

const hoverOut = (target: JQuery.Event<HTMLElement, null>): void => {
  $(target).removeClass('spelunker-selected')
}

$('.spelunker-selectable').hover(hoverIn, hoverOut)
