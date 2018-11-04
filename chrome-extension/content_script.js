(function (window, document) {
  let canonicalUrl = document.querySelector('link[rel~="canonical"]')
  let url = (canonicalUrl ? canonicalUrl.href : window.location.href).split('#')[0]
  let relMeLinks = document.querySelectorAll('a[rel~="me"][href^="http"]')
  for (let i = 0, links = relMeLinks.length; i < links; i++) {
    chrome.runtime.sendMessage({from: relMeLinks[i].href, to: url, index: i}, function (response) {
      let element = relMeLinks[response.index]
      element.classList.add(response.status)
      if (response.status === 'verified') {
        element.insertAdjacentHTML('beforebegin', '<svg xmlns="http://www.w3.org/2000/svg" width="1em" style="vertical-align:text-bottom" viewbox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="green" stroke="lightgreen" stroke-width="3"/><path d="M 10,20 18,28 33,14" fill="none" stroke="white" stroke-width="6"/></svg>')
      } else if (response.status === 'unverified') {
        element.insertAdjacentHTML('beforebegin', '<svg xmlns="http://www.w3.org/2000/svg" width="1em" style="vertical-align:text-bottom"  viewbox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="darkred" stroke="red" stroke-width="3"/><path d="M 10,10 30,30 M 10,30 30,10" fill="none" stroke="white" stroke-width="6"/></svg>')
      }
    })
  }
}(window, document))
