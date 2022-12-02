import Camera from "../Types/camType";
import Log from "../Types/logType";
import Map, {
  FullscreenControl,
  Marker,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
  Popup,
} from "react-map-gl";
import cameraImg from "../assets/cameraMarker.png";
import personImg from "../assets/personMarker.png";
import { useState, useMemo } from "react";
type prop = {
  data?: Array<Camera>;
  log?: Log;
};
const MapLog = ({ data, log }: prop) => {
  const [popupInfo, setPopupInfo] = useState<Camera | null>(null);
  const [logpopupInfo, setLogPopupInfo] = useState<Log | undefined>(undefined);
  const logPin = useMemo(
    () => (
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
    ),
    [log]
  );
  const pins = useMemo(
    () =>
      data?.map((camera, index) => (
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
    [data]
  );
  return (
    <div>
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        initialViewState={{
          latitude: Number(log?.lat),
          longitude: Number(log?.long),
          zoom: 15,
          bearing: 0,
          pitch: 0,
        }}
        style={{ width: "calc(100vw - 20px)", height: "80vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        attributionControl={false}
      >
        <GeolocateControl position="top-right" />
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" />
        <ScaleControl />
        {logPin}
        {pins}

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

export default MapLog;
