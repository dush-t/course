const fs = require('fs')

console.log('the path:', __dirname)
const filePath = __dirname + '/test.txt'


const content = fs.readFileSync(filePath)
console.log('the content:', content.toString())

fs.writeFileSync(filePath, 'Updated content')

/**
 * course
 *  |-src
 *      |-fs.js
 *      |-test.txt
 */