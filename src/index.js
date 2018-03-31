console.log('Hello Webpack')
// import $ from 'jquery';
let $ = require('expose-loader?$!jquery');
require('./i');
require('./css/index.css');
require('./css/less.less');
require('./css/sass.scss');
$('#app').html('app');
// let imgSrc = require('./images/002.jpg');
// let img = new Image();
// img.src = imgSrc;
// document.body.appendChild(img);