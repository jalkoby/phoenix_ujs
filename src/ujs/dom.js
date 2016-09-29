var isMatched = (function() {
  return Element.prototype.matches ||
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function() { return false }
})();

const stopLinkTags = ['DIV', 'FORM', 'BODY', 'TD', 'TR', 'LI', 'UL'];

function parentLink(node) {
  if(node.tagName == 'A') return node;
  else if(stopLinkTags.indexOf(node.tagName) >= 0) return;
  else return parentLink(node.parentNode);
}

export default {
  acquireLink: function(node) {
    var link = parentLink(node);
    if(link && isMatched.call(link, '[ujs-method], [ujs-remote]')) return link;
  },
  isDisabled: node => isMatched.call(node, '[disabled]'),
  isRemote: node => node.hasAttribute('ujs-remote') && node.getAttribute('ujs-remote') != 'false'
};
