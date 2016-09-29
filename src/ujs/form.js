import xhr from "./xhr";
import dom from "./dom";

export default function(form) {
  if(dom.isRemote(form)) {
    xhr(form.action, form.method, { target: form, data: new FormData(form) });
    return true;
  }
  return false;
}
