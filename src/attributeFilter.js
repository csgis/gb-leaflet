/* eslint-disable new-cap */

import './attributeFilter.css';
import Awesomplete from 'awesomplete';
import L from 'leaflet';
import 'awesomplete/awesomplete.css';

function json(url) {
  return new Promise(function (resolve) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.onload = function (r) {
      let data = r.currentTarget.response || r.target.responseText;
      resolve(JSON.parse(data));
    };
    xhr.send();
  });
}

function createUI(layers, parent) {
  // Container
  let container = document.createElement('div');
  container.classList = ['attribute-filter-container'];
  parent.append(container);

  // Select layer
  let selectLayer = document.createElement('select');
  selectLayer.classList = ['attribute-filter-layer'];


  layers.forEach(layer => {
    let option = document.createElement('option');
    option.innerHTML = layer.name;
    option.value = layer.id;
    selectLayer.append(option);
  });

  // Select field
  let selectField = document.createElement('select');
  selectField.classList = ['attribute-filter-field'];

  // Input
  let input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter (list of) filter values.';
  input.classList = ['attribute-filter', 'dropdown-input'];

  container.append(selectLayer);
  container.append(selectField);
  container.append(input);

  let awesomplete = new Awesomplete(input, {
    filter: function (text, i) {
      return Awesomplete.FILTER_CONTAINS(text, i.match(/[^,]*$/)[0]);
    },

    item: function (text, i) {
      return Awesomplete.ITEM(text, i.match(/[^,]*$/)[0]);
    },

    replace: function (text) {
      let before = this.input.value.match(/^.+,\s*|/)[0];
      this.input.value = before + text + ', ';
    }
  });

  return { selectField, selectLayer, awesomplete };
}

export function bricjs(opts, map, layers) {
  if (!opts.parent) return;

  let layer;
  let fieldValues = {};
  let filteredLayers = layers.filter(l => opts.layers.includes(l.id));

  let { selectField, selectLayer, awesomplete } = createUI(filteredLayers, opts.parent);
  resetSelectField();
  if (filteredLayers.length < 2) selectLayer.style.display = 'none';
  let input = awesomplete.input;

  [input.parentNode, selectLayer, selectField, input].forEach(c => {
    c.addEventListener('click', e => e.stopPropagation());
    c.addEventListener('dblclick', e => e.stopPropagation());
  });
  input.addEventListener('mouseover', () => map.dragging.disable());
  input.addEventListener('mouseout', () => map.dragging.enable());

  input.addEventListener('keypress', function (e) {
    if (e.which === 13) search();
  });
  input.addEventListener('awesomplete-selectcomplete', search);
  selectLayer.addEventListener('change', updateFields);
  selectField.addEventListener('change', updateAutocomplete);

  function wfs(request, query) {
    let paramStart = layer._url.indexOf("access_token") > -1 ? '&' : '?';
    let url = encodeURIComponent(`${layer._url}${paramStart}service=wfs&version=1.1.0&request=${request}&typeName=${layer.options.layers}&outputFormat=application/json`);
    let proxy = `/proxy/?url=${url}`;
    return json(proxy);
  }

  function search() {
    if (selectField.value && input.value) {
      layer.setParams({
        cql_filter: input.value.split(',')
          .map(v => v.trim())
          .filter(v => v.length > 0)
          .map(v => `${selectField.value}='${v}'`)
          .join(' OR ')
      });
    } else {
      delete layer.wmsParams.cql_filter;
      layer.setParams({});
    }
  }

  function resetSelectField() {
    selectField.innerHTML = '';
    let placeholder = document.createElement('option');
    placeholder.innerHTML = 'Choose attribute field to filter';
    placeholder.disabled = true;
    placeholder.selected = true;
    selectField.append(placeholder);
  }

  function updateFields() {
    if (layer && layer.wmsParams) {
      delete layer.wmsParams.cql_filter;
      layer.setParams({});
    }

    let selectedOption = selectLayer.options[selectLayer.selectedIndex];
    layer = layers.filter(l => l.id === selectedOption.value)[0];

    function setOptions(data) {
      let fields = data.featureTypes[0].properties.map(p => p.name);
      if (opts && opts.excludeFields) {
        fields = fields.filter(f => !opts.excludeFields.includes(f));
      }

      resetSelectField();
      fields.forEach(field => {
        let option = document.createElement('option');
        option.innerHTML = field;
        selectField.append(option);
      });
    }

    if (layer instanceof L.TimeDimension.Layer) {
      let timeLayer = layer;
      layer._timeDimension.on('timeload', function () {
        timeLayer.setOpacity(0);
        layer = timeLayer._currentLayer;
        let value = selectField.value;
        wfs('DescribeFeatureType').then(data => {
          setOptions(data);
          selectField.value = value;
          updateAutocomplete();
          search();
          timeLayer.setOpacity(1);
        });
      });
      layer = timeLayer._currentLayer;
    }
    wfs('DescribeFeatureType').then(data => {
      setOptions(data);
      updateAutocomplete();
    });
  }

  function updateAutocomplete() {
    let field = selectField.value;
    if (!field) return;
    if (fieldValues[field]) {
      awesomplete.list = fieldValues[field];
    } else {
      awesomplete.list = [];
      wfs('GetFeature', `propertyName=${field}`).then(function (data) {
        if (!data.features) return;
        fieldValues[field] = awesomplete.list = data.features
          .map(f => f.properties[field])
          .filter(function (item, pos, self) {
            return item !== null && self.indexOf(item) === pos;
          });
      });
    }
  }

  updateFields();
}
