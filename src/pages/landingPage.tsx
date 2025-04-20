import { Button } from "@/components/ui/button";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const { login, isAuthenticated, user } = useKindeAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/feed");
    }
  }, [isAuthenticated, user, navigate]);
  return (
    <div className="min-h-screen bg-[#0D1117] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Purple glow effect */}
      <div className="absolute bottom-0 w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[128px] opacity-50" />

      <div className="z-10 flex flex-col items-center px-4">
        {/* Logo */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pFVH3qh5R6jBqp7crQtaAxXuC8QAWE.png"
          alt="daily.dev logo"
          className="w-32 mb-6"
        />

        {/* Heading */}
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF3B9A] to-[#C239ED] bg-clip-text text-transparent">
          Let's jump back in!
        </h1>

        {/* Description */}
        <div className="max-w-md mb-8 text-center text-white/90">
          <p>
            Please resume onboarding to unlock
            <br />
            the entire feature suite of PrepPro.
            <br />
            The magic awaits inside! ✨
          </p>
        </div>

        {/* Button */}
        <Button
          className="flex items-center gap-2 px-8 py-3 font-medium text-black transition-colors bg-white rounded-lg hover:bg-white/90"
          onClick={() => login()}
        >
          Resume Onboarding
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
