import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import {
  Users, Home, CreditCard, UserCheck, TrendingUp, TrendingDown,
  Wallet, AlertTriangle, Baby, PersonStanding, FileText, Mail,
  Mars, Venus, RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const dashboardData = {
  totalJiwa: 256, totalKK: 78, kkKosong: 3,
  totalLaki: 132, totalPerem: 124, totalBalita: 18,
  totalLansia: 22, totalMeninggal: 3, totalJanda: 8,
  totalDuda: 4, tunggakan: 12, suratPending: 3,
  pengaduanAktif: 2, saldoKas: 12500000,
  visitorHariIni: 5,
};

const recentVisitors = [
  { nama: "Andi Pratama", keperluan: "Kunjungan biasa", host: "Pak Budi", status: "masuk" },
  { nama: "Lisa M.", keperluan: "Antar paket", host: "Bu Siti", status: "keluar" },
  { nama: "Rudi K.", keperluan: "Tamu kerja", host: "Pak Hendra", status: "masuk" },
];

const ProgressBar = ({ label, value, total, color }: { label: string; value: number; total: number; color: string }) => {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <span className="w-[75px] text-xs text-muted-foreground flex-shrink-0">{label}</span>
      <div className="progress-bar flex-1">
        <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="w-[30px] text-right text-xs font-bold">{value}</span>
    </div>
  );
};

const rp = (n: number) => "Rp " + n.toLocaleString("id-ID");

const Dashboard = () => {
  const navigate = useNavigate();
  const d = dashboardData;
  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <DashboardLayout>
      <div className="module-page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="module-page-title">Dashboard — RT 001</h1>
          <p className="module-page-subtitle">{dateStr}</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 border-border text-muted-foreground hover:text-foreground self-start">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </Button>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
        <StatCard title="Total Jiwa" value={d.totalJiwa} icon={Users} gradient="gradient-primary" />
        <StatCard title="Kartu Keluarga" value={d.totalKK} icon={Home} gradient="gradient-success" />
        <StatCard title="Rumah Kosong" value={d.kkKosong} icon={Home} gradient="gradient-warning" />
        <StatCard title="Laki-laki" value={d.totalLaki} icon={Mars} gradient="gradient-info" />
        <StatCard title="Perempuan" value={d.totalPerem} icon={Venus} gradient="gradient-purple" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
        <StatCard title="Balita <5thn" value={d.totalBalita} icon={Baby} gradient="gradient-warning" />
        <StatCard title="Lansia ≥60thn" value={d.totalLansia} icon={PersonStanding} gradient="gradient-info" />
        <StatCard title="Tunggakan Iuran" value={d.tunggakan} icon={CreditCard} gradient="gradient-destructive" valueColor="text-destructive" />
        <StatCard title="Surat Pending" value={d.suratPending} icon={Mail} gradient="gradient-warning" />
        <StatCard title="Saldo Kas RT" value={rp(d.saldoKas)} icon={Wallet} gradient="gradient-success" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Komposisi Warga */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <span className="icon-bg-blue w-6 h-6 rounded-md flex items-center justify-center text-xs">📊</span>
              Komposisi Warga
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            <ProgressBar label="Laki-laki" value={d.totalLaki} total={d.totalJiwa} color="hsl(187 92% 42%)" />
            <ProgressBar label="Perempuan" value={d.totalPerem} total={d.totalJiwa} color="hsl(258 90% 66%)" />
            <ProgressBar label="Balita" value={d.totalBalita} total={d.totalJiwa} color="hsl(38 92% 50%)" />
            <ProgressBar label="Lansia" value={d.totalLansia} total={d.totalJiwa} color="hsl(24 95% 53%)" />
          </CardContent>
        </Card>

        {/* Notifikasi */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <span className="icon-bg-yellow w-6 h-6 rounded-md flex items-center justify-center text-xs">🔔</span>
              Notifikasi Penting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 text-[13px]">
            {d.tunggakan > 0 && (
              <div className="flex items-center gap-2">
                <span className="badge-status b-red"><CreditCard className="w-3 h-3" /> {d.tunggakan}</span>
                <span className="text-muted-foreground">tagihan belum dibayar</span>
              </div>
            )}
            {d.suratPending > 0 && (
              <div className="flex items-center gap-2">
                <span className="badge-status b-yellow"><Mail className="w-3 h-3" /> {d.suratPending}</span>
                <span className="text-muted-foreground">surat pending</span>
              </div>
            )}
            {d.kkKosong > 0 && (
              <div className="flex items-center gap-2">
                <span className="badge-status b-yellow"><Home className="w-3 h-3" /> {d.kkKosong}</span>
                <span className="text-muted-foreground">rumah kosong</span>
              </div>
            )}
            {d.pengaduanAktif > 0 && (
              <div className="flex items-center gap-2">
                <span className="badge-status b-red"><AlertTriangle className="w-3 h-3" /> {d.pengaduanAktif}</span>
                <span className="text-muted-foreground">pengaduan aktif</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Rekap Iuran */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <span className="icon-bg-green w-6 h-6 rounded-md flex items-center justify-center text-xs">💰</span>
                Rekap Iuran
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary" onClick={() => navigate("/iuran")}>
                Lihat →
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-[13px] mb-2">
              <span className="text-muted-foreground">Tunggakan aktif:</span>
              <span className="text-destructive font-bold">{d.tunggakan} tagihan</span>
            </div>
            <button onClick={() => navigate("/iuran")} className="text-primary text-xs hover:underline">
              → Lihat detail tunggakan
            </button>
          </CardContent>
        </Card>

        {/* Tamu Hari Ini */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <span className="icon-bg-cyan w-6 h-6 rounded-md flex items-center justify-center text-xs">🚶</span>
                Tamu Hari Ini
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary" onClick={() => navigate("/e-visitor")}>
                Lihat →
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-0">
            {recentVisitors.map((v, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0 text-xs">
                <div>
                  <div className="font-bold text-[13px]">{v.nama}</div>
                  <div className="text-muted-foreground">{v.keperluan} → {v.host}</div>
                </div>
                <span className={`badge-status ${v.status === "masuk" ? "b-blue" : "b-gray"}`}>{v.status}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
