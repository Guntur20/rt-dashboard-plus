import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [adminForm, setAdminForm] = useState({ nomorAnggota: "", password: "" });
  const [wargaForm, setWargaForm] = useState({ noKK: "", password: "" });

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleWargaLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-primary p-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo / Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Sistem Informasi RT</h1>
          <p className="text-white/70 mt-2 text-sm">Kelola data warga, keuangan, dan layanan RT dengan mudah</p>
          <span className="gjs-watermark text-white/50 mt-3 inline-block">GJS 2026</span>
        </div>

        <Card className="border-0 shadow-2xl">
          <CardHeader className="pb-2 pt-6">
            <Tabs defaultValue="admin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="admin" className="gap-2">
                  <Shield className="w-4 h-4" />
                  Admin
                </TabsTrigger>
                <TabsTrigger value="warga" className="gap-2">
                  <Users className="w-4 h-4" />
                  Warga
                </TabsTrigger>
              </TabsList>

              <TabsContent value="admin">
                <CardContent className="p-0">
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nomorAnggota">Nomor Anggota</Label>
                      <Input
                        id="nomorAnggota"
                        placeholder="Masukkan nomor anggota"
                        value={adminForm.nomorAnggota}
                        onChange={(e) => setAdminForm({ ...adminForm, nomorAnggota: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminPassword">Password</Label>
                      <div className="relative">
                        <Input
                          id="adminPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Masukkan password"
                          value={adminForm.password}
                          onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full gradient-primary">
                      Masuk sebagai Admin
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>

              <TabsContent value="warga">
                <CardContent className="p-0">
                  <form onSubmit={handleWargaLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="noKK">Nomor Kartu Keluarga</Label>
                      <Input
                        id="noKK"
                        placeholder="Masukkan No. KK"
                        value={wargaForm.noKK}
                        onChange={(e) => setWargaForm({ ...wargaForm, noKK: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wargaPassword">Password</Label>
                      <div className="relative">
                        <Input
                          id="wargaPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Masukkan password"
                          value={wargaForm.password}
                          onChange={(e) => setWargaForm({ ...wargaForm, password: e.target.value })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full gradient-primary">
                      Masuk sebagai Warga
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        <p className="text-center text-white/40 text-xs mt-6">
          © 2026 GJS — Sistem Informasi RT
        </p>
      </div>
    </div>
  );
};

export default Login;
