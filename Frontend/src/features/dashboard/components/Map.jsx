import { useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { MapPin, Navigation } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom green marker icon for tree locations
const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Component to handle map clicks
function LocationMarker({ position, setPosition, onLocationSelect }) {
  useMapEvents({
    click(e) {
      const newPosition = [e.latlng.lat, e.latlng.lng];
      setPosition(newPosition);
      if (onLocationSelect) {
        onLocationSelect(newPosition);
      }
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={greenIcon}>
      <Popup className="dark-popup">
        <div className="text-sm p-1">
          <p className="font-semibold text-[#22C55E] mb-2 text-base">Selected Location</p>
          <div className="space-y-1">
            <p className="text-gray-700">
              <span className="font-medium">Lat:</span> {position[0].toFixed(6)}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Lng:</span> {position[1].toFixed(6)}
            </p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

const Map = ({ onLocationSelect, initialPosition = [20.5937, 78.9629] }) => {
  const [position, setPosition] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Get user's current location
  const handleGetCurrentLocation = useCallback(() => {
    setIsLoadingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setPosition(newPosition);
          if (onLocationSelect) {
            onLocationSelect(newPosition);
          }
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location. Please click on the map to select a location.");
          setIsLoadingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
      setIsLoadingLocation(false);
    }
  }, [onLocationSelect]);

  return (
    <div className="relative w-full h-full">
      {/* Map Container */}
      <MapContainer
        center={initialPosition}
        zoom={5}
        className="w-full h-full"
        style={{ zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          position={position}
          setPosition={setPosition}
          onLocationSelect={onLocationSelect}
        />
      </MapContainer>

      {/* Floating Controls */}
      <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-3">
        {/* Get Current Location Button */}
        <button
          onClick={handleGetCurrentLocation}
          disabled={isLoadingLocation}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0A1108] hover:bg-[#0D1F14] text-[#F0FDF4] border border-[#1B2E21] hover:border-[#22C55E]/60 rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Get current location"
        >
          <Navigation className={`w-4 h-4 text-[#22C55E] ${isLoadingLocation ? "animate-pulse" : ""}`} />
          <span className="text-sm font-medium">
            {isLoadingLocation ? "Locating..." : "My Location"}
          </span>
        </button>

        {/* Info Card */}
        <div className="bg-[#0A1108] border border-[#1B2E21] rounded-lg shadow-lg p-3 max-w-[240px]">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#22C55E] mt-0.5 flex-shrink-0" />
            <div className="text-xs text-[#9CA3AF]">
              <p className="font-medium text-[#F0FDF4] mb-1">Click to Select</p>
              <p>Click anywhere on the map or use "My Location" to select a planting site</p>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Location Info Badge */}
      {position && (
        <div className="absolute bottom-4 left-4 z-[1000] bg-[#0A1108] border border-[#1B2E21] rounded-lg shadow-lg p-3 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></div>
            <p className="text-xs font-semibold text-[#F0FDF4]">Location Selected</p>
          </div>
          <div className="text-xs text-[#9CA3AF] space-y-1 font-mono">
            <p>
              <span className="text-[#6B7280]">Lat:</span>{" "}
              <span className="text-[#F0FDF4]">{position[0].toFixed(6)}</span>
            </p>
            <p>
              <span className="text-[#6B7280]">Lng:</span>{" "}
              <span className="text-[#F0FDF4]">{position[1].toFixed(6)}</span>
            </p>
          </div>
        </div>
      )}

      {/* Custom Map Styles */}
      <style>{`
        .leaflet-container {
          background: #f0f0f0 !important;
        }
        .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 8px;
        }
        .leaflet-popup-tip {
          background: white;
        }
      `}</style>
    </div>
  );
};

export default Map;
