import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const PAGE_META: Record<string, { icon: string; label: string }> = {
  "/dashboard": { icon: "📊", label: "Dashboard" },
  "/data-warga": { icon: "👥", label: "Data Warga" },
  "/kartu-keluarga": { icon: "📋", label: "Kartu Keluarga" },
  "/pemilihan-rt": { icon: "🗳️", label: "Pemilihan RT" },
  "/iuran": { icon: "💰", label: "Iuran Warga" },
  "/kas-rt": { icon: "🏦", label: "Kas RT" },
  "/tabungan": { icon: "🐷", label: "Tabungan" },
  "/pinjaman": { icon: "🤝", label: "Pinjaman" },
  "/arisan": { icon: "🔄", label: "Arisan RT" },
  "/e-visitor": { icon: "🚶", label: "E-Visitor" },
  "/inventaris": { icon: "📦", label: "Inventaris" },
  "/umkm": { icon: "🏪", label: "UMKM" },
  "/bantuan-sosial": { icon: "❤️", label: "Bantuan Sosial" },
  "/permohonan-surat": { icon: "📝", label: "Permohonan Surat" },
  "/pengaduan": { icon: "⚠️", label: "Pengaduan" },
  "/pengumuman": { icon: "📢", label: "Pengumuman" },
  "/kalender": { icon: "📅", label: "Kalender" },
  "/jadwal-kegiatan": { icon: "📋", label: "Jadwal Kegiatan" },
  "/notulen-rapat": { icon: "📖", label: "Notulen Rapat" },
  "/polling": { icon: "📊", label: "Polling Warga" },
  "/struktur-rt": { icon: "🏛️", label: "Struktur RT" },
  "/pengaturan": { icon: "⚙️", label: "Pengaturan" },
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const meta = PAGE_META[location.pathname] || { icon: "📄", label: "Halaman" };
  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border bg-card px-4 sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="flex items-center gap-2">
                <span className="text-sm">{meta.icon}</span>
                <span className="font-bold text-[15px] hidden sm:inline" style={{ fontFamily: "'Syne', sans-serif" }}>
                  {meta.label}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground hidden md:inline">{dateStr}</span>
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground hover:bg-secondary">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-destructive" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive hover:bg-secondary"
                onClick={() => navigate("/login")}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </header>
          <main className="flex-1 p-3 md:p-5 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
