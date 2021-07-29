import { createSiteMenuTemplate } from './view/site-menu.js';
import { createTripInfoTemplate } from './view/trip-info.js';
import { createTripFiltersTemplate } from './view/filters.js';
import { createTripSortingTemplate } from './view/sorting.js';
import { createNewTripPointTemplate } from './view/new-point.js';
import { createEditTripPointTemplate } from './view/edit-point.js';
import { createTripPointTemplate } from './view/trip-point.js';
import { createTripEventsListTemplate } from './view/trip-events-list.js';

const WAYPOINT_COUNT = 3;

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const tripMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');

const tripEventsElement = siteMainElement.querySelector('.trip-events');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(tripMenuElement, createSiteMenuTemplate(), 'beforeend');
render(tripMainElement, createTripInfoTemplate(), 'afterbegin');
render(tripFiltersElement, createTripFiltersTemplate(), 'beforeend');
render(tripEventsElement, createTripSortingTemplate(), 'beforeend');
render(tripEventsElement, createTripEventsListTemplate(), 'beforeend');

const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');

render(tripEventsListElement, createEditTripPointTemplate(), 'afterbegin');
render(tripEventsListElement, createNewTripPointTemplate(), 'beforeend');

for(let i = 0; i < WAYPOINT_COUNT; i++) {
  render(tripEventsListElement, createTripPointTemplate(), 'beforeend');
}
