
function execCopy (event) {
  const code = event.target.previousSibling.innerText
  if(navigator.clipboard){
    console.log('OK')
    navigator.clipboard.writeText(code);
  }
  // console.log('Copy Fired', event.target.innerText)
  // const input = document.createElement('input');
  // input.setAttribute('id', 'copyinput');
  // document.body.appendChild(input);
  // input.value = code;
  // input.select();
  // document.execCommand('copy');
  // document.body.removeChild(input);
}