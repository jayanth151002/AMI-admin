import Map, {
  FullscreenControl,
  Marker,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
  Popup,
} from "react-map-gl";
import { useState, useMemo, useEffect } from "react";
import cameraImg from "../../public/cameraMarker.png";
import personImg from "../../public/personMarker.png";
import callApi from "../API";
import actions from "../API/actions";
import Camera from "../Types/camType";
import Log from "../Types/logType";
const MapAdmin = ({}) => {
  const [popupInfo, setPopupInfo] = useState<Camera | null>(null);
  const [logpopupInfo, setLogPopupInfo] = useState<Log | undefined>(undefined);
  const [cameras, setCameras] = useState<Array<Camera> | undefined>(undefined);
  const [logs, setLog] = useState<Array<Log> | undefined>(undefined);
  useEffect(() => {
    callApi(actions.GETCAM, {})
      .then((res) => setCameras(res.data))
      .catch(() => setCameras(undefined));
    callApi(actions.GETLOGS, {})
      .then((res) => setLog(res.data))
      .catch(() => setLog(undefined));
  }, []);
  const pins = useMemo(
    () =>
      cameras?.map((camera, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={Number(JSON.parse(camera.camPosition).longitude)}
          latitude={Number(JSON.parse(camera.camPosition).latitude)}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(camera);
          }}
        >
          <img
            src={cameraImg}
            style={{ width: "50px", height: "50px", cursor: "pointer" }}
          />
        </Marker>
      )),
    [cameras]
  );
  const logPin = useMemo(
    () =>
      logs?.map((log, index) => (
        <Marker
          longitude={Number(log?.long)}
          latitude={Number(log?.lat)}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setLogPopupInfo(log);
          }}
        >
          <img
            src={personImg}
            style={{ width: "50px", height: "40px", cursor: "pointer" }}
          />
        </Marker>
      )),
    [logs]
  );

  return (
    <div>
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        initialViewState={{
          latitude: 12.9915,
          longitude: 80.2337,
          zoom: 15,
          bearing: 0,
          pitch: 0,
        }}
        style={{ width: "calc(100vw - 20px)", height: "calc(90vh - 115px)" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        attributionControl={false}
      >
        <GeolocateControl position="top-right" />
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" />
        <ScaleControl />
        {/* {pins} */}
        {logPin}
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(JSON.parse(popupInfo.camPosition).longitude)}
            latitude={Number(JSON.parse(popupInfo.camPosition).latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              <div>Name: {popupInfo.camName}</div>
              <div>Building:{popupInfo.camBuilding}</div>
              <div>
                Latitude: {Number(JSON.parse(popupInfo.camPosition).latitude)}
              </div>
              <div>
                Longitude:{Number(JSON.parse(popupInfo.camPosition).longitude)}{" "}
              </div>
              <div>Count:{popupInfo.camCount}</div>
            </div>
          </Popup>
        )}
        {logpopupInfo && (
          <Popup
            anchor="top"
            longitude={Number(logpopupInfo.long)}
            latitude={Number(logpopupInfo.lat)}
            onClose={() => setLogPopupInfo(undefined)}
          >
            <div>
              <div>Roll Number: {logpopupInfo.rollNo}</div>
              <div>Time: {logpopupInfo.timestamp}</div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapAdmin;
