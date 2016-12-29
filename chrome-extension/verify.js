function addClass(el, className) {
    if (el.classList) {
        el.classList.add(className);
    } else {
        el.className += ' ' + className;
    }
}
// rel-me checking via indiewebify.me
var results = document.querySelectorAll('a[rel~="me"]'),
    url =  window.location.href,
    canon = document.querySelectorAll("link[rel~=canonical]");
if (canon[0]) {
    url = canon[0].href;
}
url = url.split('#')[0];
Array.prototype.forEach.call(results, function (link) {
    var relMeUrl = link.href,
        el = link;
    console.log(url, relMeUrl);
    // validate symmetric rels with request to /rel-me-links/
    if (relMeUrl.startsWith('http')) {
        var request = new XMLHttpRequest();
        request.open('GET', 'https://indiewebify.me/rel-me-links-info/?url1=' + encodeURIComponent(url) + '&url2=' + encodeURIComponent(relMeUrl), true);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                if (request.responseText === 'true') {
                    addClass(el, "verified");
                    el.insertAdjacentHTML('afterend', '<svg xmlns="http://www.w3.org/2000/svg" width="1em" style="vertical-align:text-bottom" viewbox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="green" stroke="lightgreen" stroke-width="3"/><path d="M 10,20 18,28 33,14" fill="none" stroke="white" stroke-width="6"/></svg>');
                } else {
                    addClass(el, "unverified");
                    el.insertAdjacentHTML('afterend', '<svg xmlns="http://www.w3.org/2000/svg" width="1em" style="vertical-align:text-bottom"  viewbox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="darkred" stroke="red" stroke-width="3"/><path d="M 10,10 30,30 M 10,30 30,10" fill="none" stroke="white" stroke-width="6"/></svg>');
                }
            }
        };
        request.send();
    }
});
// Balloon easter egg
// Use the local time of the client to show based on the timezone of the viewer
var now = new Date();
var bday = document.querySelectorAll('time.dt-bday');
if (bday[0]) {
  var bdaystring = bday[0].getAttribute('datetime');
  var bdate = new Date(bdaystring);
  if(now.getMonth() == bdate.getMonth() // 0-indexed, 11 is december
    && now.getDate() == bdate.getDate()+1) {
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
