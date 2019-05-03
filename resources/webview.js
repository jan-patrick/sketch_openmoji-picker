// disable the context menu to have a more native feel
document.addEventListener('contextmenu', (e) => {
  e.preventDefault()
})

document.addEventListener("click", event => {
  window.postMessage('nativeLog', 'hi')
  var t = document.getElementById("iframeId").contentWindow.location.href
  window.postMessage('nativeLog', t)
})

//document.getElementById("iframeId").document.addEventListener("click", event => {
//  window.postMessage('nativeLog', 'clicked on iFrame')
//})

// call the plugin from the webview
document.getElementById('button').addEventListener('click', () => {
  window.postMessage('nativeLog', 'Called from the webview')
})

// call the wevbiew from the plugin
window.setRandomNumber = (randomNumber) => {
  document.getElementById('answer').innerHTML = 'Random number from the plugin: ' + randomNumber
}
