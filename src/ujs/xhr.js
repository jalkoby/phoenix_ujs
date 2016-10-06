import csrf from "./csrf";

function noop() {};

function runEvent(target, name, data) {
  var event = document.createEvent('Event');
  event.initEvent(name, true, true);
  event.data = data;
  return target.dispatchEvent(event);
}

function setXHRData(xhr, data, type) {
  if(type == 'json') {
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    data = (data === undefined) ? {} : data;
    return JSON.stringify(data);

  } else if(type == 'text') {
    xhr.setRequestHeader('Content-type', 'text/plain');
    xhr.setRequestHeader('Accept', 'text/plain');
    return data;

  } else if(typeof type == 'object') {
    xhr.setRequestHeader('Content-type', type[0]);
    xhr.setRequestHeader('Accept', type[1]);
    return data;

  } else {
    return data;
  }
}

export default function(url, method, options) {
  options = options || {};

  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('X-Requested-With', 'XmlHttpRequest');
  xhr.setRequestHeader(csrf.header, csrf.token);

  let headers = options.headers || {};
  Object.keys(headers).forEach(k => xhr.setRequestHeader(k, headers[k]));
  var target = options.target || document;
  if(!runEvent(target, 'ajax:beforeSend', { xhr: xhr, options: options })) return;

  var onSuccess = options.success || noop,
    onError = options.error || noop,
    onComplete = options.complete || noop;

  xhr.addEventListener('load', function () {
    if(xhr.status >= 200 && xhr.status < 300) {
      runEvent(target, 'ajax:success', { xhr: xhr });
      onSuccess(xhr);
    } else if(xhr.status < 200 || xhr.status >= 400) {
      runEvent(target, 'ajax:error', { xhr: xhr });
      onError(xhr);
    }

    runEvent(target, 'ajax:complete', { xhr: xhr });
    onComplete(xhr);
  });

  xhr.send(setXHRData(xhr, options.data, options.type));

  return xhr;
}
