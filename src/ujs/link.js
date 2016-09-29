import csrf from "./csrf";
import dom from "./dom";
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

  addParam(form, csrf.param, csrf.token);
  if(method != 'POST') addParam(form, csrf.method, method);

  document.body.appendChild(form);
  form.submit();
}

export default function(link, e) {
  var method = (link.getAttribute('ujs-method') || 'GET').toUpperCase();

  if(dom.isRemote(link)) {
    xhr(link.href, method, { target: link });
    return true;

  } else if(method != 'GET') {
    submit(link.href, method);
    return true;
  }

  return false;
}
