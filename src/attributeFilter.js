import './attributeFilter.css';
import Awesomplete from 'awesomplete';
import 'awesomplete/awesomplete.css';

function json(url) {
  return new Promise(function (resolve) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function (r) {
      let data = r.currentTarget.response || r.target.responseText;
      resolve(JSON.parse(data));
    };
    xhr.send();
  });
}

function createUI(fields, parent) {
  let container = document.createElement('div');
  container.classList = ['attribute-filter-container'];
  parent.append(container);

  let select = document.createElement('select');
  select.classList = ['attribute-filter-field'];

  fields.forEach(field => {
    let option = document.createElement('option');
    option.innerHTML = field;
    select.append(option);
  });

  let input = document.createElement('input');
  input.type = 'text';
  input.classList = ['attribute-filter', 'dropdown-input'];

  container.append(select);
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
  return { select, awesomplete };
}

export function gl(opts, map, layers) {
  let layer = layers.filter(l => opts.layer === l.id)[0];
  let awesomplete;
  let input;
  let select;
  let fieldValues = {};

  function wfs(request, query) {
    let url = `${layer._url}?service=wfs&version=1.1.0&request=${request}&typeName=${layer.options.layers}&outputFormat=application/json`;
    if (query) url += `&${query}`;
    return json(url);
  }

  function search() {
    if (select.value && input.value) {
      layer.setParams({
        cql_filter: input.value.split(',')
          .map(v => v.trim())
          .filter(v => v.length > 0)
          .map(v => `${select.value} ILIKE '%${v}%'`)
          .join(' OR ')
      });
    } else {
      delete layer.wmsParams.cql_filter;
      layer.setParams({});
    }
  }

  function updateAutocomplete() {
    let field = select.value;
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

  wfs('DescribeFeatureType').then(function (data) {
    let fields = data.featureTypes[0].properties.map(p => p.name);
    if (opts && opts.excludeFields) {
      fields = fields.filter(f => !opts.excludeFields.includes(f));
    }

    ({ select, awesomplete } = createUI(fields, map.getContainer()));
    input = awesomplete.input;

    [input.parentNode, select, input].forEach(c => {
      c.addEventListener('click', e => e.stopPropagation());
      c.addEventListener('dblclick', e => e.stopPropagation());
    });
    input.addEventListener('mouseover', () => map.dragging.disable());
    input.addEventListener('mouseout', () => map.dragging.enable());

    input.addEventListener('keypress', function (e) {
      if (e.charCode === 13) search();
    });
    input.addEventListener('awesomplete-selectcomplete', search);
    select.addEventListener('change', updateAutocomplete);

    updateAutocomplete();
  });
}
