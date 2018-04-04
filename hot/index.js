let base = require('./base');
let base2 = require('./base2');
document.querySelector('#app').innerHTML = base();
document.querySelector('#app2').innerHTML = base2();
require('./index.css');
if(module.hot){
    module.hot.accept('./base',function () {
        let base = require('./base');
        document.querySelector('#app').innerHTML = base();
    })
}