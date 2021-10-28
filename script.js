// get Colours
var mainColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color');
var bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-color');
var headColor = '#F1A5FF';
let appleColor = '#FFA7A5';

// Initialize canvas
var c = document.querySelector('canvas'); // change to get by ID, later
c.width = parseInt(getComputedStyle(document.getElementById('canvas-container')).getPropertyValue('width'));
c.height = parseInt(getComputedStyle(document.getElementById('canvas-container')).getPropertyValue('height'));
var ctx = c.getContext('2d');
ctx.fillStyle = mainColor;
var unit = c.width/40;
// ctx.fillRect(unit, unit, unit, unit);