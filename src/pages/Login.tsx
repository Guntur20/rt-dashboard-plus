import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Shield, Users, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"admin" | "warga">("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adminForm, setAdminForm] = useState({ nomorAnggota: "", password: "" });
  const [wargaForm, setWargaForm] = useState({ noKK: "", password: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const isAdmin = activeTab === "admin";
    const user = isAdmin ? adminForm.nomorAnggota : wargaForm.noKK;
    const pass = isAdmin ? adminForm.password : wargaForm.password;

    if (!user || !pass) {
      toast({ title: "Peringatan", description: "Isi semua field untuk masuk", variant: "destructive" });
      return;
    }

    setLoading(true);
    // Simulate auth
    await new Promise((r) => setTimeout(r, 800));

    if (isAdmin && adminForm.nomorAnggota === "ADM001" && adminForm.password === "admin123") {
      toast({ title: "Selamat datang, Administrator!" });
      navigate("/dashboard");
    } else if (!isAdmin && wargaForm.password.length >= 6) {
      toast({ title: `Selamat datang, Warga!` });
      navigate("/dashboard");
    } else {
      toast({ title: "Login gagal", description: "Nomor anggota atau password salah / akun tidak aktif.", variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 20% 50%, hsl(220 40% 15%), hsl(220 25% 5%) 60%)" }}>
      {/* Animated orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-48 -left-48 w-[560px] h-[560px] rounded-full opacity-30 blur-[90px] animate-orb1"
          style={{ background: "radial-gradient(hsl(217 91% 60%), transparent 70%)" }} />
        <div className="absolute -bottom-36 -right-36 w-[420px] h-[420px] rounded-full opacity-30 blur-[90px] animate-orb2"
          style={{ background: "radial-gradient(hsl(258 90% 66%), transparent 70%)" }} />
        <div className="absolute top-[60%] left-[60%] w-[300px] h-[300px] rounded-full opacity-30 blur-[90px] animate-orb3"
          style={{ background: "radial-gradient(hsl(187 92% 42%), transparent 70%)" }} />
      </div>

      <div className="w-full max-w-[400px] mx-4 relative z-10">
        {/* Login Card */}
        <div className="relative rounded-[20px] p-8 sm:p-9 border"
          style={{
            background: "rgba(22,29,46,0.92)",
            backdropFilter: "blur(24px)",
            borderColor: "hsl(217 91% 60% / 0.2)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
          }}>
          {/* GJS Badge */}
          <span className="absolute top-3.5 right-3.5 text-[9px] font-extrabold tracking-[2px] uppercase px-2.5 py-1 rounded-full"
            style={{
              fontFamily: "'Syne', sans-serif",
              color: "hsl(38 92% 50%)",
              background: "hsl(38 92% 50% / 0.12)",
              border: "1px solid hsl(38 92% 50% / 0.3)",
            }}>
            GJS 2026
          </span>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-[58px] h-[58px] gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Shield className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-[28px] font-extrabold tracking-tight"
              style={{
                fontFamily: "'Syne', sans-serif",
                background: "linear-gradient(135deg, #fff, hsl(215 15% 65%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
              SiRT
            </h1>
            <p className="text-muted-foreground text-[13px] mt-1">Sistem Informasi Rukun Tetangga</p>
          </div>

          {/* Tabs */}
          <div className="flex rounded-[10px] p-[3px] gap-[3px] mb-5" style={{ background: "hsl(220 18% 14%)" }}>
            <button
              onClick={() => setActiveTab("admin")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-[7px] text-[12.5px] font-semibold transition-all ${
                activeTab === "admin" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}>
              <Shield className="w-3.5 h-3.5" /> Admin / Pengurus
            </button>
            <button
              onClick={() => setActiveTab("warga")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-[7px] text-[12.5px] font-semibold transition-all ${
                activeTab === "warga" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}>
              <Users className="w-3.5 h-3.5" /> Warga
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-3.5">
            <div className="space-y-1.5">
              <Label className="text-[11px] font-bold text-muted-foreground tracking-wider uppercase">
                {activeTab === "admin" ? "NOMOR ANGGOTA" : "NOMOR KK"}
              </Label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder={activeTab === "admin" ? "Masukkan nomor anggota" : "Masukkan nomor KK"}
                  value={activeTab === "admin" ? adminForm.nomorAnggota : wargaForm.noKK}
                  onChange={(e) =>
                    activeTab === "admin"
                      ? setAdminForm({ ...adminForm, nomorAnggota: e.target.value })
                      : setWargaForm({ ...wargaForm, noKK: e.target.value })
                  }
                  className="pl-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                  onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-[11px] font-bold text-muted-foreground tracking-wider uppercase">
                PASSWORD
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none">🔒</div>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={activeTab === "admin" ? adminForm.password : wargaForm.password}
                  onChange={(e) =>
                    activeTab === "admin"
                      ? setAdminForm({ ...adminForm, password: e.target.value })
                      : setWargaForm({ ...wargaForm, password: e.target.value })
                  }
                  className="pl-9 pr-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                  onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full gradient-primary text-primary-foreground font-bold text-sm h-11 rounded-[9px] mt-1.5 hover:translate-y-[-1px] transition-transform"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" /> Masuk
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-muted-foreground text-[11px] mt-3">
            {activeTab === "admin" ? "Default Admin: ADM001 / admin123" : "Gunakan No.KK + Password"}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes orbFloat1 { to { transform: translate(30px, 30px) scale(1.05); } }
        @keyframes orbFloat2 { to { transform: translate(-20px, -20px) scale(1.08); } }
        @keyframes orbFloat3 { to { transform: translate(15px, -25px) scale(1.03); } }
        .animate-orb1 { animation: orbFloat1 9s ease-in-out infinite alternate; }
        .animate-orb2 { animation: orbFloat2 11s ease-in-out infinite alternate-reverse; }
        .animate-orb3 { animation: orbFloat3 7s ease-in-out infinite alternate; }
      `}</style>
    </div>
  );
};

export default Login;
