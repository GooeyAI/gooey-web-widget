import { CopilotConfigType } from "./contexts/types";
import { renderCopilotChatWidget } from "./widgets";

interface CopilotEmbedConfig extends CopilotConfigType {
  target: string;
}

class GooeyEmbedFactory {
  defaultConfig = {};
  _mounted: { innerDiv: HTMLDivElement; root: any }[] = [];

  mount(config: any) {
    config = { ...this.defaultConfig, ...config } as CopilotEmbedConfig;
    let targetElem = document.querySelector(config.target);
    if (!targetElem) {
      throw new Error(
        `Target not found: ${config.target}. Please provide a valid "target" selector in the config object.`,
      );
    }
    if (!config.integration_id) {
      throw new Error(
        `Integration ID is required. Please provide an "integration_id" in the config object.`,
      );
    }
    let innerDiv = document.createElement("div");
    innerDiv.style.display = "contents";
    targetElem.appendChild(innerDiv);
    let root = renderCopilotChatWidget(innerDiv, config);
    this._mounted.push({ innerDiv, root });
  }

  unmount() {
    for (let { innerDiv, root } of this._mounted) {
      root.unmount();
      innerDiv.remove();
    }
    this._mounted = [];
  }
}

const GooeyEmbed = new GooeyEmbedFactory();
(window as any).GooeyEmbed = GooeyEmbed;
export default GooeyEmbed;
