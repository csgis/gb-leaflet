import 'leaflet-timedimension/dist/leaflet.timedimension.src';
import L from 'leaflet';

export function gl(opts, map) {
  let added = false;
  map.timeDimension.on('availabletimeschanged', e => {
    console.log(e.availableTimes);
    if (!added && e.availableTimes.length) {
      L.control.timeDimension().addTo(map);
      added = true;
    }
  });
}
