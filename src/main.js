import GooeyEmbed from "src/lib.tsx";

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
  deployment_id: "Kbo",
};

GooeyEmbed.mount({ target: "#popup", mode: "popup", ...defaultConfig });
GooeyEmbed.mount({ target: "#inline", mode: "inline", ...defaultConfig });
