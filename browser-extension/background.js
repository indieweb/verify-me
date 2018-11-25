chrome.runtime.onMessage.addListener(function (data, sender, respond) {
  // If we are checking two URLs against eachother, assume they also link to eachother.
  if (data.from === data.to) {
    respond({status: 'verified', index: data.index})
    return false
  }

  // Fetch the external page.
  window.fetch(data.from).then(function (response) {
    if (response.ok) {
      response.text().then(function (contents) {
        let responded = false
        let parser = new window.DOMParser()
        let page = parser.parseFromString(contents, 'text/html')
        let relMeLinks = page.querySelectorAll('a[rel~="me"][href^="http"]')
        // Walk through all found rel-me links to see if any of them matches.
        // Build a collection of all URLs so we can fetch those later if neccessary.
        let urls = []
        for (let i = 0, size = relMeLinks.length; i < size; i++) {
          if (relMeLinks[i].href === data.to) {
            respond({status: 'verified', index: data.index})
            responded = true
            break
          }
          urls.push(relMeLinks[i].href)
        }
        // If we have not sent a response yet, we did not find a direct link back.
        // Parse all the URLs to see if any of them resolve through redirect.
        if (!responded) {
          if (urls.length > 0) {
            fetchNext(urls, respond, data)
          } else {
            respond({status: 'unverified', index: data.index})
          }
        }
      })
    } else {
      // The response had a not-OK HTTP status.
      respond({status: 'unverified', index: data.index})
    }
  }).catch(function () {
    // Fetch was rejected, probably a network error of some kind.
    respond({status: 'unverified', index: data.index})
  })

  // Return true so the browser will keep waiting for an asynchronous response.
  return true
})

function fetchNext (urls, respond, data) {
  if (urls.length === 0) {
    respond({status: 'unverified', index: data.index})
  } else {
    let url = urls.shift()
    window.fetch(url, {
      method: 'HEAD',
      headers: new Headers({ 'User-Agent': 'verify-me-locally' })
    }).then(function (response) {
      if (response.url === data.to) {
        respond({status: 'verified', index: data.index})
      } else {
        fetchNext(urls, respond, data)
      }
    }).catch(function (err) {
      // Fetch was rejected, probably a network error of some kind?
      fetchNext(urls, respond, data)
    })
  }
}

chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.executeScript(null, {file: 'content_script.js'})
})
