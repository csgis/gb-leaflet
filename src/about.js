import 'leaflet-toolbar';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
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

export default function (opts) {
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
