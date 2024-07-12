import AgoraRTC, {
    LocalUser,
    RemoteUser,
    useJoin,
    useLocalMicrophoneTrack,
    useLocalCameraTrack,
    usePublish,
    useRemoteUsers,
} from "agora-rtc-react";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "../axios.js";

const Room = () => {
    const location = useLocation();
    const state = location.state;

    const [calling, setCalling] = useState(false);
    const [appId, setAppId] = useState("85fcbe0eb39542f398d3622401ddb3bc");
    const [channel, setChannel] = useState("hins_fhir_1");
    const [token, setToken] = useState("007eJxTYAgRW5Sfc6nsw2ufG6+W/ijUFWNM3/qe82+b4sT/W3hsgowVGCxM05KTUg1Sk4wtTU2M0owtLVKMzYyMTAwMU1KSjJOSr6ztT2sIZGQ47XGAhZEBAkF8boaMzLzi+LSMzKJ4QwYGAKPgI6s=");

    useJoin({appid: appId, channel: channel, token: token ? token : null}, calling);
    //local user
    const [micOn, setMic] = useState(true);
    const [cameraOn, setCamera] = useState(true);
    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    const { localCameraTrack } = useLocalCameraTrack(cameraOn);
    usePublish([localMicrophoneTrack, localCameraTrack]);
    //remote users
    const remoteUsers = useRemoteUsers();

    const [assessment, setAssessment] = useState()

    useEffect(() => {
        Promise.all([AgoraRTC.getMicrophones(), AgoraRTC.getCameras()])
            .then(([mics, cams]) => {
                if (mics.length == 0 || cams.length == 0) {
                    alert('마이크 또는 카메라를 찾을 수 없습니다.');
                }else{
                    setCalling(true)
                }
            })
            .catch(() => {
                alert('마이크 또는 카메라를 찾을 수 없거나 장치 권한이 없습니다.');
            });
    }, []);

    const done = async () => {
        const treatment = {
            patientId: state.patientId,
            subject: state.subject,
            assessment: assessment
        }
        const res = (await axios.post("/treatment", treatment)).data

        console.log(res.success)

        if(res.success){
            alert("진료 기록이 저장되었습니다.")
            window.location.replace("/")
        }
    }

    return (
        <>
            <div className={"flex justify-around w-full h-full border border-solid border-zinc-300 rounded overflow-hidden"}>
                {remoteUsers.map((user) => (
                    <div className={"w-full h-full"} key={user.uid}>
                        <RemoteUser cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                                    user={user}>
                            <div className={"w-80 h-80 rounded shadow-2xl overflow-hidden box-border"}>
                                <LocalUser
                                    audioTrack={localMicrophoneTrack}
                                    cameraOn={cameraOn}
                                    micOn={micOn}
                                    videoTrack={localCameraTrack}
                                    cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                                >
                                    <samp className="user-name">You</samp>
                                </LocalUser>
                            </div>
                        </RemoteUser>
                    </div>
                ))}

                <div className={"w-80 h-full bg-white flex flex-col p-2 gap-2"}>
                    <div>
                        <div>환자 호소</div>
                        <textarea className={"w-full h-16 border"} readOnly={true}>{state.subject}</textarea>
                    </div>
                    <div className={"flex flex-1 flex-col"}>
                        <div>진료 기록</div>
                        <textarea className={"w-full h-full border"} onChange={(e) => setAssessment(e.target.value)}></textarea>
                    </div>
                    <button className={`w-full h-16 rounded text-white ${assessment ? "bg-emerald-400" : 'bg-gray-300'}`}
                            onClick={done} disabled={!assessment}>
                        진료 완료
                    </button>
                </div>
            </div>
        </>
    )
}

export default Room;