import xhr from "./xhr";
import dom from "./dom";

const QUERY_METHODS = ['GET', 'HEAD'];
const toQuery = data => Array.from(data).map(e => encodeURIComponent(e[0]) + "=" + encodeURIComponent(e[1])).join('&');

export default function(form) {
  if(dom.isRemote(form)) {
    let url;
    let data = new FormData(form);
    let options = { target: form };
    if(QUERY_METHODS.indexOf(form.method.toUpperCase()) === -1) {
      url = form.action;
      options.data = data;
    } else {
      url = form.action + (form.action.indexOf('?') === -1 ? '?' : '&') + toQuery(data);
    }

    xhr(url, form.method, options);
    return true;
  }
  return false;
}
