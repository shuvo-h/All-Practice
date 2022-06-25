
const express = require('express')
const cors = require("cors");
const dotenv = require("dotenv").config();
const axios = require("axios").default;
const corn = require("node-cron");
const puppeteer = require("puppeteer");
const { createServer } = require('http');
const app = express();
const port = 5007

// config mailchimp 
const mailchimp = require("@mailchimp/mailchimp_marketing");
const res = require('express/lib/response');
const request = require('request');
const apiKey_mailchimp = "";
mailchimp.setConfig({
  apiKey: `${process.env.MAILCHIMP_API}`,
  server: `${process.env.MAILCHIMP_SERVER_PREFIX}`,
});


app.get("/hubList",async(req,res)=>{
  try {
    const hubUrl = `https://api.hubapi.com/contacts/v1/lists/all/contacts/all?hapikey=${process.env.HUBSPOT_API}`
    console.log(hubUrl);
    const {data} = await axios.get(hubUrl)
    console.log(data);
    res.json(data)
    
  } catch (error) {
    res.json(error)
  }

})

app.get("/mailchimp-list",async(req,res)=>{
    const list_id = "bbedd4d84a";
    const web_id = 1128801;
  const response = await mailchimp.lists.getAllLists();
  const listID = response.lists.find(list => list.id == list_id);
  console.log(listID);
  res.json(listID)
})
// id   bbedd4d84a
app.get("/mailchimp-list_member_info",async(req,res)=>{
  const list_id = "bbedd4d84a";
  const response = await mailchimp.lists.getListMembersInfo(list_id);
  console.log(response);
  res.send(response)
})
app.get("/mailchimp-automation_list",async(req,res)=>{
  const list_id = "bbedd4d84a";
  const response = await mailchimp.automations.list();
  console.log(response);
  res.send(response)
})

app.get("/mailchimp-list_add_member",async(req,res)=>{
  try {
    const userInfoObj = {
      email_address: "newAPiInsert@gmail.com",
      status: "pending",
    }
    const list_id = "bbedd4d84a";
    const response = await mailchimp.lists.addListMember(list_id, userInfoObj);
    // console.log(response);
    res.send(response)
    
  } catch (error) {
    res.json(error)
  }
})

app.get("/try-addEmailChimpAuomation",async(req,res)=>{
    try {
        // step 1: get list info
        const listRes = await mailchimp.lists.getAllLists(); 
        const list_id = listRes.lists.find(list => list.id == "bbedd4d84a").id;
        // get autimation list 
        const automotionList = await mailchimp.automations.list();
        // const selectedAutomotion = automotionList.automations
    
        // step 1: add an automation 
        // const createdRes = await mailchimp.automations.create({
        //     recipients: {list_id, store_id:"1a2df693ki"},
        //     trigger_settings: { workflow_type: "abandonedCart", reply_to: "abc_replay@gmail.com" },
        // });
        // get automation info 
        // const autoInfo = await client.automations.get("cdb10c652f");
        res.json(automotionList)
          
        } catch (error) {
            res.json(error)
    }
})

app.get("/hubToChimp",async(req,res)=>{
    const hubUrl = `https://api.hubapi.com/contacts/v1/lists/all/contacts/all?hapikey=${process.env.HUBSPOT_API}`;
    const hubListRes  = await axios.get(hubUrl);
    const randIdx = getRandomNumber(0,(hubListRes.data.contacts.length-1))
    const identityProperty = "identity-profiles"
    const randEmail = hubListRes.data.contacts[randIdx][identityProperty][0].identities[0].value;
    console.log(randEmail);
    
    // add a new email to mailChimp 
    const userInfoObj = {
        // email_address: randEmail,
        email_address: "dev.test.mern@gmail.com",
        status: "pending",
    }
    const list_id = "bbedd4d84a";
    // const insertEmailRes = await mailchimp.lists.addListMember(list_id, userInfoObj);

    // get all emails info of a alist from mailchimp 
    // const response = await mailchimp.lists.getListMembersInfo(list_id)

    // get workflow_id 
    const automationList = await mailchimp.automations.list()
    const workflow_id = automationList.automations[0].id;
    console.log(workflow_id);

    // get workflow_email_id
    const automationEmails = await mailchimp.automations.listAllWorkflowEmails(workflow_id);
    let i = 0;
    for(let emailInfo of automationEmails.emails){
        const workflow_email_id = emailInfo.id;
    }
    const workflow_email_id = automationEmails.emails[0].id

    // get email info form automation workflow
    const response = await mailchimp.automations.getWorkflowEmail(workflow_id,workflow_email_id);

    res.json(automationEmails.emails[0].report_summary)
})


