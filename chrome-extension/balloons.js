
// Balloon easter egg
// Use the local time of the client to show based on the timezone of the viewer
var now = new Date();
var bday = document.querySelectorAll('time.dt-bday');
if (bday[0]) {
  var bdaystring = bday[0].getAttribute('datetime');
  var bdate = new Date(bdaystring);
  if(now.getMonth() == bdate.getMonth() // 0-indexed, 11 is december
    && now.getDate() == bdate.getDate()) {
    setTimeout(vme_show_balloons, 1000);
  }
}

/*
Float Up Drifter - JavaScript
Adapted from www.rainbow.arch.scriptmania.com/scripts/index.html
*/
function vme_show_balloons(){
var d = document.createElement("div");
d.innerHTML =  '<div class="balloon"><div><span>🎂</span></div><div><span>'+ now.getDate() +'</span></div><div><span>🎉</span></div><div><span>'+ now.getMonth() +'</span></div></div>';
document.body.appendChild(d);

}
