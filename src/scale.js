import L from 'leaflet';
import 'leaflet-switch-scale-control';
import 'leaflet-switch-scale-control/src/L.Control.SwitchScaleControl.css';
import humanformat from 'human-format';

export function gl(opts, map) {
  if (opts.bar !== false) L.control.scale().addTo(map);
  if (opts.text !== false) {
    new L.Control.SwitchScaleControl({
      recalcOnZoomChange: true,
      recalcOnPositionChange: true,
      render: ratio => '1 : ' + humanformat(ratio)
    }).addTo(map);
  }
}
