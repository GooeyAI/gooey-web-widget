import ReactDOM from "react-dom";
import "src/css/root.scss";
import { CopilotChatWidget } from "src/widgets";

export default class GooeyEmbed {
  static el = null;

  static mount(initialConfig) {
    const component = <CopilotChatWidget config={initialConfig} />;

    function doRender() {
      if (customElements.get("gooey-embed-copilot") === undefined) {
        const template = document.createElement("template");
        template.innerHTML =`
        <link href="https://cdn.jsdelivr.net/gh/GooeyAI/gooey-web-widget@1.0.27/dist/style.css" rel="stylesheet" />
        <div id="gooey-embed" style="height: 100%;" class="gooey-embed-container"></div>
        `;
        customElements.define(
          "gooey-embed-copilot",
          class extends HTMLElement {
            constructor() {
              super();
              this.attachShadow({ mode: "open" });
              this.shadowRoot.appendChild(template.content.cloneNode(true));
            }
          }
        );
      }
      const elements = document.getElementsByTagName('gooey-embed-copilot');
      const shadowRoot = Array.from(elements)[0].shadowRoot;
      const embed = shadowRoot.getElementById("gooey-embed");
      shadowRoot.appendChild(embed); // Move the element to the shadow root

      // Insert the widget ( component ) here
      ReactDOM.render(component, embed);
      GooeyEmbed.el = embed;
    }
    if (document.readyState === "complete") {
      doRender();
    } else {
      window.addEventListener("load", () => {
        doRender();
      });
    }
  }

  static unmount() {
    if (!GooeyEmbed.el) {
      throw new Error("GooeyEmbed is not mounted, mount first");
    }
    ReactDOM.unmountComponentAtNode(GooeyEmbed.el);
  }
}
window.GooeyEmbed = GooeyEmbed;
