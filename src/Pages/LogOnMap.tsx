import { useAppSelector } from "../Redux/hooks";
import Log from "../Types/logType";
import callApi from "../API";
import actions from "../API/actions";
import { useState, useEffect } from "react";

type propsType = {
    id: string
}

const LogOnMap = () => {

    const id = useAppSelector(state => state.log.activeLog) as string;
    const logs = Object.values(useAppSelector(state => state.log.value)) as Log[];
    const log = logs?.filter((log: Log) => log.logId === id)[0]
    callApi(actions.GETCAMS, {
        lat: log.lat,
        long: log.long
    })
        .then(res => console.log(res))
        .catch((err)=>{console.log(err)})

    return (
        <div>
            LogOnMap
        </div>
    )
}

export default LogOnMap