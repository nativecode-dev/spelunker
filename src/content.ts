import './styles/spelunker.scss'

import './assets/icon-16.png'
import './assets/icon-24.png'
import './assets/icon-32.png'
import './assets/icon-48.png'
import './assets/icon-64.png'
import './assets/icon.png'

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
