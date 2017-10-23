import WMS from 'leaflet.wms';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import './legend.css';

const DEFAULT_MESSAGES = {
  title: 'Legend'
};

function getLegendHtml(layer) {
  let url = layer._source._url +
    '?SERVICE=WMS' +
    '&VERSION=1.1.0' +
    '&REQUEST=GetLegendGraphic' +
    '&FORMAT=image/png' +
    '&STYLE=' +
    '&LAYER=' + layer._name;
  return `<div><text>${layer.name}</text><img src="${url}"</div>`;
}

export function gl(opts, map, layers) {
  let messages = Object.assign({}, DEFAULT_MESSAGES, opts ? opts.messages : {});

  var div = document.createElement('div');
  div.innerHTML = layers.filter(l => l instanceof WMS.Layer).map(getLegendHtml).join('');

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
