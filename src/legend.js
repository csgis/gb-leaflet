import L from 'leaflet';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import 'alertifyjs/build/css/themes/bootstrap.css';
import './legend.css';

alertify.defaults.transition = 'slide';
alertify.defaults.theme.ok = 'btn btn-primary';
alertify.defaults.theme.cancel = 'btn btn-danger';
alertify.defaults.theme.input = 'form-control';

const DEFAULT_MESSAGES = {
  title: 'Legend'
};

function getLegendHtml(layer) {
  let url = layer._url +
    '?SERVICE=WMS' +
    '&VERSION=1.1.0' +
    '&REQUEST=GetLegendGraphic' +
    '&FORMAT=image/png' +
    '&STYLE=' +
    '&LAYER=' + layer.options.layers;
  return `<div class="gb-legend"><img src="${url}"><text>${layer.name}</text></div>`;
}

export function gl(opts, map, layers) {
  let messages = Object.assign({}, DEFAULT_MESSAGES, opts ? opts.messages : {});

  var div = document.createElement('div');
  div.innerHTML = layers.filter(l => l instanceof L.TileLayer.WMS).map(getLegendHtml).join('');

  return LeafletToolbar.ToolbarAction.extend({ // eslint-disable-line no-undef
    options: {
      toolbarIcon: {
        className: 'toolbar-button-legend',
        tooltip: messages.title
      }
    },

    addHooks: () => alertify.alert().setting({
      title: 'Legend',
      modal: false,
      pinnable: false,
      message: div,
      transition: null
    }).show()
  });
}
