import './attributeFilter.css';

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

function createUI(fields, container) {
  let select = document.createElement('select');
  select.classList = ['attribute-filter-field'];
  container.append(select);

  fields.forEach(field => {
    let option = document.createElement('option');
    option.innerHTML = field;
    select.append(option);
  });

  let input = document.createElement('input');
  input.type = 'text';
  input.classList = ['attribute-filter'];
  container.append(input);

  return { input, select };
}

export function gl(opts, map, layers) {
  let layer = layers.filter(l => opts.layer === l.id)[0];

  function search(field, text) {
    if (field && text) {
      layer.setParams({ cql_filter: `${field} ILIKE '%${text}%'` });
    } else {
      delete layer.wmsParams.cql_filter;
      layer.setParams({});
    }
  }

  let url = `${layer._url}?service=wfs&version=1.1.0&request=DescribeFeatureType&typeName=${layer.options.layers}&outputFormat=application/json`;
  json(url).then(function (data) {
    let fields = data.featureTypes[0].properties.map(p => p.name);
    if (opts && opts.excludeFields) {
      fields = fields.filter(f => !opts.excludeFields.includes(f));
    }
    let { input, select } = createUI(fields, map.getContainer());

    select.addEventListener('click', e => e.stopPropagation());
    input.addEventListener('click', e => e.stopPropagation());
    input.addEventListener('mouseover', () => map.dragging.disable());
    input.addEventListener('mouseout', () => map.dragging.enable());
    input.addEventListener('keypress', function (e) {
      if (e.charCode === 13) search(select.value, input.value);
    });
  });
}
