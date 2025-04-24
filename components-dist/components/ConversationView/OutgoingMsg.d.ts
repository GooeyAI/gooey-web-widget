type OutgoingMsgProps = {
    input_prompt?: string;
    input_audio?: Blob;
    input_images?: string[];
    button_pressed?: {
        button_title?: string;
    };
};
declare const OutgoingMsg: import('react').MemoExoticComponent<({ input_prompt, input_audio, input_images, button_pressed, }: OutgoingMsgProps) => import("react/jsx-runtime").JSX.Element>;
export default OutgoingMsg;
