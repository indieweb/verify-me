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
    && now.getDate() == bdate.getDate()) {
    setTimeout(vme_show_balloons, 1000);
  }
}

/*
Float Up Drifter - JavaScript
Adapted from www.rainbow.arch.scriptmania.com/scripts/index.html
*/
function vme_show_balloons(){
  // Configure below - change number of images to render
  var no = 8; 
  // Configure speed below
  var speed = 20;   // The smaller the number, the faster the movement
  
  var iterations = 1000; // number of times to do it

  var floatr = new Array();
  floatr[0] = "data:image/gif;base64,R0lGODlhIAAgALMAAAAAAP8AAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAIALAAAAAAgACAAQARkUMhJZ7i36i2zwGCIcZVoimRqpuxorWx3zm5Mh3F7Abl6Bz0ZUEizZX44HxKlW9ZyyGAKwJNKq9bSKUscdr1Qz6cYHi6NZmdzrFY6n5t30t1Gn4N164wbF/M1cH8aWIIbhCQRAAA7"
  floatr[1] = "data:image/gif;base64,R0lGODlhIAAgALMAAAAAAAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAIALAAAAAAgACAAQARkUMhJZ7i36i2zwGCIcZVoimRqpuxorWx3zm5Mh3F7Abl6Bz0ZUEizZX44HxKlW9ZyyGAKwJNKq9bSKUscdr1Qz6cYHi6NZmdzrFY6n5t30t1Gn4N164wbF/M1cH8aWIIbhCQRAAA7"
  floatr[2] = "data:image/gif;base64,R0lGODlhIAAgALMAAAAAAAC3AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAIALAAAAAAgACAAQARkUMhJZ7i36i2zwGCIcZVoimRqpuxorWx3zm5Mh3F7Abl6Bz0ZUEizZX44HxKlW9ZyyGAKwJNKq9bSKUscdr1Qz6cYHi6NZmdzrFY6n5t30t1Gn4N164wbF/M1cH8aWIIbhCQRAAA7"
  floatr[3] = "data:image/gif;base64,R0lGODlhIAAgALMAAAAAAP//AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAIALAAAAAAgACAAQARkUMhJZ7i36i2zwGCIcZVoimRqpuxorWx3zm5Mh3F7Abl6Bz0ZUEizZX44HxKlW9ZyyGAKwJNKq9bSKUscdr1Qz6cYHi6NZmdzrFY6n5t30t1Gn4N164wbF/M1cH8aWIIbhCQRAAA7"
  floatr[4] = "data:image/gif;base64,R0lGODlhIAAgALMAAAAAAKlT/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAIALAAAAAAgACAAQARkUMhJZ7i36i2zwGCIcZVoimRqpuxorWx3zm5Mh3F7Abl6Bz0ZUEizZX44HxKlW9ZyyGAKwJNKq9bSKUscdr1Qz6cYHi6NZmdzrFY6n5t30t1Gn4N164wbF/M1cH8aWIIbhCQRAAA7"
  floatr[5] = "data:image/gif;base64,R0lGODlhIAAgALMAAAAAAP+SJP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAIALAAAAAAgACAAQARkUMhJZ7i36i2zwGCIcZVoimRqpuxorWx3zm5Mh3F7Abl6Bz0ZUEizZX44HxKlW9ZyyGAKwJNKq9bSKUscdr1Qz6cYHi6NZmdzrFY6n5t30t1Gn4N164wbF/M1cH8aWIIbhCQRAAA7"
  floatr[6] = "data:image/gif;base64,R0lGODlhIAAgALMAAAAAAP+AwP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAIALAAAAAAgACAAQARkUMhJZ7i36i2zwGCIcZVoimRqpuxorWx3zm5Mh3F7Abl6Bz0ZUEizZX44HxKlW9ZyyGAKwJNKq9bSKUscdr1Qz6cYHi6NZmdzrFY6n5t30t1Gn4N164wbF/M1cH8aWIIbhCQRAAA7"
  floatr[7] = "data:image/gif;base64,R0lGODlhIAAgALMAAAAAAAD//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAIALAAAAAAgACAAQARkUMhJZ7i36i2zwGCIcZVoimRqpuxorWx3zm5Mh3F7Abl6Bz0ZUEizZX44HxKlW9ZyyGAKwJNKq9bSKUscdr1Qz6cYHi6NZmdzrFY6n5t30t1Gn4N164wbF/M1cH8aWIIbhCQRAAA7"

  var ns4up = (document.layers) ? 1 : 0;  // browser sniffer
  var ie4up = (document.all) ? 1 : 0;
  var ns6up = (document.getElementById&&!document.all) ? 1 : 0;
  var dx, xp, yp;    // coordinate and position variables
  var am, stx, sty;  // amplitude and step variables
  var i, doc_width = 800, doc_height = 1800;

  if (ns4up||ns6up) {
    doc_width = self.innerWidth;
    doc_height = self.innerHeight;
  } else if (ie4up) {
    doc_width = document.body.clientWidth;
    doc_height = document.body.clientHeight;
  }

  dx = new Array();
  xp = new Array();
  yp = new Array();
  am = new Array();
  stx = new Array();
  sty = new Array();
  j = 0;

  for (i = 0; i < no; ++ i) {
    dx[i] = 0;                        // set coordinate variables
    xp[i] = Math.random()*(doc_width-50);  // set position variables
    yp[i] = Math.random()*doc_height;
    am[i] = Math.random()*20;         // set amplitude variables
    stx[i] = 0.02 + Math.random()/10; // set step variables
    sty[i] = 0.7 + Math.random();     // set step variables
    if (ns4up) {                      // set layers
      if (i == 0) {
        document.write("<layer name=\"dot"+ i +"\" left=\"15\" top=\"15\" visibility=\"show\"><img src=\""+ floatr[j] + "\" border=\"0\"></layer>");
      } else {
        document.write("<layer name=\"dot"+ i +"\" left=\"15\" top=\"15\" visibility=\"show\"><img src=\""+ floatr[j] + "\" border=\"0\"></layer>");
      }
    } else if (ie4up||ns6up) {                
      if (i == 0) {
        document.write("<div id=\"dot"+ i +"\" style=\"position: absolute; Z-INDEX: "+(2000+i)+"; visibility: visible; top: 15px; left: 15px;\"><img src=\"" + floatr[j] + "\" border=\"0\"></div>");
      } else {
        document.write("<div id=\"dot"+ i +"\" style=\"position: absolute; Z-INDEX: "+(2000+i)+"; visibility: visible; top: 15px; left: 15px;\"><img src=\"" + floatr[j] + "\" border=\"0\"></div>");
      }
    }
    if (j == (floatr.length-1)) { 
      j = 0; 
    } else { 
      j += 1; 
    }
  }

  function vme_driftup() {
    for (i = 0; i < no; ++ i) {
      yp[i] -= sty[i];
      if (yp[i] < -50) {
        xp[i] = Math.random()*(doc_width-am[i]-30);
        yp[i] = doc_height;
        stx[i] = 0.02 + Math.random()/10;
        sty[i] = 0.7 + Math.random();
        doc_width = ns6up?window.innerWidth-5:document.body.clientWidth;
        doc_height = ns6up?window.innerHeight-5:document.body.clientHeight;
      }
      dx[i] += stx[i];
      if (ie4up){
        document.all["dot"+i].style.pixelTop = yp[i]+document.body.scrollTop;
        document.all["dot"+i].style.pixelLeft = xp[i] + am[i]*Math.sin(dx[i]);
      } else if (ns6up){
        document.getElementById("dot"+i).style.top = (yp[i]+pageYOffset)+"px";
        document.getElementById("dot"+i).style.left = (xp[i] + am[i]*Math.sin(dx[i]))+"px";
      }
    }
    iterations -=1;
    if (iterations>0) {
      setTimeout(vme_driftup, speed);
    }
  }

  vme_driftup();
}
