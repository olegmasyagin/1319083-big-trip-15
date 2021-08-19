import AbstractView from './abstract.js';

const createTripEventsListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`);

class EventList extends AbstractView {

  getTemplate() {
    return createTripEventsListTemplate();
  }
}

export default EventList;

