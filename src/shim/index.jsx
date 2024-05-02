import ReactDOM from "react-dom";
import "src/css/root.scss";
import { CopilotChatWidget } from "src/widgets";

export default class GooeyEmbed {
  static el = null;

  static mount(initialConfig) {
    const component = <CopilotChatWidget config={initialConfig} />;
    const { target } = initialConfig || {};
    function doRender() {
      const targetDiv = document.querySelector(target);
      if (!targetDiv) return console.error("Target not found");
      // @TODO - handle if target not found;

      const shadowRoot =
        targetDiv.shadowRoot || targetDiv.attachShadow({ mode: "open" });

      // check if div with id is already there 
      //avoid duplicate rendering and also don't inject css again
      if (!shadowRoot.querySelector("#gooey-embed")) {
        // grab css from variables (inserted from vite.config.ts) and inject it into the shadow dom
        const elementStyle = document.createElement("style");
        const options = document.gooeyCssCopilotCssOptions;
        const cssCode = document.gooeyCssCopilotCssCode;
        // SET ALL ATTRIBUTES
        for (const attribute in options.attributes) {
          elementStyle.setAttribute(attribute, options.attributes[attribute]);
        }
        // inset css into shadow dom
        elementStyle.appendChild(document.createTextNode(cssCode));
        // flush the css variables
        document.gooeyCssCopilotCssOptions = undefined;
        document.gooeyCssCopilotCssCode = undefined;
        const template = document.createElement("template");
        template.innerHTML = `
          <div id="gooey-embed" style="height: 100%"></div>
        `;
        shadowRoot.appendChild(template.content.cloneNode(true));
        shadowRoot.appendChild(elementStyle);
      }

      // Insert the widget ( component ) here
      const embedTarget = shadowRoot.querySelector("#gooey-embed");
      ReactDOM.render(component, embedTarget);
      GooeyEmbed.el = embedTarget;
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
