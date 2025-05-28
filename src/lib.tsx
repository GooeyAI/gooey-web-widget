import { CopilotChatWidgetController } from "./contexts/ControllerUtils";
import { CopilotConfigType } from "./contexts/types";
import { renderCopilotChatWidget } from "./widgets";

interface CopilotEmbedConfig extends CopilotConfigType {
  target: string;
}

declare global {
  var gooeyShadowRoot: ShadowRoot | null;
}

class GooeyEmbedFactory {
  defaultConfig = {};
  mounted: { innerDiv: HTMLDivElement; root: any }[] = [];

  mount(config: any, controller?: CopilotChatWidgetController) {
    config = { ...this.defaultConfig, ...config } as CopilotEmbedConfig;
    const targetElem = document.querySelector(config.target);
    if (!targetElem) {
      throw new Error(
        `Target not found: ${config.target}. Please provide a valid "target" selector in the config object.`
      );
    }
    if (!config.integration_id) {
      throw new Error(
        `Integration ID is required. Please provide an "integration_id" in the config object.`
      );
    }

    const innerDiv = document.createElement("div");
    innerDiv.style.display = "contents";
    if (targetElem.children.length > 0) {
      targetElem.removeChild(targetElem.children[0]);
    }
    targetElem.appendChild(innerDiv);
    const root = renderCopilotChatWidget(innerDiv, config, controller);
    this.mounted.push({ innerDiv, root });

    // Global reference to the inner document
    globalThis.gooeyShadowRoot = innerDiv?.shadowRoot;

    
    if (config.fillParent) {
      fillParent(targetElem);
    }
  }

  unmount() {
    for (const { innerDiv, root } of this.mounted) {
      root.unmount();
      innerDiv.remove();
    }
    this.mounted = [];
  }
}

function fillParent(targetElem: HTMLElement) {
  const updateHeight = () => {
    if (!targetElem.children.length) {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("scroll", updateHeight);
      resizeObserver?.disconnect();
      return;
    }
    let rect = targetElem.getBoundingClientRect();
    let top = Math.max(rect.top, 0);
    let remainingHeight = window.innerHeight - top - 8;
    targetElem.style.height = `${remainingHeight}px`;
  }
  let resizeObserver = new window.ResizeObserver(updateHeight);
  resizeObserver.observe(targetElem);
  window.addEventListener("resize", updateHeight);
  window.addEventListener("scroll", updateHeight);
  updateHeight();
}

const GooeyEmbed = new GooeyEmbedFactory();
(window as any).GooeyEmbed = GooeyEmbed;
export default GooeyEmbed;
