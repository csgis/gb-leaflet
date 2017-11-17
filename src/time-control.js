import 'leaflet-timedimension/dist/leaflet.timedimension.src';
import L from 'leaflet';

export function bricjs(opts, map) {
  let added = false;
  map.timeDimension.on('availabletimeschanged', e => {
    if (!added && e.availableTimes.length) {
      L.control.timeDimension(opts).addTo(map);
      added = true;
    }
  });
}
