import L from 'leaflet';
import 'leaflet-switch-scale-control';
import 'leaflet-switch-scale-control/src/L.Control.SwitchScaleControl.css';
import humanformat from 'human-format';

export function bricjs(opts = {}, map) {
  if (opts.bar !== false) L.control.scale().addTo(map);
  if (opts.text !== false) {
    new L.Control.SwitchScaleControl({
      recalcOnZoomChange: true,
      recalcOnPositionChange: true,
      ratioCustomItemText: '1: Custom scale',
      render: ratio => '1 : ' + humanformat(ratio)
    }).addTo(map);
  }
}
