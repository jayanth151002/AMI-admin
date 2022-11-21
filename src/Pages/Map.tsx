import Map, {
  FullscreenControl,
  Marker,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
  Popup,
} from "react-map-gl";
import { useState, useMemo } from "react";
import camera from "../assest/cameraMarker.png";
import CITIES from "../Data/cities.json";
const MapAdmin = () => {
  const [popupInfo, setPopupInfo] = useState<{
    city: string;
    population: string;
    image: string;
    state: string;
    latitude: number;
    longitude: number;
  } | null>(null);

  const pins = useMemo(
    () =>
      CITIES.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          <img
            src={camera}
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
          />
        </Marker>
      )),
    []
  );
  return (
    <div>
      <Map
        mapboxAccessToken="pk.eyJ1IjoidnRoYXJ1biIsImEiOiJjbGFxZHhuNXExZXo4M3huNjI1MGFqamZsIn0.POWa6BJYlJv599EFgoy7Lg"
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3.5,
          bearing: 0,
          pitch: 180,
        }}
        style={{ width: "calc(100vw - 20px)", height: "calc(100vh - 20px)" }}
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
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.city}, {popupInfo.state}
            </div>
            <img width="100%" src={popupInfo.image} />
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapAdmin;
