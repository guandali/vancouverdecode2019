const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const TRANSLINK_TOKEN = '?apikey=G9QXvvC75r0l57hUfjxr'
const TRANSLINK_URL = 'http://api.translink.ca/rttiapi/v1/'

// API routes
app.get('/buses/location', async (req, res) => {
  const FILTERS = 'buses'
  const apiURL = `${TRANSLINK_URL}${FILTERS}${TRANSLINK_TOKEN}`
  try {
    const response = await fetch(apiURL, { headers: { 'Accept': 'application/json' }})
    const jsonResponse = await response.json()
    res.send(jsonResponse)
  }
  catch (e){
    console.log(e)
  }
})

app.get('/stops', async (req, res) => {
  let stopArray = [ 60219, 61979, 61935, 60164, 60163, 60162, 60160, 60159, 60158, 58292, 61702, 61701, 58895, 58606, 51479]
  let _allPromises = []
  stopArray.forEach(stopNo => {
    const FILTERS = 'stops/' + stopNo + '/estimates'
    const apiURL = `${TRANSLINK_URL}${FILTERS}${TRANSLINK_TOKEN}`

    let _promise = async () => {
      const resp = await fetch(apiURL, { headers: { 'Accept': 'application/json' }})
      console.log(resp.body)
      return resp.body
    }
    _allPromises.push(_promise)

  });
  
  await Promise.all(_allPromises).then((_respBodies) => {
    console.log(_respBodies)
    res.send(_respBodies)
  })
 
})

app.listen(port, () => console.log(`Listening on port ${port}`))