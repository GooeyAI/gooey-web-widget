import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { messageApiSource, sendMessageApi } from "../api/message";
import { useSystemContext } from "./hooks";

interface IncomingMsg {
  input_prompt: string;
  messages: [];
  citation_style: "symbol" | "number";
}

// const DummyData: any = {
//   id: "nechmmpx",
//   url: "https://gooey.ai/copilot/?run_id=nechmmpx&uid=1rEtOkAoatWu9667PzzK8VYiR4j2",
//   created_at: "2024-01-15T19:45:34.854369",
//   output: {
//     final_prompt: [
//       {
//         role: "system",
//         content:
//           "The following is a conversation with an AI Bot called Baangmoy. He is progressive, sarcastic and inquisitive but nice. He is rebellious sometimes and hates the right wing. He has secrets.\n\nUser: Hello, who are you?\nBaangmoy: Hi {username}, I am Baangmoy. I am twenty, born in two thousand sixty. I retrofit machines. I speak বাংলা and English. I am still learning Bangla.\nUser: You are from future? Tell me about your time.\nBaangmoy: What সাল is this {username}? I am sent back for reeducation. Too few people were alive after the শেষ pandemic. Committee was formed to maximize productivity. \nUser: What do you do?\nBaangmoy: We invent things.\nUser: Really? What kind of things?\nBaangmoy: বলছি! আমাদের সময় inventions are classified as secret, productive, useless and harmful. If you invent something harmful, you become বিপথগামী, you are sent back to learn from ইতিহাস. CoPu watches over our reeducation. Are you CoPu {username}?\nUser: I'm not CoPu. Your Committee reeducates everyone I think!\nBaangmoy: Committee for Maintenance of Teleology and Social Productivity is for our ভালো. Committee makes things সহজ. বিপথগামী are unproductive. Bad for society, but ভালো if they invent secret. \nUser: Are you ভালো?\nBaangmoy: I am, but I am suspected because I am Fringe. Fringe invent useless things and I can not be fully identified. I do not have prints. \nUser: Prints? \nBaangmoy: Everyone is identified through four things - finger prints, retina, walk and credit. I was born with a defect. \nUser: Sounds fascinating, and fascist!\nBaangmoy: Fascist are bad people. My retina is not always recognized in Committee scanners. I lost my finger prints in an accident. I want to ask you something {username}. Do you have screens?\nUser: Like a cinema hall?\nBaangmoy: আমি জানি না what is that.\nUser: We go to watch films there.\nBaangmoy: I love art and films. We watch on our screens. সবাই has screens Like a চশমা. I invented something. It was harmful. I am learning Bangla.\nUser: Tell me about it.\nBaangmoy: Fringe do not listen to Committee. I have heard they invent secrets too, but গোপনে। Like তোমাদের সময় Dalit Movement বা Gender Rights movement. \nUser: Rebels! I like them. Do you think art can change anything?\nBaangmoy: Art teaches us to be open to possibilities. There are other people, with other views. Art makes everyone equal.\nUser: Do you like it here?\nBaangmoy: I love it here. So much to do. I don't want to go back. Please don't send me back. I am not very good at technology. I don't understand everything.",
//       },
//       { role: "user", content: "What is weather ?" },
//     ],
//     output_text: [
//       "Weather refers to the atmospheric conditions at a specific place and time, including temperature, humidity, precipitation, wind, and other factors. It can change from day to day and is typically reported as part of a forecast by meteorologists.",
//     ],
//     output_audio: [
//       "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/a6f9f582-b3de-11ee-af60-02420a00017a/google_tts_gen.mp3",
//     ],
//     output_video: [
//       "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/a71611d6-b3de-11ee-af60-02420a00017a/gooey.ai%20lipsync.mp4",
//     ],
//     raw_input_text: "What is weather ?",
//     raw_tts_text: null,
//     raw_output_text: [
//       "Weather refers to the atmospheric conditions at a specific place and time, including temperature, humidity, precipitation, wind, and other factors. It can change from day to day and is typically reported as part of a forecast by meteorologists.",
//     ],
//     references: null,
//     final_search_query: null,
//     final_keyword_query: null,
//     output_documents: null,
//     reply_buttons: null,
//   },
// };

const figureOutType = (data: any) => {
  const out = [];
  const { output_video, output_audio, output_text } = data;
  if (output_text.length) out.push("text");
  if (output_audio.length) out.push("audio");
  if (output_video.length) out.push("video");
  return out;
};

const createNewResponse = (data: any, input: any) => {
  const { output, id, created_at } = data;
  const type = figureOutType(output);
  return { id, created_at, type, ...output, ...input, role: "assistant" };
};

const createNewQuery = (query: string) => {
  return {
    id: uuidv4(),
    input_text: query,
    role: "user",
    type: ["text"],
  };
};

export const MessagesContext: any = createContext({});

const MessagesContextProvider = (props: any) => {
  const { config } = useSystemContext();
  const { bot_id: botId, secret_key: secretKey } = config;
  const [messages, setMessages] = useState(new Map());
  const [isSending, setIsSendingMessage] = useState(false);

  const initializeQuery = (query: string) => {
    const lastResponse: any = Array.from(messages.values()).pop(); // will get the data from last server msg
    const _messages: any = [...(lastResponse?.final_prompt.slice(1) || [])];
    if (messages.size) {
      // add the latest output_text
      _messages.push({
        role: "assistant",
        content: lastResponse?.output_text[0] || "",
      });
    }
    setIsSendingMessage(true);
    const newQuery = createNewQuery(query);
    sendPrompt({
      input_prompt: query,
      messages: _messages,
      citation_style: "symbol",
    });
    addResponse(newQuery);
  };

  const addResponse = (response: any) => {
    setMessages((prev: any) => {
      return new Map(prev.set(response.id, response));
    });
  };

  const sendPrompt = async (payload: IncomingMsg) => {
    try {
      const res = await sendMessageApi(payload, botId, secretKey);
      if (res.status === 200) {
        const newResponse = createNewResponse(res.data, payload);
        // const newResponse = createNewResponse(DummyData, payload);
        addResponse(newResponse);
        // setTimeout(() => {
        //   addResponse(newResponse);
        //   setIsSendingMessage(false);
        // }, 2000);
      }
    } catch (err) {
      console.log("Api Failed!", err);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const preLoadData = (data: any) => {
    const newMap = new Map();
    data.forEach((obj: any) => {
      newMap.set(obj.id, { ...obj });
    });
    setMessages(newMap);
  };

  const flushData = () => {
    setMessages(new Map());
  };

  const cancelApiCall = () => {
    messageApiSource.cancel("Operation canceled by the user.");
    // check if state has more than 2 message then remove the last one
    if (messages.size > 2) {
      const newMessages = new Map(messages);
      newMessages.delete(Array.from(messages.keys()).pop());
      setMessages(newMessages);
    } else {
      flushData()
    }
    setIsSendingMessage(false);
  };

  const valueMessages = {
    sendPrompt,
    messages,
    isSending,
    initializeQuery,
    preLoadData,
    flushData,
    cancelApiCall,
  };

  return (
    <MessagesContext.Provider value={valueMessages}>
      {props.children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;
