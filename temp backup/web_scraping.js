
app.get("/webS", async(req,res)=>{
    // const url = "https://biddrup.com/how-to-improve-your-knowledge-12-ways-to-get-smarter/";
    const url = "https://www.bbc.com/news/world-us-canada-61933814";
    // const url = "https://biddrup.com/200-titles-about-agriculture-to-help-you-dominate-as-an-expert-blogger/";
    // const url = "https://ezinearticles.com/?The-Difference-Between-Deionized-and-Reverse-Osmosis-Water-Purification&id=10545734";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url,{waitUntil: 'load'});
    const alltitles = [];
    const allParaLi = [];
    // collect <h1> to <h6> inner text
    const hTagList = ["h1","h2","h3","h4","h5","h6"];
    for(let hTag of hTagList){
        const titlesOfH = await page.evaluate((hTag)=>{
          const titles = Array.from(document.querySelectorAll(`${hTag}`)).filter(title => title.innerText != "");
          return titles.map(title => ({titleText: title.innerText}))
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
  
    // filter the null element of the result 
    const filteredTItleParaPosition = titleParaPosition.filter(el => el !== (null || undefined || el?.text) ).sort((a,b)=>a.position-b.position);
    console.log(filteredTItleParaPosition.length);
    res.json(filteredTItleParaPosition);
    // res.json(bodyHTML);
  })
  