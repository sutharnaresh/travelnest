// Importing required styles and components for Leaflet map
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";

// Importing marker images
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import makerIcon2x from "leaflet/dist/images/marker-icon-2x.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
// Setting default options for Leaflet icons
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: makerIcon2x.src,
  shadowUrl: markerShadow.src,
});

// Interface defining props for the Map component
interface CustomMapProps {
  center?: number[];
}

// Map component displaying Leaflet map with optional marker
const CustomMap: React.FC<CustomMapProps> = ({ center }) => {
  return (
    <MapContainer
      center={(center as L.LatLngExpression) || [51, -0.09]}
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      {/* OpenStreetMap tile layer */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* Marker displayed only if center prop is provided */}
      {center && <Marker position={center as L.LatLngExpression} />}
    </MapContainer>
  );
};

export default CustomMap;
