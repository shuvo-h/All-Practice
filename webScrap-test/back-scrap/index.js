const { default: axios } = require('axios');
const express = require('express')
const cors = require('cors')
const puppeteer = require('puppeteer')
require("dotenv").config()
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.urlencoded({extended: false}))

function validURL(strUrl) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(strUrl);
}


// API to scrap web page. requet with query         eg. /text/?reqUrl="your_url"
app.get("/scrap/", async(req,res)=>{
    
  const url = req.query.weburl;
  // validate url and check if the url link is alive or exist?
  try {
      const isValid = validURL(url);
      const axiosHeadRes  = await axios.head(url);
      const isActive =  axiosHeadRes !== undefined && (axiosHeadRes.status < 400 || axiosHeadRes.status >= 500)
    //   res.json({isActive, isValid})
    } catch (error) {
        res.status(303).json({uri_message:error.message, message:"could reach the page"})
    }
    
  // create browser with puppeteer and go the the utl page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url,{waitUntil: 'load'});
  const alltitles = [];
  const allParaLi = [];
  // collect <h1> to <h6> inner text
  const hTagList = ["h1","h2","h3","h4","h5","h6"];
  for(let hTag of hTagList){
      const titlesOfH = await page.evaluate((hTag)=>{
        const titles = Array.from(document.querySelectorAll(`${hTag}`)).filter(title => title?.innerText != "");
        return titles.map(title => ({titleText: title?.innerText}))
      },hTag)
      alltitles.push(titlesOfH);
  }
  // collect <p> to <li> inner text
  const plTagList = ["p","li"];
  for(let plTag of plTagList){
    const paraAndLis = await page.evaluate((plTag)=>{
      const pls = Array.from(document.querySelectorAll(`${plTag}`)).filter(pl => pl.innerText != "");
      return pls.map(pl => ({paraList: pl.innerText}))
    },plTag)
    allParaLi.push(paraAndLis);
  }
  
  if (!alltitles.length) {
      res.json({error: true, message: "Not found page"})
  }
  // get total page as a string
  let bodyHTML = await page.evaluate(() =>  document.documentElement.outerHTML);
  // let bodyHTML = await (await page.evaluate(() =>  document.documentElement.innerText)).split("\n").join(". ");
    // const bodyHTML = await (await page.waitForSelector("h1")).innerText();
  // separate the para and titles and list
  const flattenTitles = alltitles.flat().map(({titleText}) => titleText);
  const flattenParaLi = allParaLi.flat().map(({paraList}) => paraList);
  const takenPositions = [];
  const titleParaPosition = [...flattenTitles,...flattenParaLi].map(findString =>{
    let findStr1 = findString;
    if(!findStr1.trim()){
      return;
    }
    let findStr = findString.trim();
    // console.log(findStr);
    
    // find the position of this string (title/para/List) in bodyHtml
    let positions = [];
    let i = 0, j=0;
    while (~(i = bodyHTML.indexOf (findStr, i + findStr.length))) positions.push(i);
    // console.log (positions)
    // check if position lenth is more than 1? then count the last position and take the next position of last received position
      // get the title or para text and make the object with position and tagName
      const isTitle = flattenTitles.includes(findStr);
      const isParaLi = flattenParaLi.includes(findStr);
      const position = positions[positions.length -1]; // last element position of the array
      // console.log("-/> pos enter",positions, " =============",isTitle,isParaLi, );
      const isPositionExist = takenPositions.includes(position);
      if (!isPositionExist) {
        takenPositions.push(position)
        return {text: findStr, position, tag: isParaLi ? "p" : "h"}
      }

    // console.log (s.substring(hacker[0],hacker[0]+find.length))
  })

  
  // change position of the title 
    const title = await page.title();
    console.log(title);
    if(titleParaPosition.find(element => element?.text === title))  {
        titleParaPosition.find(element => element?.text === title).position = 0;
        console.log("---------->Title Change<-----------------");
    }else{
        titleParaPosition.unshift({text: title, position:0, tag: "h"})
    }
    

  // filter the null element of the result 
  const filteredTItleParaPosition = titleParaPosition.filter(el => el !== (null || undefined || el?.text) ).sort((a,b)=>a.position-b.position);
  const resultPT = []
  let isPtagStarted = false;
  for(let i= filteredTItleParaPosition.length -1; i >= 0; i--){

    if (isPtagStarted) {
      resultPT.unshift(filteredTItleParaPosition[i])
      // delete that element
    } else if(!isPtagStarted && filteredTItleParaPosition[i].text.length > 20 ) {
      // change that p tag started or it is the last p tag
      resultPT.push(filteredTItleParaPosition[i])
    //   console.log(filteredTItleParaPosition[i].text,"print - le");
      isPtagStarted = true;
    }else{
      console.log(filteredTItleParaPosition[i]);
    }



  }
  console.log(filteredTItleParaPosition.length, " to ",resultPT.length);
  console.log(await page.title(), "************");
  
  res.json(resultPT);

})

app.get('/', (req, res) => {
  res.send('Hello Scrap World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})