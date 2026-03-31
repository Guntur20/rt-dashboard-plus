import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { MessageSquareWarning, AlertCircle, CheckCircle, Clock, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const mockPengaduan = [
  { id: "ADU-1", namaWarga: "Siti Nurhaliza", judul: "Lampu Jalan Mati", kategori: "Infrastruktur", deskripsi: "Lampu jalan di depan blok A mati sudah 3 hari", status: "open", tanggalAjuan: "2026-03-27", tanggapan: "" },
  { id: "ADU-2", namaWarga: "Hendra Wijaya", judul: "Sampah Menumpuk", kategori: "Kebersihan", deskripsi: "Sampah di TPS belum diangkut selama seminggu", status: "proses", tanggalAjuan: "2026-03-25", tanggapan: "Sudah dikoordinasi dengan DLH" },
  { id: "ADU-3", namaWarga: "Ahmad Fauzi", judul: "Kebisingan Malam Hari", kategori: "Keamanan", deskripsi: "Ada suara bising dari rumah blok C setelah jam 10 malam", status: "selesai", tanggalAjuan: "2026-03-20", tanggapan: "Sudah ditegur dan warga berjanji tidak mengulangi" },
];

const Pengaduan = () => {
  const [search, setSearch] = useState("");
  const filtered = mockPengaduan.filter(p => p.judul.toLowerCase().includes(search.toLowerCase()) || p.namaWarga.toLowerCase().includes(search.toLowerCase()));

  const statusColor = (s: string) => {
    switch (s) {
      case "open": return "bg-destructive";
      case "proses": return "bg-warning";
      case "selesai": return "bg-success";
      default: return "bg-muted";
    }
  };

  return (
    <DashboardLayout>
      <div className="module-page-header flex items-start justify-between">
        <div>
          <h1 className="module-page-title">Pengaduan Warga</h1>
          <p className="module-page-subtitle">Kelola pengaduan dan laporan warga</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gradient-primary gap-1"><Plus className="w-4 h-4" /> Buat Pengaduan</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Buat Pengaduan</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2"><Label>Judul Pengaduan</Label><Input placeholder="Judul singkat" /></div>
              <div className="space-y-2"><Label>Kategori</Label>
                <Select><SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="infrastruktur">Infrastruktur</SelectItem>
                    <SelectItem value="kebersihan">Kebersihan</SelectItem>
                    <SelectItem value="keamanan">Keamanan</SelectItem>
                    <SelectItem value="sosial">Sosial</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Deskripsi</Label><Textarea placeholder="Jelaskan pengaduan secara detail..." className="min-h-[100px]" /></div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Batal</Button>
                <Button className="gradient-primary">Kirim</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <StatCard title="Pengaduan Aktif" value={1} icon={AlertCircle} gradient="gradient-destructive" />
        <StatCard title="Sedang Diproses" value={1} icon={Clock} gradient="gradient-warning" />
        <StatCard title="Selesai" value={1} icon={CheckCircle} gradient="gradient-success" />
      </div>

      <div className="data-table-wrapper">
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Cari pengaduan..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Pelapor</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="hidden md:table-cell">Tanggal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p, i) => (
                <TableRow key={p.id}>
                  <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                  <TableCell className="font-medium">{p.namaWarga}</TableCell>
                  <TableCell className="text-sm">{p.judul}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{p.kategori}</Badge></TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{p.tanggalAjuan}</TableCell>
                  <TableCell><Badge className={`text-xs ${statusColor(p.status)}`}>{p.status}</Badge></TableCell>
                  <TableCell>
                    {p.status !== "selesai" && <Button variant="outline" size="sm" className="text-xs h-7">Tanggapi</Button>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Pengaduan;
