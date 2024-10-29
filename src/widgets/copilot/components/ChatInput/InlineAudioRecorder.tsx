/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef, useState } from "react";
import CircleUP from "src/assets/SvgIcons/CircleUP";
import IconClose from "src/assets/SvgIcons/IconClose";
import IconMicrophone from "src/assets/SvgIcons/IconMicrophone";
import IconButton from "src/components/shared/Buttons/IconButton";
import SpinLoader from "src/components/shared/SpinLoader";

interface InlineAudioRecorderProps {
  onCancel: () => void;
  onSend: (blob: Blob) => void;
}

const constraints = { audio: true };
const InlineAudioRecorder = (props: InlineAudioRecorderProps) => {
  const { onCancel, onSend } = props;
  // state to store time
  const [time, setTime] = useState(0);
  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  const [send, setSend] = useState<boolean>(false);
  const [chunks, setChunks] = useState<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // timer logic
    let intervalId: any;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const onSuccess = (stream: MediaStream) => {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    mediaRecorder.onstop = function () {
      stream?.getTracks().forEach((track) => track?.stop());
    };
    mediaRecorder.ondataavailable = function (e) {
      setChunks((prev) => [...prev, e.data]);
    };
    setLoading(false);
    setIsRunning(true);
  };

  const onError = function (err: any) {
    console.log("The following error occured: " + err);
  };

  const handleStopRecording = () => {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    setIsRunning(false);
  };

  useEffect(() => {
    setLoading(true);
    // try to support various browsers
    navigator.mediaDevices.getUserMedia =
      navigator?.mediaDevices?.getUserMedia || // @ts-expect-error
      navigator?.mediaDevices?.webkitGetUserMedia || // @ts-expect-error
      navigator?.mediaDevices?.mozGetUserMedia || // @ts-expect-error
      navigator?.mediaDevices?.msGetUserMedia;
    if (!navigator?.mediaDevices?.getUserMedia) {
      console.error("The mediaDevices.getUserMedia() method is not supported.");
      return;
    }
    navigator?.mediaDevices?.getUserMedia(constraints).then(onSuccess, onError);
  }, []);

  useEffect(() => {
    // @TODO - Work around - to send without useEffect
    if (!send || !chunks.length) return; // do nothing and set send true on click
    const recordedBlob = new Blob(chunks as Blob[], {
      type: "audio/mp3;codecs=mpeg",
    });
    setChunks([]);
    onSend(recordedBlob);
    setSend(false);
  }, [chunks, onSend, send]);

  const handleClose = () => {
    handleStopRecording();
    onCancel();
  };

  const handleSend = () => {
    handleStopRecording();
    setSend(true); // hack to fix the ondataavailable issue
  };

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  if (isLoading) {
    return (
      <div className="gpl-8 gpr-8 d-flex align-center justify-center gpb-25 w-100">
        <SpinLoader size={44} />
      </div>
    );
  }
  return (
    <div className="gpl-8 gpr-8 d-flex align-center gpb-25">
      <IconButton
        variant="text"
        className="bg-light gp-8"
        style={{ borderRadius: "100px", height: "44px" }}
        onClick={handleClose}
      >
        <IconClose size="24" />
      </IconButton>
      <div
        className="gml-24 d-flex b-1 gp-2 w-100 pos-relative justify-between align-center"
        style={{
          borderRadius: "40px",
          backgroundColor: "#fae1e1",
          height: "44px",
        }}
      >
        <div />
        <div className="d-flex align-center">
          <IconMicrophone
            size="16"
            className="anim-blink-self text-gooeyDanger"
            style={{}}
          />
          <p className="gpl-4 text-gooeyDanger font_14_400">
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </p>
        </div>
        <IconButton
          onClick={handleSend}
          variant="text-alt"
          style={{ height: "44px" }}
        >
          <CircleUP size={24} />
        </IconButton>
      </div>
    </div>
  );
};

export default InlineAudioRecorder;
