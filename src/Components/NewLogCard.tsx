import { Alert } from "antd"
import { useLocation } from "wouter";
import { useAppSelector } from "../Redux/hooks";

const NewLogCard = () => {

    const newLog = useAppSelector(state => state.log.newLog);
    const [location, navigate] = useLocation();

    return (
        <div>
            <Alert message="Attention!!!" description={newLog.profile.name + "is in an emergency. Click here to viwe more details"} 
            type="warning" showIcon onClick={()=>navigate('/log/profile')}/>
        </div>
    )
}

export default NewLogCard