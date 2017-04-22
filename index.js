// you have to get an API key from Google Custom Search Engine and set it in CSE_API_KEY envivorment variable
// and also configure a search engine and put its ID in GOOGLE_CX
if (!process.env.CSE_API_KEY || !process.env.CSE_API_KEY.length) {
  console.error('ERROR: missing Google Custom Search Engine API Key in process.env.CSE_API_KEY')
  process.exit(1)
} else if (!process.env.GOOGLE_CX || !process.env.GOOGLE_CX.length) {
  console.error('ERROR: missing Google Custom search engine ID (cx) in process.env.GOOGLE_CX')
  process.exit(1)
} else {
  var apiKey = process.env.CSE_API_KEY
  var cx = process.env.GOOGLE_CX
  var express = require('express')
  var request = require('request')
  var app = express()
  var port = process.env.PORT || 5000
  // set max number of queries to keep in history (0 = no limit)
  var maxHistory = process.env.MAX_HISTORY || 10
  var results = process.env.RESULTS || 10
  var history = []

  app.get('/api/imagesearch/:query', function (req, res) {
    var term = req.params.query
    var offset = req.query.offset || 0
    history.unshift({term: term, when: new Date()})
    if (maxHistory > 0 && history.length > maxHistory) {
      history.pop()
    }
    var pagination = offset * results + 1
    var url = 'https://www.googleapis.com/customsearch/v1?q=' + term + '&cx=' + cx + '&searchType=image&fields=items(image(contextLink%2CthumbnailLink)%2Clink%2Ctitle)&num=' + results + '&start=' + pagination + '&key=' + apiKey

    request(url, function (error, response, body) {
      if (error) {
        // console.log('error: ', error)
        res.json({error: error})
      } else if (response && response.statusCode !== 200) {
        // console.log('statusCode != 200: ', response.statusCode, body)
        res.json(JSON.parse(body))
      } else {
        // console.log(JSON.parse(body))
        // TODO: yeah, I should handle JSON parsing error
        var got = JSON.parse(body)
        if (got.items && got.items.length > 0) {
          var imgs = got.items.map(function (elem) {
            return {alt: elem.title, url: elem.link, page: elem.image.contextLink, thumbnail: elem.image.thumbnailLink}
          })
          res.json(imgs)
        } else {
          res.json(got)
        }
      }
    })
  })

  app.get('/api/latest/imagesearch/', function (req, res) {
    res.json(history)
  })

  app.listen(port, function () {
    console.log('Image Search Abstraction Layer started on port ' + port + '!')
  })
}
