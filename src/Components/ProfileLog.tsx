import { useLocation } from "wouter";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { setActiveLog } from "../Redux/slices/logSlice";

const ProfileLog = () => {
    const newLog = useAppSelector(state => state.log.newLog);
    const [location, navigate] = useLocation();
    const dispatch = useAppDispatch();

    const handleClick = (id: string) => {
        dispatch(setActiveLog(id));
        navigate(`/map/${id}`)
    }
    return (
        <div>
            <h1>ProfileLog</h1>
            <a onClick={() => handleClick(newLog.log.logId)}>View on Map</a>
        </div>
    )
}

export default ProfileLog