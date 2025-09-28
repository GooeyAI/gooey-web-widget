import GooeyEmbed from "src/lib.tsx";

(async () => {
  // let resp = await fetch(
  //   "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/a11c7ee2-8f32-11f0-b124-02420a0001f8/mrousavy8036382573842672550.jpg",
  // );

  const defaultConfig = {
    branding: {
      showPoweredByGooey: false,
      name: "Gooey Base Copilot",
      byLine: "By gooey.ai",
      description:
        "This bot can search the web, execute code and make rad QR codes. It can analysis photos, files and recognize most spoken languages. ",
      conversationStarters: [
        "What\u2019s weather in Bangalore?",
        "Show me driver jobs in Bangalore",
        "How long would a cheetah take to run from Chennai to Mumbai?",
        "Analyze this photo\u2026",
      ],
      photoUrl: "",
      websiteUrl:
        "https://gooey.ai/copilot/base-copilot-w-search-rag-code-execution-v1xm6uhp/",
    },
    showSources: true,
    autoPlayResponses: true,
    enablePhotoUpload: true,
    enableAudioMessage: true,
    enableConversations: true,
    integration_id: "Kbo",
    // payload: {
    //   input_images: [
    //     {
    //       name: "input-image-1.jpeg",
    //       mime: "image/jpeg",
    //       bytes: await resp.bytes(),
    //     },
    //   ],
    // },
  };

  GooeyEmbed.mount({ target: "#popup", mode: "popup", ...defaultConfig });
  GooeyEmbed.mount({ target: "#inline", mode: "inline", ...defaultConfig });
})();
