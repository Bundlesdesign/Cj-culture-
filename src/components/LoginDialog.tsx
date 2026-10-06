
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";
import { toast } from "sonner";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ThreadBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden rounded-lg">
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="threadGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A8B0AB" />
            <stop offset="50%" stopColor="#B1A6D2" />
            <stop offset="100%" stopColor="#D8CAB8" />
          </linearGradient>
        </defs>
        <path
          fill="none"
          stroke="url(#threadGrad)"
          strokeWidth="2"
          d="M0,300 Q200,350 400,300 T800,300"
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0,300 Q200,350 400,300 T800,300;
              M0,300 Q200,250 400,300 T800,300;
              M0,300 Q200,380 400,280 T800,320;
              M0,300 Q200,350 400,300 T800,300
            "
          />
        </path>
        <path
          fill="none"
          stroke="url(#threadGrad)"
          strokeWidth="1.5"
          d="M0,200 Q300,150 600,200 T800,180"
          opacity="0.6"
        >
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
              M0,200 Q300,150 600,200 T800,180;
              M0,200 Q300,220 600,160 T800,200;
              M0,200 Q300,130 600,220 T800,160;
              M0,200 Q300,150 600,200 T800,180
            "
          />
        </path>
        <path
          fill="none"
          stroke="url(#threadGrad)"
          strokeWidth="1"
          d="M0,400 Q400,450 800,400"
          opacity="0.4"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0,400 Q400,450 800,400;
              M0,400 Q400,380 800,420;
              M0,400 Q400,470 800,380;
              M0,400 Q400,450 800,400
            "
          />
        </path>
      </svg>
    </div>
  );
};

const LoginDialog = ({ open, onOpenChange }: LoginDialogProps) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Welcome back to CT Collections", {
      description: `Signed in as ${loginData.email || 'Client'}`
    });
    onOpenChange(false);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    toast.success("Privilege Account Created", {
      description: `Welcome to the CT Collections atelier, ${signupData.name || 'Client'}`
    });
    onOpenChange(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            className="relative w-full max-w-md mx-4"
            initial={{ scale: 0.8, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 100 }}
            transition={{ 
              type: 'spring', 
              stiffness: 200, 
              damping: 20,
              duration: 0.6
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-[#F7F4F2] rounded-2xl p-8 shadow-2xl border border-[#A8B0AB]/20">
              <ThreadBackground />
              
              <button
                onClick={() => onOpenChange(false)}
                className="absolute right-4 top-4 text-[#A8B0AB] hover:text-[#1E1E1E] transition-colors duration-200 z-10"
              >
                <X size={20} />
              </button>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h2 className="text-center font-playfair text-3xl font-bold text-[#1E1E1E] mb-8">
                  Welcome to CT Collections
                </h2>
                
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-white/50 backdrop-blur-sm border border-[#A8B0AB]/20">
                    <TabsTrigger 
                      value="login"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#B1A6D2] data-[state=active]:to-[#A8B0AB] data-[state=active]:text-white"
                    >
                      Login
                    </TabsTrigger>
                    <TabsTrigger 
                      value="signup"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#B1A6D2] data-[state=active]:to-[#A8B0AB] data-[state=active]:text-white"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <motion.form 
                      onSubmit={handleLogin} 
                      className="space-y-4 mt-6"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="login-email" className="text-[#1E1E1E] font-medium">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="Enter your email"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          className="border-[#A8B0AB]/30 bg-white/80 backdrop-blur-sm focus:border-[#B1A6D2] focus:ring-[#B1A6D2]/20"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password" className="text-[#1E1E1E] font-medium">Password</Label>
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          className="border-[#A8B0AB]/30 bg-white/80 backdrop-blur-sm focus:border-[#B1A6D2] focus:ring-[#B1A6D2]/20"
                          required
                        />
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-[#B1A6D2] to-[#A8B0AB] hover:from-[#B1A6D2]/90 hover:to-[#A8B0AB]/90 text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          Login
                        </Button>
                      </motion.div>
                    </motion.form>
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <motion.form 
                      onSubmit={handleSignup} 
                      className="space-y-4 mt-6"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="signup-name" className="text-[#1E1E1E] font-medium">Full Name</Label>
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Enter your full name"
                          value={signupData.name}
                          onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                          className="border-[#A8B0AB]/30 bg-white/80 backdrop-blur-sm focus:border-[#B1A6D2] focus:ring-[#B1A6D2]/20"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-[#1E1E1E] font-medium">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          value={signupData.email}
                          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                          className="border-[#A8B0AB]/30 bg-white/80 backdrop-blur-sm focus:border-[#B1A6D2] focus:ring-[#B1A6D2]/20"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-[#1E1E1E] font-medium">Password</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Create a password"
                          value={signupData.password}
                          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                          className="border-[#A8B0AB]/30 bg-white/80 backdrop-blur-sm focus:border-[#B1A6D2] focus:ring-[#B1A6D2]/20"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm" className="text-[#1E1E1E] font-medium">Confirm Password</Label>
                        <Input
                          id="signup-confirm"
                          type="password"
                          placeholder="Confirm your password"
                          value={signupData.confirmPassword}
                          onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                          className="border-[#A8B0AB]/30 bg-white/80 backdrop-blur-sm focus:border-[#B1A6D2] focus:ring-[#B1A6D2]/20"
                          required
                        />
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-[#B1A6D2] to-[#A8B0AB] hover:from-[#B1A6D2]/90 hover:to-[#A8B0AB]/90 text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          Sign Up
                        </Button>
                      </motion.div>
                    </motion.form>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginDialog;
