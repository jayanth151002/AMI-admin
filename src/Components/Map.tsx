import Camera from "../Types/camType";
import Map, {
  FullscreenControl,
  Marker,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
  Popup,
} from "react-map-gl";
import cameraImg from "../assets/cameraMarker.png";
import { useState, useMemo } from "react";
type prop = {
  data: Array<Camera>;
  lat?: string;
  lng?: string;
};
const MapLog = ({ data, lat, lng }: prop) => {
  const [popupInfo, setPopupInfo] = useState<Camera | null>(null);

  const pins = useMemo(
    () =>
      data.map((camera, index) => (
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
    []
  );
  return (
    <div>
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        initialViewState={{
          latitude: Number(lat),
          longitude: Number(lng),
          zoom: 16,
          bearing: 0,
          pitch: 0,
        }}
        style={{ width: "calc(100vw - 20px)", height: "calc(100vh - 120px)" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        attributionControl={false}
      >
        <GeolocateControl position="top-right" />
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" />
        <ScaleControl />
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
      </Map>
    </div>
  );
};

export default MapLog;
