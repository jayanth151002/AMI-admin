import { useAppSelector } from "../Redux/hooks";
import Log from "../Types/logType";
import Camera from "../Types/camType";
import callApi from "../API";
import actions from "../API/actions";
import { useState, useEffect } from "react";
import MapLog from "../Components/Map";
const LogOnMap = () => {
  const [logData, setLogData] = useState<Array<Camera> | undefined>(undefined);
  const [log, setLog] = useState<Log | undefined>(undefined);
  const id = useAppSelector((state) => state.log.activeLog) as string;
  const logs = Object.values(
    useAppSelector((state) => state.log.value)
  ) as Log[];
  useEffect(() => {
    const log = logs?.filter((log: Log) => log.logId === id)[0];
    setLog(log);
    callApi(actions.GETCAMS, {
      lat: log.lat,
      long: log.long,
    })
      .then((res) => setLogData(res.data))
      .catch(() => setLogData(undefined));
  }, []);

  return (
    <div>
      {!logData ? (
        <div>Loading...</div>
      ) : (
        <MapLog data={logData} lat={log?.lat} lng={log?.long} />
      )}
    </div>
  );
};

export default LogOnMap;
