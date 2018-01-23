import 'leaflet-timedimension/dist/leaflet.timedimension.src';
import './time-control.css';
import L from 'leaflet';

export function bricjs(opts, map) {
  let added = false;

  map.timeDimension.on('availabletimeschanged', e => {
    if (!added && e.availableTimes.length) {
      added = true;

      let control = L.control.timeDimension(opts);
      map.addControl(control);

      let getCurrentTime = map.timeDimension.getCurrentTime;

      let container = control._container;
      let controls = Array.from(container.childNodes)
        .filter(elem => !elem.classList.contains('disabled'));
      controls.push(container);

      let button = document.createElement('a');
      button.classList.add('leaflet-control-timecontrol');
      button.classList.add('time-control-power');
      button.addEventListener('click', function () {
        if (button.classList.contains('disabled')) {
          map.timeDimension.getCurrentTime = getCurrentTime;
          map.timeDimension.setCurrentTime(Date.now());
          controls.map(elem => (elem.style.visibility = 'visible'));
        } else {
          map.timeDimension.getCurrentTime = () => null;
          map.timeDimension.fire('timeload', 0);
          controls.map(elem => (elem.style.visibility = 'hidden'));
        }

        button.classList.toggle('disabled');
      });

      container.appendChild(button);
    }
  });
}
