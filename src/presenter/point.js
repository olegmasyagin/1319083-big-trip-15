import TripPointView from '../view/trip-point.js';
import EditTripPointView from '../view/edit-point.js';
import { render, RenderPosition, replace } from '../view/utils.js/render.js';

class Point {
  constructor(pointContainer) {
    this._pointContainer = pointContainer;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._closeFormHandler = this._closeFormHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(waypoint) {
    this._waypoint = waypoint;

    this._pointComponent = new TripPointView(waypoint);
    this._pointEditComponent = new EditTripPointView(waypoint);

    this._pointComponent.setEditClickHandler(this._editClickHandler);
    this._pointEditComponent.setSubmitHandler(this._submitHandler);
    this._pointEditComponent.setCloseFormHandler(this._closeFormHandler);

    render(this._pointContainer, this._pointComponent, RenderPosition.BEFOREEND);
  }

  _replacePointToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToPoint();
    }
  }

  _editClickHandler() {
    this._replacePointToForm();
  }

  _submitHandler() {
    this._replaceFormToPoint();
  }

  _closeFormHandler() {
    this._replaceFormToPoint();
  }
}


export default Point;

