import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { MapPin, Navigation, Search, Loader2 } from "lucide-react";
import { setSelectedLocation } from "../state/location.slice.js";
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
function LocationMarker({ position, setPosition, dispatch }) {
  useMapEvents({
    click(e) {
      const newPosition = [e.latlng.lat, e.latlng.lng];
      setPosition(newPosition);
      
      // Dispatch to Redux
      dispatch(setSelectedLocation({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      }));
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

// Map Controller for flying to coordinates
function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 13, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

const Map = ({ initialPosition = [20.5937, 78.9629] }) => {
  const dispatch = useDispatch();
  const [position, setPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const performSearch = async (query) => {
    setIsSearching(true);
    try {
      const params = new URLSearchParams({
        q: query,
        format: "json",
        limit: "5",
        addressdetails: "1"
      });
      const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`);
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching location:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectResult = (result) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    const newPosition = [lat, lon];
    
    setPosition(newPosition);
    setMapCenter(newPosition);
    
    dispatch(setSelectedLocation({
      latitude: lat,
      longitude: lon,
    }));
    
    setSearchQuery(result.display_name);
    setShowResults(false);
  };

  // Get user's current location
  const handleGetCurrentLocation = useCallback(() => {
    setIsLoadingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPosition = [
            pos.coords.latitude,
            pos.coords.longitude,
          ];
          setPosition(newPosition);
          setMapCenter(newPosition);
          
          // Dispatch to Redux
          dispatch(setSelectedLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }));
          
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
  }, [dispatch]);

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
          dispatch={dispatch}
        />
        <MapController center={mapCenter} />
      </MapContainer>

      {/* Top Search Bar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-md z-[1000] px-4">
        <div className="relative bg-[#0A1108] border border-[#1B2E21] rounded-lg shadow-lg flex items-center p-1">
          <div className="pl-3 pr-2 text-[#9CA3AF]">
            {isSearching ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </div>
          <input
            type="text"
            placeholder="Search for a location..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            className="flex-1 bg-transparent text-[#F0FDF4] placeholder-[#6B7280] text-sm focus:outline-none py-2"
          />
        </div>
        
        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute top-full left-4 right-4 mt-2 bg-[#0A1108]/98 backdrop-blur-md border border-[#1B2E21] rounded-lg shadow-2xl overflow-hidden">
            <ul className="max-h-64 overflow-y-auto custom-scrollbar">
              {searchResults.map((result, idx) => (
                <li key={result.place_id || idx} className="border-b border-[#1B2E21] last:border-0">
                  <button
                    onClick={() => handleSelectResult(result)}
                    className="w-full text-left px-4 py-3 hover:bg-[#1B2E21]/50 transition-colors focus:outline-none"
                  >
                    <p className="text-sm text-[#F0FDF4] font-medium truncate">
                      {result.display_name.split(',')[0]}
                    </p>
                    <p className="text-xs text-[#9CA3AF] truncate mt-0.5">
                      {result.display_name.split(',').slice(1).join(',')}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Floating Controls */}
      <div className="absolute top-20 left-4 z-[1000] flex flex-col gap-3">
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
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #050B07;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1B2E21;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #22C55E;
        }
      `}</style>
    </div>
  );
};

export default Map;
