
import { useState } from "react";
import { useAuth } from "../hook/useAuth.js";
import { Link, useNavigate } from "react-router";
import { Leaf, ArrowLeft, Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const user = await handleRegister({
        email: formData.email,
        password: formData.password,
        fullname: formData.fullname,
      });
      // Redirect after successful registration
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /* Shared input classes */
  const inputClasses = [
    "w-full px-4 py-3.5 rounded-lg",
    "bg-[rgba(255,255,255,0.03)]",
    "border border-[#1B2E21]",
    "text-[#F0FDF4] placeholder-[#4B5563]",
    "text-sm font-[Inter,sans-serif]",
    "transition-all duration-200",
    "focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E]/30",
  ].join(" ");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#050B07] text-[#F0FDF4] font-[Inter,sans-serif] antialiased selection:bg-[#22C55E] selection:text-[#050B07] relative overflow-x-hidden">
      {/* ── Left Column: Editorial Hero Visual (Background on Mobile, 50% on Desktop) ── */}
      <aside className="absolute inset-0 z-0 lg:relative w-full lg:w-1/2 lg:min-h-screen lg:h-screen lg:sticky lg:top-0 flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden border-none lg:border-r border-[#1B2E21]/60">
        {/* Background Hero Visual Image */}
        <img
          alt="Lush green forest canopy representing nature and biodiversity"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 filter brightness-[0.75] contrast-[1.1]"
          src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1920&q=80"
        />
        {/* Gradient & Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B07] via-[#050B07]/40 to-[#050B07]/70 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-[#050B07]/90 pointer-events-none"></div>
        <div className="absolute inset-0 ring-1 ring-inset ring-white/5 pointer-events-none"></div>

        {/* Top Left Logo Anchor (Desktop only) */}
        <div className="hidden lg:block relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 transition-opacity duration-300 hover:opacity-90"
          >
            <Leaf className="w-8 h-8 text-[#22C55E]" />
            <span className="font-[Outfit,sans-serif] text-xl font-medium tracking-wide text-white">
              PlantWise
            </span>
          </Link>
        </div>

        {/* Bottom Editorial Taglines & Nature Accent (Desktop only) */}
        <div className="hidden lg:block relative z-10 mt-auto pt-16 lg:pt-0 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 mb-4 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span className="font-[Inter,sans-serif] text-[11px] tracking-[0.2em] uppercase text-[#22C55E] font-medium">
              Intelligent Botanics
            </span>
          </div>
          <h2 className="font-[Outfit,sans-serif] font-light text-2xl sm:text-3xl lg:text-4xl text-[#F0FDF4] leading-tight tracking-tight">
            Plant the Right Tree in the Right Place
          </h2>
          <p className="font-[Inter,sans-serif] text-sm sm:text-base text-[#9CA3AF] mt-3 leading-relaxed">
            Join the movement to create greener, more sustainable environments with AI-powered tree recommendations.
          </p>
          {/* Subtle Spec Rule */}
          <div className="mt-8 pt-6 border-t border-[#1B2E21]/80 flex items-center justify-between text-[11px] text-[#6B7280] font-mono uppercase tracking-wider">
            <span>Environmental Data</span>
            <span>Ollama AI Powered</span>
          </div>
        </div>
      </aside>

      {/* ── Right Column: Registration Form Container (50% on Desktop) ── */}
      <section className="relative z-10 w-full lg:w-1/2 flex flex-col justify-between min-h-screen bg-gradient-to-t from-[#050B07] via-[#050B07]/90 to-[#050B07]/40 lg:bg-none lg:bg-[#050B07] lg:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] lg:from-[#0D1F14]/40 lg:via-[#050B07] lg:to-[#050B07]">
        {/* Top Bar with Return Action */}
        <header className="w-full pt-8 px-8 sm:px-12 flex items-center justify-between z-10">
          {/* Mobile Logo Visible only on small viewports */}
          <div className="lg:hidden flex items-center gap-2">
            <Link to="/" className="inline-flex items-center gap-2">
              <Leaf className="w-6 h-6 text-[#22C55E]" />
              <span className="font-[Outfit,sans-serif] text-lg font-medium text-white">
                PlantWise
              </span>
            </Link>
          </div>
          <div className="hidden lg:block"></div>
          <Link
            to="/"
            className="font-[Inter,sans-serif] text-xs tracking-widest text-[#9CA3AF] uppercase hover:text-[#F0FDF4] transition-colors duration-200 flex items-center gap-1.5 group ml-auto"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Return Home
          </Link>
        </header>

        {/* Form Content Module */}
        <main className="flex-1 flex items-center justify-center px-6 sm:px-12 py-10 md:py-14">
          <div className="w-full max-w-[440px]">
            {/* Heading Module */}
            <div className="mb-9 animate-fade-in-up stagger-1">
              <h1 className="font-[Outfit,sans-serif] font-light text-[36px] sm:text-[40px] leading-[1.15] tracking-tight text-[#F0FDF4]">
                Create Account
              </h1>
              <p className="font-[Inter,sans-serif] font-normal text-[14px] text-[#9CA3AF] mt-2.5 tracking-normal">
                Join PlantWise and start making informed planting decisions
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="w-full">
              {/* Field Stack */}
              <div className="space-y-5">
                {/* Field 1: Full Name */}
                <div className="animate-fade-in-up stagger-2">
                  <label
                    htmlFor="fullname"
                    className="block font-[Inter,sans-serif] text-xs uppercase tracking-widest text-[#9CA3AF] font-medium mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      id="fullname"
                      name="fullname"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="e.g. Jane Smith"
                      value={formData.fullname}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Field 2: Email */}
                <div className="animate-fade-in-up stagger-3">
                  <label
                    htmlFor="email"
                    className="block font-[Inter,sans-serif] text-xs uppercase tracking-widest text-[#9CA3AF] font-medium mb-2"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="jane@greenearth.org"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Field 3: Password */}
                <div className="animate-fade-in-up stagger-4">
                  <label
                    htmlFor="password"
                    className="block font-[Inter,sans-serif] text-xs uppercase tracking-widest text-[#9CA3AF] font-medium mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      placeholder="••••••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className={`${inputClasses} pl-4 pr-12`}
                    />
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#9CA3AF] hover:text-[#F0FDF4] transition-colors duration-200 focus:outline-none cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action / Submit Button */}
              <div className="animate-fade-in-up stagger-5">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full h-12 mt-8 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-[#050B07] font-[Inter,sans-serif] font-medium tracking-wide transition-all duration-200 flex items-center justify-center shadow-none cursor-pointer ${isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:-translate-y-0.5 active:scale-[0.98]'}`}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#050B07]/30 border-t-[#050B07] rounded-full animate-spin"></span>
                      Creating...
                    </span>
                  ) : "Create Account"}
                </button>
              </div>

              {/* Form Inline Footer Links */}
              <div className="mt-6 text-center animate-fade-in-up stagger-6">
                <p className="text-xs font-[Inter,sans-serif] text-[#9CA3AF]">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-[#22C55E] hover:underline font-medium ml-1 transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </main>

        {/* Grounding Micro-Footer */}
        <footer className="w-full pb-8 px-8 text-center">
          <p className="text-[11px] font-[Inter,sans-serif] text-[#4B5563] tracking-wider">
            Protected by PlantWise Environmental Data Security · All Rights Reserved
          </p>
        </footer>
      </section>
    </div>
  );
};

export default Register
