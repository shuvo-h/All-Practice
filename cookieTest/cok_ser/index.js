const express = require('express')
const cors = require("cors")
const app = express()
require("dotenv").config()
const port = process.env.PORT || 5000

app.use(cors({
  origin: ["https://simple-test-dev.netlify.app","http://localhost:3000"],
  credentials: true
}))

app.get('/cook', (req, res) => {
    
    res.cookie("testSiteCook","df44g1gee65g4eg1",{
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true
    }).json({a:"Abc"})

})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})