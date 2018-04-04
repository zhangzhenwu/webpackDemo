var rea = require('./b.js');
// import React from 'react';
// import ReactDOM from 'react-dom';
// import ajax from 'ajax'
// ReactDOM.render(<h1>{rea}</h1>, document.getElementById('re'));
console.log(rea.default);
document.getElementById('re').innerHTML=rea.default;
if(module.hot){
    module.hot.accept('./b.js',function () {
        var rea = require('./b.js');
        document.getElementById('re').innerHTML=rea.default;
    })
}