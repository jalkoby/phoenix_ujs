import xhr from "./xhr";

module.exports = function(form) {
  if(form.getAttribute('ujs-remote')) {
    xhr(form.action, form.method, { target: form, data: new FormData(form) });
    return true;
  }
  return false;
}
