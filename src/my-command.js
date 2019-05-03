import BrowserWindow from 'sketch-module-web-view'
import UI from 'sketch/ui'
var DataSupplier = require('sketch/data-supplier')

export function openWindowToAddOpenMoji() {
  const options = {
    identifier: 'com.github.jan-patrick.sketch_artboard-history.id',
    width: 1100,
    height: 650,
    show: false
  }

  const browserWindow = new BrowserWindow(options)

  // only show the window when the page has loaded
  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  const webContents = browserWindow.webContents

  // print a message when the page loads
  webContents.on('did-finish-load', () => {
    //UI.message('UI loaded!')
  })

  // add a handler for a call from web content's javascript
  webContents.on('nativeLog', s => {
    UI.message(s)
    webContents
      //.executeJavaScript(`setRandomNumber(${Math.random()})`)
      .catch(console.error)
  })
  browserWindow.loadURL(require('../resources/webview.html'))

  let contents = browserWindow.webContents
  //UI.alert('what i gdot', JSON.stringify(contents))

}

export function onStartup () {
  // To register the plugin, uncomment the relevant type:
  //DataSupplier.registerDataSupplier('public.text', '{{ name }}', 'SupplyData')
  DataSupplier.registerDataSupplier('public.image', 'OpenMoji Picker', 'SupplyData')
}

export function onShutdown () {
  // Deregister the plugin
  DataSupplier.deregisterDataSuppliers()
}

export function onSupplyData (context) {
  let dataKey = context.data.key
  const items = util.toArray(context.data.items).map(sketch.fromNative)
  items.forEach((item, index) => {
    let data = Math.random().toString()
    DataSupplier.supplyDataAtIndex(dataKey, data, index)
  })
}
