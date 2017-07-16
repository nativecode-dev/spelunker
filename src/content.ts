import * as $ from 'jquery'

$('form, form input').each((index: number, element: HTMLElement): void => {
  $(element).addClass('pls-selectable')
  console.log(element)
});

const hoverIn = (target: JQuery.Event<HTMLElement, null>): void => {
  $(target).addClass('pls-selected')
}

const hoverOut = (target: JQuery.Event<HTMLElement, null>): void => {
  $(target).removeClass('pls-selected')
}

$('.pls-selectable').hover(hoverIn, hoverOut)