// **************************************************************************************************
app.get("/clientWork", async(req,res)=>{
    // get a random email from hubspot 
    const randomEmail = await getRandHubEmail();
    //  add email it to the MailChimp Flow
    const listID = "bbedd4d84a";   // get this id from client
    // const mailAddAutomation = await addEmailMailChimp(randomEmail,"pending", listID);
    // const mailAddAutomation = await addEmailMailChimp("samuel@yahoo.com","pending", listID);
    
    const automationList = await mailchimp.automations.list()
    const workflow_id = automationList.automations[0].id;
    console.log(workflow_id);

    const aautoallemail = await checkEmailStatus();
    res.json(aautoallemail);
})


app.get("/scrapping", async(req,res)=>{
  const browser = await puppeteer.launch({ headless: true });
  const request = require('request');
  const weburl = [
    "https://en.wikipedia.org/wiki/CNN",
    "https://www.shuvohaldar.com/blog/61c2384031de20f4b23384fb",
    "https://biddrup.com/200-titles-about-agriculture-to-help-you-dominate-as-an-expert-blogger/",
    "https://www.bbc.com/news/world-asia-61900260",
    "https://biddrup.com/5-topics-with-100-excellent-titles-to-write-continuity-disaster-recovery/",
    "https://www.prothomalo.com/bangladesh/capital/%E0%A6%AC%E0%A6%BE%E0%A6%B8%E0%A6%AF%E0%A7%8B%E0%A6%97%E0%A7%8D%E0%A6%AF%E0%A6%A4%E0%A6%BE%E0%A6%B0-%E0%A6%B8%E0%A7%82%E0%A6%9A%E0%A6%95%E0%A7%87-%E0%A7%A7%E0%A7%AD%E0%A7%A8%E0%A6%9F%E0%A6%BF-%E0%A6%B6%E0%A6%B9%E0%A6%B0%E0%A7%87%E0%A6%B0-%E0%A6%AE%E0%A6%A7%E0%A7%8D%E0%A6%AF%E0%A7%87-%E0%A6%A2%E0%A6%BE%E0%A6%95%E0%A6%BE-%E0%A7%A7%E0%A7%AC%E0%A7%AC%E0%A6%A4%E0%A6%AE",
    "https://ezinearticles.com/?What-Is-Trending-in-Indian-Real-Estate-Market?&id=9912416"
];

  var BodyExtractor = require('extract-main-text');
  var extractor = new BodyExtractor({
      url: weburl[4]
    });
  extractor.analyze()
    .then(function(text) {
    console.log(extractor.title);
    console.log(extractor.mainText);
    res.json({t:extractor.title, m:extractor.mainText})
    });
  
})

app.get("/scrapping/n", async(req,res)=>{
  const puppeteer = require('puppeteer');
  const weburl = [
    "https://en.wikipedia.org/wiki/CNN",
    "https://www.shuvohaldar.com/blog/61c2384031de20f4b23384fb",
    "https://biddrup.com/200-titles-about-agriculture-to-help-you-dominate-as-an-expert-blogger/",
    "https://www.bbc.com/news/world-asia-61900260",
    "https://biddrup.com/5-topics-with-100-excellent-titles-to-write-continuity-disaster-recovery/",
    "https://www.prothomalo.com/bangladesh/capital/%E0%A6%AC%E0%A6%BE%E0%A6%B8%E0%A6%AF%E0%A7%8B%E0%A6%97%E0%A7%8D%E0%A6%AF%E0%A6%A4%E0%A6%BE%E0%A6%B0-%E0%A6%B8%E0%A7%82%E0%A6%9A%E0%A6%95%E0%A7%87-%E0%A7%A7%E0%A7%AD%E0%A7%A8%E0%A6%9F%E0%A6%BF-%E0%A6%B6%E0%A6%B9%E0%A6%B0%E0%A7%87%E0%A6%B0-%E0%A6%AE%E0%A6%A7%E0%A7%8D%E0%A6%AF%E0%A7%87-%E0%A6%A2%E0%A6%BE%E0%A6%95%E0%A6%BE-%E0%A7%A7%E0%A7%AC%E0%A7%AC%E0%A6%A4%E0%A6%AE",
    "https://ezinearticles.com/?What-Is-Trending-in-Indian-Real-Estate-Market?&id=9912416"
  ];

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto(weburl[0], {waitUntil: 'domcontentloaded'});
  // Wait for 5 seconds
  // console.log(await page.content());
  const htmlDataContent = await page.content()

  const title = await page.title();

  let element = await page.$('h1');
  let value = await page.evaluate(el => el?.textContent, element);
  console.log('Text in the H1: ' + value);


  // Take screenshot
  await browser.close();

  res.json(htmlDataContent)
    
})

