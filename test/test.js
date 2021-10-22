location.hash = 'dddd'
location.hash = 'eeee'
window.addEventListener('hashchange', e => {
  console.log(e);
})