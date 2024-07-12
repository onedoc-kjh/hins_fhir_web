import ReservationItem from "../component/ReservationItem.jsx";
import instance from "../axios.js";
import {useEffect, useState} from "react";

const Home = () => {

    const [reservation, setReservation] = useState()

    const fetchReservation = async () => {
        try{
            const res = (await instance.get("/reservation")).data
            setReservation(res)
        }catch (e){
            console.log(e)
        }
    }

    useEffect(() => {
        fetchReservation()
    }, []);

    return (
        <>
            <h1 className={"text-5xl"}>진료실</h1>
            <div className={'flex flex-col w-full h-full bg-white mt-5 border-2 rounded p-5 gap-2'}>
                {reservation && reservation.map((val, idx) => {
                    return (<div key={idx}>
                            <ReservationItem name={val.Name} socialNumber={val.SocialNumber}
                                             subject={val.Subject} createdAt={val.createdAt}
                                             appId={val.AppId} channel={val.Channel}
                                             patientId={val.PatientId}/>
                        </div>)
                })}

            </div>
        </>
    )
}

export default Home