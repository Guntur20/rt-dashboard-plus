import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import {
  Users, Home, CreditCard, UserCheck, TrendingUp, TrendingDown,
  Wallet, AlertTriangle, Baby, PersonStanding
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const recentActivities = [
  { id: 1, text: "Iuran bulan Maret dibayar oleh Budi Santoso", time: "2 menit lalu", type: "iuran" },
  { id: 2, text: "Tamu baru: Andi Pratama (Kunjungan biasa)", time: "15 menit lalu", type: "visitor" },
  { id: 3, text: "Permohonan surat dari Siti Nurhaliza", time: "1 jam lalu", type: "surat" },
  { id: 4, text: "Pengumuman baru: Gotong Royong Minggu", time: "3 jam lalu", type: "info" },
  { id: 5, text: "Pembayaran iuran oleh Hendra W.", time: "5 jam lalu", type: "iuran" },
];

const tunggakanWarga = [
  { nama: "Ahmad Fauzi", bulan: 3, total: "Rp 150.000" },
  { nama: "Dewi Lestari", bulan: 2, total: "Rp 100.000" },
  { nama: "Rizky Ramadhan", bulan: 4, total: "Rp 200.000" },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="module-page-header">
        <h1 className="module-page-title">Dashboard</h1>
        <p className="module-page-subtitle">Selamat datang di Sistem Informasi RT — GJS 2026</p>
      </div>

      {/* Warga Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <StatCard title="Total Jiwa" value={256} icon={Users} gradient="gradient-primary" />
        <StatCard title="Total KK" value={78} icon={Home} gradient="gradient-accent" />
        <StatCard title="Laki-laki" value={132} icon={Users} gradient="gradient-info" />
        <StatCard title="Perempuan" value={124} icon={Users} gradient="gradient-success" />
        <StatCard title="Balita" value={18} icon={Baby} gradient="gradient-warning" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Lansia" value={22} icon={PersonStanding} gradient="gradient-info" />
        <StatCard title="Meninggal" value={3} icon={Users} gradient="gradient-destructive" subtitle="Tahun ini" />
        <StatCard title="Janda" value={8} icon={Users} gradient="gradient-warning" />
        <StatCard title="Duda" value={4} icon={Users} gradient="gradient-warning" />
      </div>

      {/* Keuangan Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Saldo Kas RT" value="Rp 12.5jt" icon={Wallet} gradient="gradient-success" />
        <StatCard title="Pemasukan Bulan Ini" value="Rp 3.9jt" icon={TrendingUp} gradient="gradient-primary" />
        <StatCard title="Pengeluaran Bulan Ini" value="Rp 1.2jt" icon={TrendingDown} gradient="gradient-destructive" />
        <StatCard title="Tunggakan" value="8 Warga" icon={AlertTriangle} gradient="gradient-warning" />
      </div>

      {/* Visitor & Iuran Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Tamu Hari Ini" value={5} icon={UserCheck} gradient="gradient-accent" />
        <StatCard title="Tamu Menginap" value={2} icon={UserCheck} gradient="gradient-info" />
        <StatCard title="Iuran Terbayar" value="85%" icon={CreditCard} gradient="gradient-success" subtitle="Bulan ini" />
        <StatCard title="Permohonan Surat" value={3} icon={CreditCard} gradient="gradient-primary" subtitle="Menunggu" />
      </div>

      {/* Recent Activity & Tunggakan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 text-sm">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  activity.type === 'iuran' ? 'bg-success' :
                  activity.type === 'visitor' ? 'bg-accent' :
                  activity.type === 'surat' ? 'bg-primary' : 'bg-warning'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-foreground">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              Tunggakan Iuran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tunggakanWarga.map((warga, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-sm text-foreground">{warga.nama}</p>
                    <p className="text-xs text-muted-foreground">{warga.bulan} bulan tunggakan</p>
                  </div>
                  <Badge variant="destructive" className="text-xs">{warga.total}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
