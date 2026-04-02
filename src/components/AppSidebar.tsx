import {
  LayoutDashboard, Users, CreditCard, UserCheck, ClipboardList,
  Megaphone, CalendarDays, FileText, Vote, MessageSquareWarning,
  Network, FilePlus, Settings, Package, Wallet, PiggyBank,
  Landmark, ShoppingBag, HandHeart, BookOpen, LogOut, Shield,
  RefreshCw, Home
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";

const mainMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Data Warga", url: "/data-warga", icon: Users },
  { title: "Kartu Keluarga", url: "/kartu-keluarga", icon: FileText },
  { title: "Pemilihan RT", url: "/pemilihan-rt", icon: Vote },
];

const keuanganItems = [
  { title: "Iuran Warga", url: "/iuran", icon: CreditCard },
  { title: "Kas RT", url: "/kas-rt", icon: Wallet },
  { title: "Tabungan", url: "/tabungan", icon: PiggyBank },
  { title: "Pinjaman", url: "/pinjaman", icon: Landmark },
  { title: "Arisan RT", url: "/arisan", icon: RefreshCw },
];

const layananItems = [
  { title: "E-Visitor", url: "/e-visitor", icon: UserCheck },
  { title: "Inventaris", url: "/inventaris", icon: Package },
  { title: "UMKM", url: "/umkm", icon: ShoppingBag },
  { title: "Bantuan Sosial", url: "/bantuan-sosial", icon: HandHeart },
  { title: "Permohonan Surat", url: "/permohonan-surat", icon: FilePlus },
  { title: "Pengaduan", url: "/pengaduan", icon: MessageSquareWarning },
];

const informasiItems = [
  { title: "Pengumuman", url: "/pengumuman", icon: Megaphone },
  { title: "Kalender", url: "/kalender", icon: CalendarDays },
  { title: "Jadwal Kegiatan", url: "/jadwal-kegiatan", icon: ClipboardList },
  { title: "Notulen Rapat", url: "/notulen-rapat", icon: BookOpen },
  { title: "Polling Warga", url: "/polling", icon: Vote },
  { title: "Struktur RT", url: "/struktur-rt", icon: Network },
];

const settingsItems = [
  { title: "Pengaturan", url: "/pengaturan", icon: Settings },
];

type MenuGroup = {
  label: string;
  items: { title: string; url: string; icon: React.ComponentType<{ className?: string }> }[];
};

const menuGroups: MenuGroup[] = [
  { label: "Menu Utama", items: mainMenuItems },
  { label: "Keuangan", items: keuanganItems },
  { label: "Layanan", items: layananItems },
  { label: "Informasi", items: informasiItems },
  { label: "Sistem", items: settingsItems },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="gradient-sidebar border-r border-sidebar-border">
      <SidebarContent>
        {/* Brand */}
        <div className={`px-4 py-4 flex items-center gap-2.5 border-b border-sidebar-border ${collapsed ? 'justify-center px-2' : ''}`}>
          <div className="w-[34px] h-[34px] rounded-[9px] gradient-primary flex items-center justify-center flex-shrink-0">
            <Home className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <span className="block font-extrabold text-[16px] text-sidebar-primary-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>
                SiRT
              </span>
              <span className="block text-[11px] text-muted-foreground">RT 001</span>
            </div>
          )}
        </div>

        {menuGroups.map((group) => (
          <SidebarGroup key={group.label} className="py-1">
            {!collapsed && (
              <SidebarGroupLabel className="text-muted-foreground/60 text-[10px] font-extrabold uppercase tracking-[1.2px] px-4 py-2">
                {group.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className="text-sidebar-foreground/70 hover:text-sidebar-primary-foreground hover:bg-sidebar-accent mx-2 rounded-[9px] py-2 px-3 transition-all text-[13px] font-medium"
                        activeClassName="bg-gradient-to-r from-primary/20 to-purple/10 text-primary font-semibold"
                      >
                        <item.icon className="w-[18px] h-[18px] mr-2.5 flex-shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border px-3 py-3">
        {/* User */}
        {!collapsed && (
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-[34px] h-[34px] gradient-primary rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground flex-shrink-0">
              A
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-[13px] font-semibold text-sidebar-primary-foreground truncate">Admin</div>
              <div className="text-[11px] text-muted-foreground">Administrator</div>
            </div>
          </div>
        )}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink
                to="/login"
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors w-full py-2 px-3 text-[13px] font-medium"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {!collapsed && <span>Keluar</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {!collapsed && (
          <div className="text-center mt-2">
            <span className="gjs-watermark text-muted-foreground">GJS 2026</span>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
