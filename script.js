import { config } from "dotenv"
config()

import OpenAIApi from "openai"

const openAi = new OpenAIApi({
  apiKey: process.env.API_KEY,
})

const SECAPIKEY = process.env.SEC_API_KEY

const apiUrl = "https://api.sec-api.io/extractor?url=https://www.sec.gov/Archives/edgar/data/1318605/000156459021004599/tsla-10k_20201231.htm&item=1A&type=text&token=" + SECAPIKEY

// Make the API request
async function analyzeSummarize() {
  let filingText;
  fetch(apiUrl, {
    method: 'GET',
    headers: {
      'X-API-KEY': SECAPIKEY
    }
  })
    .then(response => response.text())
    .then(data => {
      const filingText = data;
      console.log(filingText)
      
    })
    .catch(error => {
      console.error('Request failed:', error);
    });
  
  
  const response = await openAi.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Summarize and Analyze section of this SEC 10-K filing:"+ filingText}],
  })
  console.log(response.data.choices[0].message.content)
}

analyzeSummarize()


