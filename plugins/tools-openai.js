/**
 Copyright (C) 2022.
 Licensed under the  GPL-3.0 License;
 You may not use this file except in compliance with the License.
 It is supplied in the hope that it may be useful.
 * @project_name : Ikratos-MD-v1
 * @author : xIKRATOSx <https://github.com/xIKRATOSx>
 * @description : Ikratos-MD-v1,A Multi-functional simple and light weight whatsapp bot.
 * @version 1.0.0
 * @file : Ikratos-openai.js
 **/

 import fetch from "node-fetch"
 import { generateWAMessageFromContent } from "@adiwajshing/baileys"
 import fs from 'fs'
 import { Configuration, OpenAIApi } from 'openai'
 const configuration = new Configuration({ organization: global.org, apiKey: global.openAiapi});
 const openai = new OpenAIApi(configuration);

 let handler = m => m
 
 handler.all = async function (m) {
   let chat = global.db.data.chats[m.chat]
   let text = m.text || m.quotedMsg && m.quotedMsg.body;
 
   if (m.fromMe) return; // ignore messages sent by the bot itself
   if (chat.gpt && m.quoted && m.quoted.fromMe && m.quoted.id && !chat.isBanned) try {
    if (global.openAiapi === "PASTE_YOUR_API_HERE")
            return m.reply('Please add your _API_ key in *config.js* file')
    if (global.org === "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")
            return m.reply('org-6BGlsB8TYerFQPk6vLKJTJYJ')        
    if (!text) return m.reply(`Chat with AI.\n\nExample:\n${usedPrefix}${command} write a poem for those who copy or steal others codes `);
    await conn.reply(m.chat, `Please wait, I\'m processing your request.\nIt may take 1-2 min so be paitent.\n\n${fig}`, m)

    const response = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{role: "user", content: text}],
  });
  m.reply(`⚛ Response Generated By ChatGPT\n\t\t🪀Using Model *gpt-3.5-turbo*\n\n${response.data.choices[0].message.content}\n\n${footerTXT}`);
  } catch (error) {
  if (error.response) {
    console.log(error.response.status);
    console.log(error.response.data);
    console.log(`${error.response.status}\n\n${error.response.data}`);
  } else {
    console.log(error);
    m.reply("I\'m Facing An Error:"+ error.message);
  }
}

  if (/^(gpt|Gpt|ai|openai)$/i.test(m.text) && !chat.gpt && !chat.isBanned) {
    let tek = `ChatGPT is not Enabled For This Chat\nAsk Owner To Enable It\nContact owner: wa.me/923470027813\n\n${fig}`   
    m.reply(tek)
 
   return !0;
 }
}

export default handler;
 
