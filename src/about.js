import 'leaflet';
import 'leaflet-toolbar';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import 'alertifyjs/build/css/themes/bootstrap.css';
import './about.css';

const DEFAULT_MESSAGES = {
  title: 'About this map',
  message: `<h1>Title<h1>
<div>My title</div>
<h2>Description</h2>
<div>My description</div>
<h2>Contact</h2>
<div>My contact</div>`
};

alertify.defaults.transition = 'slide';
alertify.defaults.theme.ok = 'btn btn-primary';
alertify.defaults.theme.cancel = 'btn btn-danger';
alertify.defaults.theme.input = 'form-control';

export function bricjs(opts) {
  let messages = Object.assign({}, DEFAULT_MESSAGES, opts ? opts.messages : {});

  return LeafletToolbar.ToolbarAction.extend({ // eslint-disable-line no-undef
    options: {
      toolbarIcon: {
        className: 'toolbar-button-about',
        tooltip: messages.title
      }
    },

    addHooks: function () {
      alertify.alert().setting({
        title: messages.title,
        modal: false,
        pinnable: false,
        message: messages.message,
        transition: null
      }).show();
    }
  });
}
