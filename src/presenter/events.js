import SortingView from '../view/sorting.js';
import EventListView from '../view/trip-events-list.js';
import NoEventView from '../view/no-event.js';
// import EditTripPointView from '../view/edit-point.js';
// import TripPointView from '../view/trip-point.js';
import PointPresenter from './point.js';

import { render, RenderPosition } from '../view/utils.js/render.js';

class Events {
  constructor(eventsContainer) {
    this._eventsContainer = eventsContainer;

    this._eventsComponent = new EventListView();
    this._sortComponent = new SortingView();
    this._noEventComponent = new NoEventView();
  }

  init(waypoints) {
    this._waypoints = waypoints.slice();

    render(this._eventsContainer, this._eventsComponent, RenderPosition.BEFOREEND);

    this._renderEventsList();
  }

  _renderSort() {
    render(this._eventsComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(waypoint) {
    const pointPresenter = new PointPresenter(this._eventsComponent);
    pointPresenter.init(waypoint);
    // const tripPointView = new TripPointView(waypoint);
    // render(this._eventsComponent, tripPointView, RenderPosition.BEFOREEND);
    // const editTripPointView = new EditTripPointView(waypoint);

    // const onEscKeyDown = (evt) => {
    //   if(evt.key === 'Escape' || evt.key === 'Esc') {
    //     evt.preventDefault();
    //     replace(tripPointView, editTripPointView);
    //     document.removeEventListener('keydown', onEscKeyDown);
    //   }
    // };

    // editTripPointView.setSubmitHandler(() => {
    //   replace(tripPointView, editTripPointView);
    //   document.removeEventListener('keydown', onEscKeyDown);
    // });

    // tripPointView.setEditClickHandler(() =>{
    //   replace(editTripPointView, tripPointView);
    //   document.addEventListener('keydown', onEscKeyDown);
    // });

    // editTripPointView.setCloseFormHandler(() =>{
    //   replace(tripPointView, editTripPointView);
    //   document.removeEventListener('keydown', onEscKeyDown);
    // });
  }

  _renderNoEvents() {
    render(this._eventsContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _renderPoints() {
    this._waypoints.forEach((waypoint) => this._renderPoint(waypoint));
  }

  _renderEventsList() {
    if(this._waypoints.length === 0) {
      this._renderNoEvents();
      return;
    }
    this._renderSort();
    this._renderPoints();
  }
}

export  default Events;
