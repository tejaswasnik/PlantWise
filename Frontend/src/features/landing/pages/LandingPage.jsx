import { Link } from "react-router";
import { Leaf, MapPin, Wind, Droplets, CloudRain, Thermometer, BrainCircuit, ShieldCheck, ArrowRight, Activity, Map as MapIcon, Trees } from "lucide-react";
import { AnimatedSection } from "../../../components/AnimatedSection.jsx";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`min-h-screen bg-[#050B07] font-[Inter,sans-serif] text-[#F0FDF4] overflow-x-hidden selection:bg-[#22C55E]/20 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-[#050B07]/80 backdrop-blur-md border-b border-[#1B2E21]/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group animate-fade-in-up">
            <Leaf className="w-8 h-8 text-[#22C55E] group-hover:-rotate-12 transition-transform duration-300" />
            <span className="font-[Outfit,sans-serif] text-xl font-bold tracking-tight text-[#F0FDF4]">PlantWise</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#9CA3AF] animate-fade-in-up stagger-1">
            <a href="#how-it-works" className="hover:text-[#F0FDF4] transition-colors duration-200">How It Works</a>
            <a href="#why-plantwise" className="hover:text-[#F0FDF4] transition-colors duration-200">Why PlantWise</a>
          </div>
          <div className="flex items-center gap-4 animate-fade-in-up stagger-2">
            <Link to="/login" className="hidden sm:block text-sm font-medium text-[#9CA3AF] hover:text-[#F0FDF4] transition-colors duration-200">
              Sign In
            </Link>
            <Link to="/dashboard" className="px-5 py-2.5 bg-[#22C55E] text-[#050B07] text-sm font-medium rounded-full hover:bg-[#16A34A] hover:-translate-y-0.5 hover:shadow-lg hover:text-[#050B07] transition-all duration-300 active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative px-6 pt-24 pb-32 lg:pt-36 lg:pb-40 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 animate-fade-in-up stagger-1">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
                <span className="text-xs font-semibold text-[#22C55E] tracking-wide uppercase">AI-Assisted Environmental Intelligence</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold font-[Outfit,sans-serif] leading-[1.1] tracking-tight text-[#F0FDF4] animate-fade-in-up stagger-2">
                Plant the right tree.<br />
                <span className="text-[#9CA3AF]">For the right place.</span>
              </h1>
              <p className="text-lg text-[#9CA3AF] max-w-xl leading-relaxed animate-fade-in-up stagger-3">
                PlantWise combines location data, environmental conditions, and AI-assisted analysis to help identify plant species that may be suitable for a selected location. Make plantation decisions based on the environment, not guesswork.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up stagger-4">
                <Link to="/dashboard" className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-[#22C55E] text-[#050B07] text-base font-medium rounded-full hover:bg-[#16A34A] hover:-translate-y-1 hover:shadow-xl active:scale-95 transition-all duration-300 group shadow-[0_0_20px_rgba(34,197,94,0.15)]">
                  Analyze a Location
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="#how-it-works" className="inline-flex justify-center items-center px-8 py-4 bg-transparent border border-[#22C55E]/20 text-[#F0FDF4] text-base font-medium rounded-full hover:bg-[rgba(255,255,255,0.03)] hover:border-[#22C55E]/40 active:scale-95 transition-all duration-300">
                  How It Works
                </a>
              </div>
            </div>
            
            <div className="relative animate-fade-in-up stagger-5">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#22C55E]/20 to-transparent rounded-[2.5rem] blur-3xl -z-10 transform rotate-6 animate-pulse-slow"></div>
              
              <div className="relative bg-[#0A1108] rounded-[2rem] p-6 shadow-2xl border border-[#1B2E21] aspect-square overflow-hidden flex flex-col justify-between group hover:-translate-y-2 hover:shadow-3xl transition-all duration-500">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#22C55E_1px,_transparent_1px)] bg-[size:24px_24px]"></div>
                
                <div className="relative flex justify-between items-start z-10">
                  <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2 text-[#F0FDF4] text-sm font-mono animate-fade-in-up stagger-6">
                    <MapPin className="w-4 h-4 text-[#22C55E]" />
                    20.0059° N, 73.7897° E
                  </div>
                  <div className="bg-[#22C55E] text-[#050B07] w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-[0_0_20px_rgba(34,197,94,0.4)] relative animate-fade-in-up stagger-7">
                    <MapIcon className="w-6 h-6" />
                    <span className="absolute inset-0 rounded-full border border-[#22C55E] animate-ping opacity-75"></span>
                  </div>
                </div>
                
                <div className="relative z-10 grid grid-cols-2 gap-4 mt-8">
                  {[
                    { icon: Thermometer, label: "Temp", value: "22.4°C" },
                    { icon: Droplets, label: "Humidity", value: "78%" },
                    { icon: CloudRain, label: "Precip", value: "0.4mm" },
                    { icon: Wind, label: "Wind", value: "8.2 km/h" }
                  ].map((stat, i) => (
                    <div key={i} style={{ animationDelay: `${500 + i * 100}ms` }} className="opacity-0 animate-fade-in-up bg-[#050B07] backdrop-blur-md rounded-2xl p-4 border border-[#1B2E21] transform transition-all duration-300 hover:-translate-y-1 hover:border-[#22C55E]/40">
                      <stat.icon className="w-5 h-5 text-[#22C55E] mb-2" />
                      <div className="text-xl font-bold text-[#F0FDF4]">{stat.value}</div>
                      <div className="text-xs text-[#9CA3AF]">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="opacity-0 animate-fade-in-up relative z-10 mt-6 bg-[#22C55E]/10 backdrop-blur-md rounded-2xl p-5 border border-[#22C55E]/20" style={{ animationDelay: '900ms' }}>
                  <div className="flex items-center gap-3">
                    <div className="bg-[#22C55E] p-2 rounded-xl">
                      <Trees className="w-6 h-6 text-[#050B07]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#F0FDF4]">Mangifera indica</div>
                      <div className="text-xs text-[#22C55E]">Suitability: High</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-32 bg-[#0A1108] text-[#F0FDF4] border-t border-[#1B2E21] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#22C55E]/30 to-transparent"></div>
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-24">
              <h2 className="text-4xl font-bold font-[Outfit,sans-serif] mb-6">From location to recommendation.</h2>
              <p className="text-lg text-[#9CA3AF]">A seamless four-step workflow bringing environmental context to plantation decisions.</p>
            </AnimatedSection>
            
            <div className="grid md:grid-cols-4 gap-8 relative">
              <AnimatedSection className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-[#1B2E21] -z-10"></AnimatedSection>
              
              {[
                { step: "01", title: "Choose a location", desc: "Search for a place or select a point directly on the interactive map." },
                { step: "02", title: "Understand the environment", desc: "PlantWise retrieves available environmental conditions for the selected location." },
                { step: "03", title: "Analyze with Gemini", desc: "Gemini evaluates the available conditions and generates structured plant recommendations." },
                { step: "04", title: "Plant with context", desc: "Explore potentially suitable species and understand why they were recommended." }
              ].map((item, i) => (
                <AnimatedSection key={i} staggerDelay={i * 150} className="relative group">
                  <div className="w-24 h-24 bg-[#050B07] rounded-3xl border border-[#22C55E]/30 flex items-center justify-center text-3xl font-bold font-mono text-[#22C55E] mb-8 shadow-[0_0_30px_rgba(34,197,94,0.05)] group-hover:-translate-y-2 group-hover:shadow-[0_0_40px_rgba(34,197,94,0.15)] group-hover:border-[#22C55E]/60 transition-all duration-300">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">{item.desc}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Why PlantWise */}
        <section id="why-plantwise" className="py-32 bg-[#050B07]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <AnimatedSection>
                <h2 className="text-4xl lg:text-5xl font-bold font-[Outfit,sans-serif] leading-tight mb-8">
                  Planting a tree is easy.<br />
                  <span className="text-[#9CA3AF]">Choosing where it belongs is harder.</span>
                </h2>
                <div className="space-y-6 text-[#9CA3AF] text-lg">
                  <p>
                    Plantation decisions often depend on a multitude of factors: temperature fluctuations, humidity levels, precipitation, wind patterns, and the specific geographic location.
                  </p>
                  <p>
                    PlantWise brings available environmental information into one decision-support workflow. We help identify potentially suitable species based on actual environmental data, bridging the gap between intention and informed action.
                  </p>
                </div>
              </AnimatedSection>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-12">
                  <AnimatedSection staggerDelay={0}>
                    <div className="bg-[#0A1108] p-8 rounded-[2rem] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-[#1B2E21] hover:border-[#22C55E]/40">
                      <Thermometer className="w-8 h-8 text-[#22C55E] mb-4" />
                      <h4 className="font-bold text-[#F0FDF4] mb-2">Climate Data</h4>
                      <p className="text-sm text-[#9CA3AF]">Accurate temperature and weather patterns.</p>
                    </div>
                  </AnimatedSection>
                  <AnimatedSection staggerDelay={100}>
                    <div className="bg-[#0A1108] p-8 rounded-[2rem] shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-[#1B2E21] hover:border-[#22C55E]/40">
                      <Activity className="w-8 h-8 text-[#22C55E] mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <h4 className="font-bold text-white mb-2">Geospatial</h4>
                      <p className="text-sm text-[#9CA3AF]">Pinpoint accuracy for localized conditions.</p>
                    </div>
                  </AnimatedSection>
                </div>
                <div className="space-y-4">
                  <AnimatedSection staggerDelay={150}>
                    <div className="bg-[#22C55E]/10 p-8 rounded-[2rem] border border-[#22C55E]/20 hover:bg-[#22C55E]/20 hover:-translate-y-1 transition-all duration-300">
                      <BrainCircuit className="w-8 h-8 text-[#F0FDF4] mb-4" />
                      <h4 className="font-bold text-[#F0FDF4] mb-2">AI Analysis</h4>
                      <p className="text-sm text-[#9CA3AF]">Intelligent matching of species to conditions.</p>
                    </div>
                  </AnimatedSection>
                  <AnimatedSection staggerDelay={250}>
                    <div className="bg-[#0A1108] p-8 rounded-[2rem] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-[#1B2E21] hover:border-[#22C55E]/40">
                      <MapPin className="w-8 h-8 text-[#22C55E] mb-4" />
                      <h4 className="font-bold text-[#F0FDF4] mb-2">Location Context</h4>
                      <p className="text-sm text-[#9CA3AF]">Data driven by real-world geography.</p>
                    </div>
                  </AnimatedSection>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Responsible AI */}
        <AnimatedSection className="py-24 bg-[#0A1108] border-y border-[#1B2E21]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <ShieldCheck className="w-12 h-12 text-[#9CA3AF] mx-auto mb-6" />
            <h2 className="text-3xl font-bold font-[Outfit,sans-serif] text-[#F0FDF4] mb-6">Good decisions need good data.</h2>
            <p className="text-lg text-[#9CA3AF] leading-relaxed">
              PlantWise recommendations are based on the environmental information currently available to the system. Factors such as soil properties, groundwater, land use, biodiversity, and long-term site conditions may require additional analysis. Our goal is to provide a strong data-driven starting point for your environmental initiatives.
            </p>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <section className="py-32 bg-[#0A1108] border-t border-[#1B2E21] text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#22C55E_1px,_transparent_1px)] bg-[size:32px_32px] animate-pulse-slow"></div>
          <AnimatedSection className="relative z-10 max-w-3xl mx-auto px-6">
            <h2 className="text-5xl font-bold font-[Outfit,sans-serif] text-[#F0FDF4] mb-6">Find a better place to plant.</h2>
            <p className="text-xl text-[#9CA3AF] mb-12">Select a location and explore what PlantWise recommends based on environmental data.</p>
            <Link to="/dashboard" className="inline-flex justify-center items-center gap-2 px-10 py-5 bg-[#22C55E] text-[#050B07] text-lg font-bold rounded-full hover:bg-[#16A34A] active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:shadow-[0_0_50px_rgba(34,197,94,0.3)] group">
              Analyze a Location <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#050B07] pt-20 pb-10 text-[#9CA3AF]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <Leaf className="w-6 h-6 text-[#22C55E] group-hover:-rotate-12 transition-transform duration-300" />
              <span className="font-[Outfit,sans-serif] text-xl font-bold text-[#F0FDF4] tracking-tight">PlantWise</span>
            </Link>
            <p className="text-sm max-w-xs">Right Tree. Right Place. AI-assisted plant recommendations based on real environmental conditions.</p>
          </div>
          <div>
            <h4 className="text-[#F0FDF4] font-semibold mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/dashboard" className="hover:text-[#F0FDF4] transition-colors duration-200">Dashboard</Link></li>
              <li><a href="#how-it-works" className="hover:text-[#F0FDF4] transition-colors duration-200">How It Works</a></li>
              <li><a href="#why-plantwise" className="hover:text-[#F0FDF4] transition-colors duration-200">Why PlantWise</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#F0FDF4] font-semibold mb-6">Powered By</h4>
            <ul className="space-y-4 text-sm">
              <li>Open-Meteo</li>
              <li>OpenStreetMap</li>
              <li>Google Gemini</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 border-t border-[#1B2E21] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© {new Date().getFullYear()} PlantWise. College Project.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
            System Operational
          </div>
        </div>
      </footer>
    </div>
  );
}
