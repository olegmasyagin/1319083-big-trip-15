import SortingView from '../view/sorting.js';
import EventListView from '../view/trip-events-list.js';
import NoEventView from '../view/no-event.js';
import PointPresenter from './point.js';
import { updateItem } from '../view/utils.js/common.js';

import { remove, render, RenderPosition } from '../view/utils.js/render.js';
import {sortByPrice, sortByTime} from '../view/utils.js/points.js';
import {SortType} from '../data.js';

class Events {
  constructor(eventsContainer) {
    this._eventsContainer = eventsContainer;
    this._pointPresenter = new Map();
    this._currentSortType = SortType.DAY;

    this._eventsComponent = new EventListView();
    this._sortComponent = new SortingView(this._currentSortType);
    this._noEventComponent = new NoEventView();

    this._pointChangeHandler = this._pointChangeHandler.bind(this);
    this._modeChangeHandler = this._modeChangeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  init(waypoints) {
    this._waypoints = waypoints.slice();
    this._sourcedWaypoints = waypoints.slice();

    render(this._eventsContainer, this._eventsComponent, RenderPosition.BEFOREEND);

    this._renderEventsList();
  }

  _modeChangeHandler() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _pointChangeHandler(updatedPoint) {
    this._points = updateItem(this._waypoints, updatedPoint);
    this._sourcedWaypoints = updateItem(this._sourcedWaypoints, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this._waypoints.sort(sortByPrice);
        break;
      case SortType.TIME:
        this._waypoints.sort(sortByTime);
        break;
      default:
        this._waypoints = this._sourcedWaypoints.slice();
    }
    this._currentSortType = sortType;
  }

  _sortTypeChangeHandler(sortType) {
    if(this._currentSortType === sortType) {
      return;
    }
    this._sortPoints(sortType);
    this._clearPoints();
    this._renderEventsList();
  }

  _renderSort() {
    this._sortComponent = new SortingView(this._currentSortType);
    render(this._eventsComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }

  _renderPoint(waypoint) {
    const pointPresenter = new PointPresenter(this._eventsComponent, this._pointChangeHandler, this._modeChangeHandler);
    pointPresenter.init(waypoint);
    this._pointPresenter.set(waypoint.id, pointPresenter);
  }

  _clearPoints() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
    remove(this._sortComponent);
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
