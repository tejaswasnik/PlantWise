import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { Leaf, MapPin, Sparkles, LogOut, ChevronRight, X } from "lucide-react";
import { analyzeLocation } from "../state/location.slice.js";
import { setUser } from "../../auth/state/auth.slice.js";
import axios from "axios";
import Map from "../components/Map";

const Dashboard = () => {
  const dispatch = useDispatch();
  
  // Get Redux state
  const { selectedLocation, analysis, loading, error } = useSelector((state) => state.location);
  
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, {
        withCredentials: true,
      });
      dispatch(setUser(null));
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleAnalyzeLocation = () => {
    if (!selectedLocation) {
      alert("Please select a location on the map first");
      return;
    }

    dispatch(analyzeLocation({
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    }));
  };

  return (
    <div className="h-screen flex flex-col bg-[#050B07] text-[#F0FDF4] font-[Inter,sans-serif] overflow-hidden animate-fade-in">
      {/* Header */}
      <header className="border-b border-[#1B2E21]/60 bg-[#050B07]/95 backdrop-blur-md z-50 animate-fade-in-up stagger-1 opacity-0">
        <div className="px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <Leaf className="w-7 h-7 text-[#22C55E] group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-[Outfit,sans-serif] text-lg font-medium tracking-wide">
                PlantWise
              </span>
            </Link>

            {/* Center - AI Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
              <span className="text-xs font-medium text-[#22C55E]">AI POWERED</span>
            </div>

            {/* User Actions */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#1B2E21] hover:border-[#22C55E]/60 hover:bg-[rgba(255,255,255,0.03)] active:scale-[0.98] transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Full Page Map with Sliding Panel */}
      <main className="flex-1 relative overflow-hidden animate-fade-in-up stagger-2 opacity-0">
        {/* Full Page Map */}
        <div className="absolute inset-0">
          <Map initialPosition={[20.5937, 78.9629]} />
        </div>

        {/* Sliding Panel Toggle Button */}
        {!isPanelOpen && (
          <button
            onClick={() => setIsPanelOpen(true)}
            className="absolute top-4 right-4 z-[1000] flex items-center gap-2 px-4 py-3 bg-[#0A1108] border border-[#1B2E21] hover:border-[#22C55E]/60 rounded-lg shadow-lg transition-all duration-200"
          >
            <MapPin className="w-5 h-5 text-[#22C55E]" />
            <span className="text-sm font-medium">Show Details</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* Right Sliding Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full sm:w-[400px] lg:w-[450px] bg-[#0A1108]/98 backdrop-blur-md border-l border-[#1B2E21] shadow-2xl z-[1000] transform transition-transform duration-300 ease-in-out ${
            isPanelOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#1B2E21]">
            <h2 className="text-lg font-[Outfit,sans-serif] font-medium flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#22C55E]" />
              Location Details
            </h2>
            <button
              onClick={() => setIsPanelOpen(false)}
              className="p-2 hover:bg-[#1B2E21]/40 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Panel Content - Scrollable */}
          <div className="h-[calc(100%-73px)] overflow-y-auto custom-scrollbar">
            <div className="p-4 space-y-4">
              {/* Selected Location Info */}
              {selectedLocation && (
                <div className="bg-[#050B07] border border-[#1B2E21] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-[#22C55E]" />
                    <p className="text-sm font-medium text-[#F0FDF4]">Selected Location</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Latitude:</span>
                      <span className="text-[#F0FDF4] font-mono">{selectedLocation.latitude.toFixed(6)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Longitude:</span>
                      <span className="text-[#F0FDF4] font-mono">{selectedLocation.longitude.toFixed(6)}</span>
                    </div>
                  </div>
                  {!analysis && !loading && (
                    <button
                      onClick={handleAnalyzeLocation}
                      className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#22C55E] hover:bg-[#16A34A] hover:-translate-y-0.5 active:scale-[0.98] text-[#050B07] rounded-lg font-medium transition-all duration-200"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm">Analyze Location</span>
                    </button>
                  )}
                </div>
              )}

              {/* No Location Selected */}
              {!selectedLocation && !analysis && (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-[#22C55E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-10 h-10 text-[#22C55E]" />
                  </div>
                  <p className="text-base text-[#F0FDF4] mb-2 font-medium">No Location Selected</p>
                  <p className="text-sm text-[#9CA3AF] px-4">
                    Click anywhere on the map to select a planting location and get AI-powered recommendations
                  </p>
                </div>
              )}

              {/* Loading State */}
              {loading && (
                <div className="text-center py-16 animate-fade-in">
                  <div className="w-20 h-20 bg-[#22C55E]/10 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <Sparkles className="w-10 h-10 text-[#22C55E] animate-pulse-slow" />
                    <span className="absolute inset-0 rounded-full border-2 border-[#22C55E] border-t-transparent animate-spin opacity-50"></span>
                  </div>
                  <p className="text-base text-[#F0FDF4] mb-2 font-medium">Analyzing...</p>
                  <p className="text-sm text-[#9CA3AF] px-4 animate-pulse">
                    Evaluating environmental conditions
                  </p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-900/20 border border-red-900/40 rounded-lg p-4">
                  <p className="text-sm text-red-400">{error}</p>
                  <button
                    onClick={handleAnalyzeLocation}
                    className="w-full mt-3 px-4 py-2 bg-[#22C55E] hover:bg-[#16A34A] text-[#050B07] rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Analysis Result */}
              {analysis && (
                <div className="space-y-4">
                  {/* Location Info */}
                  <div className="bg-[#050B07] border border-[#1B2E21] rounded-lg p-4">
                    <p className="text-xs uppercase tracking-wider text-[#22C55E] mb-3 font-medium">
                      Location
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#9CA3AF]">Latitude:</span>
                        <span className="text-[#F0FDF4] font-mono">
                          {analysis.location.latitude.toFixed(6)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#9CA3AF]">Longitude:</span>
                        <span className="text-[#F0FDF4] font-mono">
                          {analysis.location.longitude.toFixed(6)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Environmental Conditions */}
                  {analysis.environment && (
                    <div className="bg-[#050B07] border border-[#1B2E21] rounded-lg p-4 animate-fade-in-up stagger-1 opacity-0">
                      <p className="text-xs uppercase tracking-wider text-[#22C55E] mb-3 font-medium">
                        Environmental Conditions
                      </p>
                      <div className="space-y-3">
                        {/* Temperature */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🌡</span>
                            <span className="text-sm text-[#9CA3AF]">Temperature</span>
                          </div>
                          <span className="text-sm text-[#F0FDF4] font-medium">
                            {analysis.environment.temperature.value} {analysis.environment.temperature.unit}
                          </span>
                        </div>

                        {/* Humidity */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">💧</span>
                            <span className="text-sm text-[#9CA3AF]">Humidity</span>
                          </div>
                          <span className="text-sm text-[#F0FDF4] font-medium">
                            {analysis.environment.humidity.value} {analysis.environment.humidity.unit}
                          </span>
                        </div>

                        {/* Precipitation */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🌧</span>
                            <span className="text-sm text-[#9CA3AF]">Precipitation</span>
                          </div>
                          <span className="text-sm text-[#F0FDF4] font-medium">
                            {analysis.environment.precipitation.value} {analysis.environment.precipitation.unit}
                          </span>
                        </div>

                        {/* Wind Speed */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">💨</span>
                            <span className="text-sm text-[#9CA3AF]">Wind Speed</span>
                          </div>
                          <span className="text-sm text-[#F0FDF4] font-medium">
                            {analysis.environment.windSpeed.value} {analysis.environment.windSpeed.unit}
                          </span>
                        </div>

                        {/* Weather Condition */}
                        {analysis.environment.weather && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">☁️</span>
                              <span className="text-sm text-[#9CA3AF]">Weather</span>
                            </div>
                            <span className="text-sm text-[#F0FDF4] font-medium">
                              {analysis.environment.weather.description}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* AI Recommendations */}
                  {analysis.recommendations && (
                    <div className="space-y-3">
                      {/* Summary */}
                      {analysis.recommendations.summary && (
                        <div className="bg-[#050B07] border border-[#1B2E21] rounded-lg p-4 animate-fade-in-up stagger-2 opacity-0">
                          <p className="text-xs uppercase tracking-wider text-[#22C55E] mb-2 font-medium">
                            PlantWise Analysis
                          </p>
                          <p className="text-sm text-[#9CA3AF] leading-relaxed">
                            {analysis.recommendations.summary}
                          </p>
                        </div>
                      )}

                      {/* Recommendations Header */}
                      <div className="flex items-center justify-between">
                        <p className="text-xs uppercase tracking-wider text-[#22C55E] font-medium">
                          Recommended Plants ({analysis.recommendations.recommendations?.length || 0})
                        </p>
                      </div>

                      {/* Plant Cards */}
                      {analysis.recommendations.recommendations?.map((plant, index) => (
                        <div
                          key={index}
                          style={{ animationDelay: `${index * 100 + 250}ms` }}
                          className="opacity-0 animate-fade-in-up bg-[#050B07] border border-[#1B2E21] hover:border-[#22C55E]/40 hover:-translate-y-1 hover:shadow-lg rounded-lg p-4 transition-all duration-300"
                        >
                          {/* Plant Header */}
                          <div className="flex items-start gap-2 mb-3">
                            <span className="text-2xl">🌳</span>
                            <div className="flex-1">
                              <h3 className="font-medium text-[#F0FDF4] text-base">{plant.name}</h3>
                              <p className="text-xs text-[#9CA3AF] italic">{plant.scientificName}</p>
                            </div>
                          </div>

                          {/* Plant Attributes */}
                          <div className="grid grid-cols-3 gap-2 mb-3">
                            <div className="bg-[#0A1108] rounded px-2 py-1.5">
                              <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-0.5">
                                Suitability
                              </p>
                              <p className="text-xs text-[#F0FDF4] font-medium">{plant.suitability}</p>
                            </div>
                            <div className="bg-[#0A1108] rounded px-2 py-1.5">
                              <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-0.5">
                                Water
                              </p>
                              <p className="text-xs text-[#F0FDF4] font-medium">{plant.waterRequirement}</p>
                            </div>
                            <div className="bg-[#0A1108] rounded px-2 py-1.5">
                              <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-0.5">
                                Maintenance
                              </p>
                              <p className="text-xs text-[#F0FDF4] font-medium">{plant.maintenance}</p>
                            </div>
                          </div>

                          {/* Reason */}
                          <div className="mb-3">
                            <p className="text-xs text-[#9CA3AF] mb-1.5">Why suitable:</p>
                            <p className="text-xs text-[#F0FDF4] leading-relaxed">{plant.reason}</p>
                          </div>

                          {/* Considerations */}
                          {plant.considerations && (
                            <div>
                              <p className="text-xs text-[#9CA3AF] mb-1.5">Considerations:</p>
                              <p className="text-xs text-[#F0FDF4] leading-relaxed">{plant.considerations}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Data Sources */}
                  {analysis.source && (
                    <div className="bg-[#050B07] border border-[#1B2E21] rounded-lg p-3">
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[#9CA3AF]">Environmental Data:</span>
                          <span className="text-[#22C55E] font-medium">{analysis.source.environmental}</span>
                        </div>
                        {analysis.source.ai && (
                          <div className="flex items-center justify-between">
                            <span className="text-[#9CA3AF]">AI Recommendations:</span>
                            <span className="text-[#22C55E] font-medium">{analysis.source.ai}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <style>{`
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

export default Dashboard;
