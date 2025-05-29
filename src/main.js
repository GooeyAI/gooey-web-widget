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
  integration_id: "Kbo",
};

GooeyEmbed.mount({ target: "#popup", mode: "popup", ...defaultConfig });
GooeyEmbed.mount({ target: "#inline", mode: "inline", ...defaultConfig });



async function loadGooeyEmbed() {
  await window.waitUntilHydrated;
  if (
      typeof GooeyEmbed === 'undefined' 
      || document.getElementById("gooey-embed")?.children.length
  ) return;
  let controller = {
      messages,
      onSendMessage: (payload) => {
          let btn = document.getElementById("onSendMessage");
          if (!btn) return;
          btn.value = JSON.stringify(payload);
          btn.click();
      },
      onNewConversation() {
          document.getElementById("onNewConversation").click();
      },
  };
  GooeyEmbed.controller = controller;
  GooeyEmbed.mount(config, controller);
}
const script = document.getElementById("gooey-embed-script");
if (script) script.onload = loadGooeyEmbed;
loadGooeyEmbed();
window.addEventListener("hydrated", loadGooeyEmbed);
if (typeof GooeyEmbed !== 'undefined' && GooeyEmbed.controller) {
  GooeyEmbed.controller.setMessages?.(messages);
}
