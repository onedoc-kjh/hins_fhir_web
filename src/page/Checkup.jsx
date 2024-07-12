import {useEffect, useState} from "react";
import instance from "../axios.js";

const Checkup = () => {
    const [patientId, setPatientId] = useState()
    const [checkup, setCheckup] = useState()

    const fetchCheckup = async () => {
        try{
            const res = (await instance.get(`/checkup/${patientId}`)).data
            console.log(res)
            setCheckup(res)
        }catch (e){
            console.log(e)
        }
    }

    useEffect(() => {
        setPatientId(localStorage.getItem("checkout_patient_id"))
    }, []);

    useEffect(() => {
        if(patientId){
            fetchCheckup()
            console.log(patientId)
        }
    }, [patientId])

    useEffect(() => {
        if (checkup) console.log(checkup)
    }, [checkup]);

    return (
        <div className={"flex flex-col w-full h-full bg-white"}>
            {checkup && (
                <>
                    <div className={"text-center text-4xl p-2"}>건강검진 기록</div>
                    <div className={"flex flex-col"}>
                        <table>
                            <thead className={"bg-gray-600 text-white"}>
                            <th className={"p-2"}>검진자</th>
                            <th className={"p-2"}>주민등록번호</th>
                            <th className={"p-2"}>의사</th>
                            <th className={"p-2"}>병원</th>
                            </thead>
                            <tbody>
                            <tr>
                                <td className={"text-center"}>{checkup.patientName}</td>
                                <td className={"text-center"}>{checkup.socialNumber}</td>
                                <td className={"text-center"}>{checkup.doctorName}</td>
                                <td className={"text-center"}>{checkup.hospitalName}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div className={"flex flex-wrap"}>
                            {checkup.observations && checkup.observations.map((observation, idx) => {
                                console.log(observation)
                                return (<>
                                    <div className={"w-1/4 text-center bg-gray-600 text-white"}>{Object.keys(observation)[0]}</div>
                                    <div className={"w-1/4 text-center"}>{Object.values(observation)[0]}</div>
                                </>)
                            })}
                        </div>
                    </div>
                </>
            )}


        </div>
    )
}

export default Checkup