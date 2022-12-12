/**
 * STATELESSNESS
 */

const express = require('express')
const fs = require('fs')

/**
 * This is boilerplate that lets me define my
 * server behaviour.
 */
const app = express()
const filePath = __dirname + '/data.json'

/**
 * MIDDLEWARE
 */
const loggingMiddleware = (request, response, next) => {
    const date = new Date()
    console.log(date.toTimeString(), request.method, request.url)
    next()
}

app.use(loggingMiddleware)

app.use(express.json())

/**
 * What does this mean?
 * 
 * This code lets you define which function to run whenever
 * someone sends a GET request to the endpoint "/hello"
 */
app.get('/hello', (request, response) => {
    // What does this mean?
    response.send(
        `<h1>
            Hi there
        </h1>`
    )
})

/**
 * UNIX timestamp
 * 
 * It's the amount of seconds that have passed since new year, January 1, 1970
 */

app.post('/add_article', (req, res) => {
    console.log('body:', req.body)

    const article = {
        name: req.body.name,
        link: req.body.link,
        timestamp: Date.now() // It's the amount of milliseconds that have passed since new year, January 1, 1970
    }

    // Get the existing articles from data.json
    const existingArticleData = fs.readFileSync(filePath).toString()
    const jsonData = JSON.parse(existingArticleData)

    // Add the new article to this array
    jsonData.push(article)

    // Save the whole array back to the file
    const finalDataString = JSON.stringify(jsonData)
    fs.writeFileSync(filePath, finalDataString)

    // Return the response
    res.send('Done')
})

app.get('/get_articles', (req, res) => {
    const existingArticleData = fs.readFileSync(filePath).toString()
    const jsonData = JSON.parse(existingArticleData)

    res.send(jsonData)
})



/**
 * What is 2528?
 * 
 * A port enables connection to a thing (like a USB C port)
 * 
 * Software ports
 * Google chrome (when it starts), starts as a process
 * For two things to communicate, there needs to be an interface.
 * 
 * For two different processes (maybe running on different physical 
 * machines) to communicate, you need a software port.
 * 
 * Every process can listen on only one port
 * And every port can be bound to only one process
 * 
 * Every port is assigned a number - between 1 and 65536 (google why)
 */
app.listen(2528, () => {
    console.log('The server is up on port 2528')
})

/**
 * Good, maintainable code
 * 
 * 1. Redundant work
 * 2. If you want to change the code, you have to do it for every endpoint.
 */