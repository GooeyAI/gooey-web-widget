import ReactDOM from "react-dom";
import "src/css/root.scss";
import { CopilotChatWidget } from "src/widgets";

export default class GooeyEmbed {
  static el = null;

  static mount(initialConfig) {
    const { target_div_id } = initialConfig;
    const component = <CopilotChatWidget config={initialConfig} />;

    function doRender() {
      if (GooeyEmbed.el) {
        throw new Error("GooeyEmbed is already mounted, unmount first");
      }
      if (customElements.get("gooey-embed-copilot") === undefined) {
        const template = document.createElement("template");
        template.innerHTML =`
        <link href="https://cdn.jsdelivr.net/gh/GooeyAI/gooey-web-widget@1.0.18/dist/style.css" rel="stylesheet" />
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
      const shadowRoot = document.getElementById(target_div_id).shadowRoot;
      const embed = shadowRoot.getElementById("gooey-embed");
      if (document._getElementById === undefined) {
        document._getElementById = document.getElementById;
        document.getElementById = (id) => {
          if (id === "gooey-embed") return embed;
          return document._getElementById(id);
        };
      }
      const el = document.getElementById("gooey-embed");
      if (!el) {
        console.error(`Cannot find element with id ${target_div_id} in DOM`);
      }
      shadowRoot.appendChild(embed);
      ReactDOM.render(component, el);
      GooeyEmbed.el = el;
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
    GooeyEmbed.el.parentNode.removeChild(GooeyEmbed.el);
    GooeyEmbed.el = null;
  }
}
window.GooeyEmbed = GooeyEmbed;
