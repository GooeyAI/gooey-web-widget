import { CopilotConfigType } from '../../contexts/types';
import { OnSendCallbackType } from '../../widgets/copilot/components/ChatInput';

declare const PlaceholderMessage: ({ initializeQuery, config, }: {
    initializeQuery: OnSendCallbackType;
    config: CopilotConfigType;
}) => import("react/jsx-runtime").JSX.Element;
export default PlaceholderMessage;
