var csrf = {
  header: 'x-csrf-token',
  method: '_method',
  param: '_csrf_token',
  token: null
};

let csrfNode = document.head.querySelector('meta[name="csrf-token"]');
if(csrfNode) {
  csrf.token = csrfNode.getAttribute('content');
  if(csrfNode.hasAttribute('csrf-param')) csrf.param = csrfNode.getAttribute('csrf-param');
  if(csrfNode.hasAttribute('csrf-header')) csrf.header = csrfNode.getAttribute('csrf-header');
  if(csrfNode.hasAttribute('method-param')) csrf.method = csrfNode.getAttribute('method-param');
} else if(console) {
  console.log('[phoenix_ujs] `meta[name="csrf-token"]` is missing. Please add it into the page');
}

export default csrf;
