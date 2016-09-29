import dom from "./ujs/dom";
import handleLinkClick from "./ujs/link";
import handleFormSubmit from "./ujs/form";
import xhr from "./ujs/xhr";
import csrf from "./ujs/csrf";

var UJS = {
  confirm: (message) => window.confirm(message),
  csrf: csrf,
  xhr: xhr
}

let askConfirmOn = (node) => node.hasAttribute('ujs-confirm') ? UJS.confirm(node.getAttribute('ujs-confirm')) : true

document.addEventListener('click', function(e) {
  // Only left click allowed. Firefox triggers click event on right click/contextmenu.
  if(e.button !== 0) return;

  var link = dom.acquireLink(e.target);
  if(!link) return;
  if(dom.isDisabled(link) || !askConfirmOn(link) || handleLinkClick(link)) {
    e.preventDefault();
  }
}, false);

document.addEventListener('submit', function(e) {
  var form = e.target;

  if(dom.isDisabled(form) || !askConfirmOn(form) || handleFormSubmit(form)) {
    e.preventDefault();
  }
});

document.addEventListener('load', function ujsInit() {
  // executes only once
  document.removeEventListener('load', ujsInit, false);
  // make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
  document.querySelectorAll('form input[name="' + csrf.param + '"]').forEach(function(input) {
    input.value = csrf.token;
  });
}, false);

export default UJS;
