import L from 'leaflet';
import 'leaflet-measure/dist/leaflet-measure';
import 'leaflet-measure/dist/leaflet-measure.css';
import './measure.css';

const DEFAULT_OPTS = {
  position: 'topleft',
  primaryLengthUnit: 'kilometers',
  secondaryLengthUnit: 'meters',
  primaryAreaUnit: 'hectares',
  secondaryAreaUnit: 'sqmeters'
};

export function gl(opts, map) {
  return L.control.measure(Object.assign({}, DEFAULT_OPTS, opts)).addTo(map);
}
