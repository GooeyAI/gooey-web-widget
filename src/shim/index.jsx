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
      const el = document.getElementById(target_div_id);
      if (!el) {
        console.error(
          `Cannot find element with id ${target_div_id} in DOM`
        );
      }
      el.setAttribute("class", "gooey-embed-container");

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