app.get("/pc", async(req,res)=>{
  // const url = "https://biddrup.com/how-to-improve-your-knowledge-12-ways-to-get-smarter/";
  const url = "https://ezinearticles.com/?The-Difference-Between-Deionized-and-Reverse-Osmosis-Water-Purification&id=10545734";
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url,{waitUntil: 'load'});

  const data = await page.evaluate(()=>{
    const titles = Array.from(document.querySelectorAll("h1")).filter(title => title.innerText != "");
    return titles.map(title => (
      {
        title: title.innerText,
      }
      ))
    })

    let bodyHTML = await page.evaluate(() =>  document.documentElement.outerHTML);
  console.log(bodyHTML);
  const needTitle = data[0].title;
  console.log(bodyHTML.indexOf(needTitle));
  // find index of selected text, title
  let s = 'Hello_HaHaHaHackerRank';
  let find = 'HaHa'
  let hacker = [];
  let i = 0, j=0;
  while (~(i = s.indexOf (find,i + find.length))) hacker.push(i);
  console.log (hacker)
  console.log (s.substring(hacker[0],hacker[0]+find.length))

  res.json(bodyHTML)

})

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

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// Important Utilities 
const getRandomNumber = (min,max) => Math.floor(Math.random() * (max - min + 1) ) + min;

// get random email from hubspot
const getRandHubEmail = async () =>{
    try {
        const hubUrl = `https://api.hubapi.com/contacts/v1/lists/all/contacts/all?hapikey=${process.env.HUBSPOT_API}`;
        const hubListRes  = await axios.get(hubUrl);
        const randIdx = getRandomNumber(0,(hubListRes.data.contacts.length-1));
        const identityProperty = "identity-profiles"
        const randEmail = hubListRes.data.contacts[randIdx][identityProperty][0].identities[0].value;
        return randEmail;
    } catch (error) {
        return error.message;
    }
}

// add a new email to mailChimp 
const addEmailMailChimp = async (email,emailStatus,listID) =>{
    try {
        const userInfoObj = {
            email_address: email,
            // status: "pending",
            status: emailStatus,
        }
        // const list_id = "bbedd4d84a";
        const insertEmailRes = await mailchimp.lists.addListMember(listID, userInfoObj);
        return insertEmailRes;
    } catch (error) {
        return error.message;
    }
}

// call function randomly 
const mailAddHubToFlow = async() =>{
    
/*
    // get a random email from hubspot 
    const randomEmail = await getRandHubEmail();
    //  add email it to the MailChimp Flow
    const listID = "bbedd4d84a";   // get this id from client
    // const mailAddAutomation = await addEmailMailChimp(randomEmail,"pending", listID);
    const mailAddAutomation = await addEmailMailChimp("samuel@yahoo.com","pending", listID);
*/
    // get wait time to call this function again 
    const intervalTime = getRandomNumber(1,5);
    const randomSecond = getRandomNumber(30,60);
    console.log("Inserting new email after ",(intervalTime * randomSecond)/60," minutes. Current time in minute = ", new Date().getMinutes());
    setTimeout(mailAddHubToFlow, intervalTime * randomSecond * 1000);
}
mailAddHubToFlow()

// cord job to check daily email status
//corn.schedule("0 0 0 * * *",async()=>{
// corn.schedule("*/30 * * * * *", async()=>{
    // console.log("running corn job", new Date().getSeconds());
    // const response = await mailchimp.reports.getAllCampaignReports();
    // console.log(response);
//})

const checkEmailStatus = async() =>{
    // workflow id should be provided by client
    const workflow_id = "cdb10c652f";
    // get all automated email list 
    const automationEmails = await mailchimp.automations.listAllWorkflowEmails(workflow_id);
    return automationEmails
}