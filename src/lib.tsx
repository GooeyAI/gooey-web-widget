import { CopilotChatWidgetController } from "./contexts/ControllerUtils";
import { CopilotConfigType } from "./contexts/types";
import { renderCopilotChatWidget } from "./widgets";

interface CopilotEmbedConfig extends CopilotConfigType {
  target: string;
}

class GooeyEmbedFactory {
  defaultConfig = {};
  _mounted: { innerDiv: HTMLDivElement; root: any }[] = [];

  mount(config: any, controller?: CopilotChatWidgetController) {
    config = { ...this.defaultConfig, ...config } as CopilotEmbedConfig;
    const targetElem = document.querySelector(config.target);
    if (!targetElem) {
      throw new Error(
        `Target not found: ${config.target}. Please provide a valid "target" selector in the config object.`,
      );
    }
    if (!config.integration_id && !config.deployment_id) {
      throw new Error(
        `Deployment ID is required. Please provide an "deployment_id" in the config object.`,
      );
    }

    const innerDiv = document.createElement("div");
    innerDiv.style.display = "contents";
    if (targetElem.children.length > 0) {
      targetElem.removeChild(targetElem.children[0]);
    }
    targetElem.appendChild(innerDiv);
    const root = renderCopilotChatWidget(innerDiv, config, controller);
    this._mounted.push({ innerDiv, root });
  }

  unmount() {
    for (const { innerDiv, root } of this._mounted) {
      root.unmount();
      innerDiv.remove();
    }
    this._mounted = [];
  }
}

const GooeyEmbed = new GooeyEmbedFactory();
(window as any).GooeyEmbed = GooeyEmbed;
export default GooeyEmbed;
