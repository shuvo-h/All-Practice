
const express = require('express')
const cors = require("cors");
const dotenv = require("dotenv").config();
const axios = require("axios").default;
const { createServer } = require('http');
const {Server, socket} = require("socket.io");
const app = express();
const port = 5000

// config mailchimp 
const mailchimp = require("@mailchimp/mailchimp_marketing");
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
  const response = await mailchimp.lists.getAllLists();
  console.log(response);
  res.send(response)
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



app.get('/fonts', async(req, res) => {
  const apiKey = "AIzaSyBVu_O89sfo3KW_kN8590BhKVYcfrryCFI";
  const {data} = await axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`)
  console.log(data.items.length);
  // const userFontFamily = "Martel";
  const userFontFamily = "Krub";
  const userFontVariant = "regular";
  const fontLink = data.items.find(fontObj => fontObj.family == userFontFamily).files[userFontVariant];
  res.json(fontLink)
  // res.json(data.items[50])
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



