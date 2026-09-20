import { useState } from "react";
import { Link } from "react-router";
import { Leaf, MapPin, Sparkles, LogOut, ChevronRight, X } from "lucide-react";
import Map from "../components/Map";

const Dashboard = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setRecommendations(null); // Clear previous recommendations
    setIsPanelOpen(true); // Open panel when location is selected
  };

  const handleGetRecommendations = async () => {
    if (!selectedLocation) {
      alert("Please select a location on the map first");
      return;
    }

    setIsLoadingRecommendations(true);
    
    // TODO: Replace with actual API call to get tree recommendations
    // This is a placeholder - you'll integrate with Gemini AI here
    setTimeout(() => {
      setRecommendations({
        location: {
          lat: selectedLocation[0],
          lng: selectedLocation[1],
        },
        climate: "Tropical",
        soilType: "Loamy",
        rainfall: "1200mm annually",
        temperature: "25-35°C",
        trees: [
          {
            name: "Neem Tree",
            scientificName: "Azadirachta indica",
            suitability: 95,
            benefits: ["Air purification", "Medicinal properties", "Shade"],
            growthRate: "Fast",
            waterRequirement: "Low",
          },
          {
            name: "Peepal Tree",
            scientificName: "Ficus religiosa",
            suitability: 90,
            benefits: ["Oxygen production", "Cultural significance", "Wildlife habitat"],
            growthRate: "Moderate",
            waterRequirement: "Medium",
          },
          {
            name: "Banyan Tree",
            scientificName: "Ficus benghalensis",
            suitability: 85,
            benefits: ["Large canopy", "Erosion control", "Biodiversity support"],
            growthRate: "Slow",
            waterRequirement: "Medium",
          },
        ],
      });
      setIsLoadingRecommendations(false);
    }, 2000);
  };

  return (
    <div className="h-screen flex flex-col bg-[#050B07] text-[#F0FDF4] font-[Inter,sans-serif] overflow-hidden">
      {/* Header */}
      <header className="border-b border-[#1B2E21]/60 bg-[#050B07]/95 backdrop-blur-md z-50">
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
              onClick={() => {/* Add logout logic */}}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#1B2E21] hover:border-[#22C55E]/60 hover:bg-[rgba(255,255,255,0.03)] transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Full Page Map with Sliding Panel */}
      <main className="flex-1 relative overflow-hidden">
        {/* Full Page Map */}
        <div className="absolute inset-0">
          <Map
            onLocationSelect={handleLocationSelect}
            initialPosition={[20.5937, 78.9629]} // Center of India
          />
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
                      <span className="text-[#F0FDF4] font-mono">{selectedLocation[0].toFixed(6)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Longitude:</span>
                      <span className="text-[#F0FDF4] font-mono">{selectedLocation[1].toFixed(6)}</span>
                    </div>
                  </div>
                  {!recommendations && !isLoadingRecommendations && (
                    <button
                      onClick={handleGetRecommendations}
                      className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#22C55E] hover:bg-[#16A34A] text-[#050B07] rounded-lg font-medium transition-colors duration-200"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm">Get AI Recommendations</span>
                    </button>
                  )}
                </div>
              )}

              {/* No Location Selected */}
              {!selectedLocation && !recommendations && (
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
              {isLoadingRecommendations && (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-[#22C55E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-10 h-10 text-[#22C55E] animate-spin" />
                  </div>
                  <p className="text-base text-[#F0FDF4] mb-2 font-medium">Analyzing Location...</p>
                  <p className="text-sm text-[#9CA3AF] px-4">
                    Using Gemini AI to find the best trees for this area
                  </p>
                </div>
              )}

              {/* Recommendations */}
              {recommendations && (
                <div className="space-y-4">
                  {/* Environmental Data */}
                  <div className="bg-[#050B07] border border-[#1B2E21] rounded-lg p-4">
                    <p className="text-xs uppercase tracking-wider text-[#22C55E] mb-3 font-medium">
                      Environmental Analysis
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-[#9CA3AF] text-xs mb-1">Climate</p>
                        <p className="text-[#F0FDF4] font-medium">{recommendations.climate}</p>
                      </div>
                      <div>
                        <p className="text-[#9CA3AF] text-xs mb-1">Soil Type</p>
                        <p className="text-[#F0FDF4] font-medium">{recommendations.soilType}</p>
                      </div>
                      <div>
                        <p className="text-[#9CA3AF] text-xs mb-1">Rainfall</p>
                        <p className="text-[#F0FDF4] font-medium">{recommendations.rainfall}</p>
                      </div>
                      <div>
                        <p className="text-[#9CA3AF] text-xs mb-1">Temperature</p>
                        <p className="text-[#F0FDF4] font-medium">{recommendations.temperature}</p>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Trees */}
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#22C55E] mb-3 font-medium">
                      Recommended Trees ({recommendations.trees.length})
                    </p>
                    <div className="space-y-3">
                      {recommendations.trees.map((tree, index) => (
                        <div
                          key={index}
                          className="bg-[#050B07] border border-[#1B2E21] hover:border-[#22C55E]/40 rounded-lg p-4 transition-colors duration-200"
                        >
                          {/* Tree Header */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-medium text-[#F0FDF4] text-base">{tree.name}</h3>
                              <p className="text-xs text-[#9CA3AF] italic mt-0.5">{tree.scientificName}</p>
                            </div>
                            <div className="flex flex-col items-end ml-3">
                              <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-[#22C55E]">{tree.suitability}</span>
                                <span className="text-xs text-[#9CA3AF]">%</span>
                              </div>
                              <span className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">Match</span>
                            </div>
                          </div>

                          {/* Tree Details */}
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-[#9CA3AF]">Growth Rate:</span>
                              <span className="text-[#F0FDF4] font-medium">{tree.growthRate}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-[#9CA3AF]">Water Need:</span>
                              <span className="text-[#F0FDF4] font-medium">{tree.waterRequirement}</span>
                            </div>
                          </div>

                          {/* Benefits */}
                          <div>
                            <p className="text-xs text-[#9CA3AF] mb-2">Benefits:</p>
                            <div className="flex flex-wrap gap-1.5">
                              {tree.benefits.map((benefit, i) => (
                                <span
                                  key={i}
                                  className="text-xs px-2.5 py-1 bg-[#22C55E]/10 text-[#22C55E] rounded-full border border-[#22C55E]/20"
                                >
                                  {benefit}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
