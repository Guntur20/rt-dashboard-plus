import DashboardLayout from "@/components/DashboardLayout";
import { Settings, User, Lock, Shield, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockLog = [
  { id: 1, nama: "Administrator", aksi: "Login", detail: "Berhasil login", waktu: "2026-03-28 08:15:00" },
  { id: 2, nama: "Administrator", aksi: "Tambah Warga", detail: "Menambah data warga baru", waktu: "2026-03-28 08:20:00" },
  { id: 3, nama: "Sekretaris", aksi: "Login", detail: "Berhasil login", waktu: "2026-03-27 19:30:00" },
  { id: 4, nama: "Administrator", aksi: "Logout", detail: "Keluar dari sistem", waktu: "2026-03-27 17:00:00" },
];

const Pengaturan = () => {
  return (
    <DashboardLayout>
      <div className="module-page-header">
        <h1 className="module-page-title">Pengaturan</h1>
        <p className="module-page-subtitle">Kelola pengaturan sistem dan profil</p>
      </div>

      <Tabs defaultValue="profil">
        <TabsList>
          <TabsTrigger value="profil"><User className="w-4 h-4 mr-1" /> Profil</TabsTrigger>
          <TabsTrigger value="keamanan"><Lock className="w-4 h-4 mr-1" /> Keamanan</TabsTrigger>
          <TabsTrigger value="umum"><Settings className="w-4 h-4 mr-1" /> Umum</TabsTrigger>
          <TabsTrigger value="aktivitas"><Activity className="w-4 h-4 mr-1" /> Log Aktivitas</TabsTrigger>
        </TabsList>

        <TabsContent value="profil">
          <Card>
            <CardHeader><CardTitle className="text-base">Informasi Profil</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Nama Lengkap</Label><Input defaultValue="Administrator" /></div>
                <div className="space-y-2"><Label>Nomor Anggota</Label><Input defaultValue="ADM001" disabled /></div>
                <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="admin@sirt.id" /></div>
                <div className="space-y-2"><Label>No. HP</Label><Input placeholder="08xx-xxxx-xxxx" /></div>
              </div>
              <div className="flex justify-end"><Button className="gradient-primary">Simpan Perubahan</Button></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keamanan">
          <Card>
            <CardHeader><CardTitle className="text-base">Ubah Password</CardTitle></CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="space-y-2"><Label>Password Lama</Label><Input type="password" /></div>
              <div className="space-y-2"><Label>Password Baru</Label><Input type="password" /></div>
              <div className="space-y-2"><Label>Konfirmasi Password</Label><Input type="password" /></div>
              <div className="flex justify-end"><Button className="gradient-primary">Ubah Password</Button></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="umum">
          <Card>
            <CardHeader><CardTitle className="text-base">Pengaturan Umum</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Akses Warga ke Sistem</p>
                  <p className="text-xs text-muted-foreground">Izinkan warga login ke sistem</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Notifikasi WhatsApp</p>
                  <p className="text-xs text-muted-foreground">Kirim notifikasi otomatis via WA</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Mode Maintenance</p>
                  <p className="text-xs text-muted-foreground">Nonaktifkan akses sementara</p>
                </div>
                <Switch />
              </div>
              <div className="flex justify-end"><Button className="gradient-primary">Simpan</Button></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aktivitas">
          <div className="data-table-wrapper">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-sm">Log Aktivitas Terakhir</h3>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Pengguna</TableHead>
                    <TableHead>Aksi</TableHead>
                    <TableHead>Detail</TableHead>
                    <TableHead>Waktu</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockLog.map((l, i) => (
                    <TableRow key={l.id}>
                      <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                      <TableCell className="font-medium">{l.nama}</TableCell>
                      <TableCell><Badge variant="secondary" className="text-xs">{l.aksi}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{l.detail}</TableCell>
                      <TableCell className="text-sm font-mono">{l.waktu}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Pengaturan;
