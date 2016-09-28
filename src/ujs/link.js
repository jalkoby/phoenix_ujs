import xhr from "./xhr";

function addParam(form, name, value) {
  var input = document.createElement('input');
  input.setAttribute('type', 'hidden');
  input.setAttribute('name', name);
  input.setAttribute('value', value);
  form.appendChild(input);
}

function submit(url, method) {
  var form = document.createElement('form');
  form.method = 'POST';
  form.action = url;
  form.style.display = 'none';

  addParam(form, UJS.csrf.param, UJS.csrf.token);
  if(method != 'POST') addParam(form, '_method', method);

  document.body.appendChild(form);
  form.submit();
}

module.exports = function(link, e) {
  var method = link.getAttribute('ujs-method') || 'GET',
    isRemote = link.getAttribute('ujs-remote');

  if(isRemote) {
    xhr(link.href, method, { target: link });
    return true;

  } else if(method != 'GET') {
    submit(link.href, method);
    return true;
  }

  return false;
}
