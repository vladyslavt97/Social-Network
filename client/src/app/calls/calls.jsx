/* eslint-disable indent */
import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import "./calls.css";
import { socket } from '../socket';
// import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";

export function Calls() {
    // const id = useSelector((state) => state.messages.id);

    const [ me, setMe ] = useState("");
    const [ stream, setStream ] = useState();
    const [ receivingCall, setReceivingCall ] = useState(false);
    const [ caller, setCaller ] = useState("");
    const [ callerSignal, setCallerSignal ] = useState();
    const [ callAccepted, setCallAccepted ] = useState(false);
    const [ callEnded, setCallEnded] = useState(false);

    const myVideo = useRef('');
    const userVideo = useRef();
    const connectionRef= useRef();


    //to get access to the camera and mic
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: true
        })
        //pass the stream coming from the webcam
            .then((stream) => {
                setStream(stream);
                myVideo.current.srcObject = stream;
            })
            .catch(er=> console.log(er));

        socket.on("me", (id) => {
            setMe(id);
        });

        socket.on("callUser", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
        });
    }, []);

    //button to call
    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        });
        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
            });
        });
        peer.on("stream", (stream) => {
			
            userVideo.current.srcObject = stream;
			
        });
        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const answerCall =() =>  {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        });
        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller });
        });
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
    };

    return (
        <div>
            <div id="calls">
				{/* video div */}
                <div id="video-div">
                    <div className="video">
                        {stream &&  <video playsInline muted ref={myVideo} autoPlay />}
                    </div>
                    <div className="video">
                        {callAccepted && !callEnded ?
                            <video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
                            null}
                    </div>
                </div>

				{/* End Call */}
                <div id="myId">
                    <div id="call-button">
                        {callAccepted && !callEnded ? (
                            <button> End Call</button>
                        ) : (
                            <button color="primary" onClick={() => callUser()}>
                            </button>
                        )}
                    </div>
                </div>

				{/* is calling */}
                <div>
                    {receivingCall && !callAccepted ? (
                        <div className="caller">
                            {/* <h1 >{name} is calling...</h1> */}
                            <button onClick={answerCall}>Answer</button>
                        </div>
                    ) : null}
                </div>
                <div>
                    <button onClick={leaveCall}>LEAVE</button>
                </div>
            </div>
        </div>
    );
}