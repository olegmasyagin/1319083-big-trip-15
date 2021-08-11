import { sumCoast, startEventDay, endEventDay } from '../util.js';

export const createTripInfoTemplate = (waypoints) => {

  const waypointNames = new Array;
  for(const point of waypoints) {
    const waypointName = point.destination.name;
    waypointNames.push(waypointName);
  }
  const namePoints = waypointNames.join(' &mdash; ');

  let totalCoast = 0;
  for(const point of waypoints) {
    totalCoast = totalCoast + point.Offer.offers.map((offer) => offer.price).reduce(sumCoast, point.basePrice);
  }

  return `<section class="trip-main__trip-info  trip-info">
   <div class="trip-info__main">
     <h1 class="trip-info__title">${namePoints}</h1>
     <p class="trip-info__dates">${startEventDay(waypoints[0].dateFrom)}&nbsp;&mdash;&nbsp;${endEventDay(waypoints[waypoints.length -1].dateTo)}</p>
   </div>
   <p class="trip-info__cost">
     Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCoast}</span>
   </p>
 </section>`;
};
