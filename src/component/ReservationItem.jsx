export default function ReservationItem({name, socialNumber, subject, createdAt, appId, channel, patientId}){
    const navigate = useNavigate();

    return (
        <Link to={"/room"} state={{subject: subject, patientId: patientId}}>
            <div className={"flex justify-around w-full border border-solid border-zinc-300 rounded p-3 hover:bg-emerald-300 hover:cursor-pointer items-center"}
                 onClick={() => {navigate('/page/room')}}>
                <div>이름: {name}</div>
                <div>주민등록번호: {socialNumber}</div>
                <div>환자호소: {subject}</div>
                <div>등록일: {createdAt}</div>
                <button className={"bg-cyan-500 p-2 rounded text-white"}
                    onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    localStorage.setItem("checkout_patient_id", patientId)
                    window.open("/checkup", "_blank", "width=800, height=800");

                }}>건강검진 기록 보기</button>
            </div>
        </Link>
)
}

import {Link, useNavigate} from "react-router-dom";
