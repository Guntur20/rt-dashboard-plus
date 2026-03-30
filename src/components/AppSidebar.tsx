import {
  LayoutDashboard, Users, CreditCard, UserCheck, ClipboardList,
  Megaphone, CalendarDays, FileText, Vote, MessageSquareWarning,
  Network, FilePlus, Settings, Package, Wallet, PiggyBank,
  Landmark, ShoppingBag, HandHeart, BookOpen, LogOut, Shield
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
  { title: "Arisan RT", url: "/arisan", icon: HandHeart },
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
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Sidebar collapsible="icon" className="gradient-sidebar border-r-0">
      <SidebarContent>
        {/* Brand */}
        <div className={`px-4 py-5 flex items-center gap-3 border-b border-sidebar-border ${collapsed ? 'justify-center px-2' : ''}`}>
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-sm text-sidebar-primary-foreground">SI-RT</h2>
              <span className="gjs-watermark text-sidebar-foreground">GJS 2026</span>
            </div>
          )}
        </div>

        {menuGroups.map((group) => (
          <SidebarGroup key={group.label}>
            {!collapsed && <SidebarGroupLabel className="text-sidebar-foreground/50 text-[10px] uppercase tracking-wider">{group.label}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className="text-sidebar-foreground/70 hover:text-sidebar-primary-foreground hover:bg-sidebar-accent transition-colors"
                        activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                      >
                        <item.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                        {!collapsed && <span className="text-sm">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/login" className="text-sidebar-foreground/50 hover:text-destructive transition-colors">
                <LogOut className="w-4 h-4 mr-2" />
                {!collapsed && <span className="text-sm">Keluar</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
