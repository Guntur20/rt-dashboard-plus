import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { Landmark, Users, Clock, CheckCircle, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const mockPinjaman = [
  { id: "PIN-1", namaWarga: "Ahmad Fauzi", nominal: 2000000, tujuan: "Biaya sekolah anak", tenor: 10, angsuran: 200000, status: "aktif", sisaHutang: 1200000, totalBayar: 800000, tanggalAjuan: "2026-01-15" },
  { id: "PIN-2", namaWarga: "Dewi Lestari", nominal: 1500000, tujuan: "Kebutuhan mendadak", tenor: 6, angsuran: 250000, status: "pending", sisaHutang: 1500000, totalBayar: 0, tanggalAjuan: "2026-03-25" },
  { id: "PIN-3", namaWarga: "Hendra Wijaya", nominal: 3000000, tujuan: "Modal usaha", tenor: 12, angsuran: 250000, status: "lunas", sisaHutang: 0, totalBayar: 3000000, tanggalAjuan: "2025-06-10" },
];

const Pinjaman = () => {
  const [search, setSearch] = useState("");
  const formatRp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

  const statusColor = (s: string) => {
    switch (s) {
      case "aktif": return "bg-info";
      case "pending": return "bg-warning";
      case "lunas": return "bg-success";
      case "ditolak": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  return (
    <DashboardLayout>
      <div className="module-page-header flex items-start justify-between">
        <div>
          <h1 className="module-page-title">Pinjaman Warga</h1>
          <p className="module-page-subtitle">Kelola pengajuan dan pembayaran pinjaman</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gradient-primary gap-1"><Plus className="w-4 h-4" /> Pengajuan Baru</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Pengajuan Pinjaman</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2"><Label>Nama Warga</Label>
                <Select><SelectTrigger><SelectValue placeholder="Pilih warga" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Budi Santoso</SelectItem>
                    <SelectItem value="2">Ahmad Fauzi</SelectItem>
                    <SelectItem value="3">Dewi Lestari</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Nominal (Rp)</Label><Input type="number" placeholder="0" /></div>
              <div className="space-y-2"><Label>Tenor (bulan)</Label><Input type="number" placeholder="6" /></div>
              <div className="space-y-2"><Label>Tujuan Pinjaman</Label><Textarea placeholder="Jelaskan tujuan pinjaman" /></div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Batal</Button>
                <Button className="gradient-primary">Ajukan</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Piutang" value={formatRp(1200000)} icon={Landmark} gradient="gradient-primary" />
        <StatCard title="Pinjaman Aktif" value={1} icon={Users} gradient="gradient-info" />
        <StatCard title="Pengajuan" value={1} icon={Clock} gradient="gradient-warning" />
        <StatCard title="Lunas" value={1} icon={CheckCircle} gradient="gradient-success" />
      </div>

      <Tabs defaultValue="semua">
        <TabsList>
          <TabsTrigger value="semua">Semua</TabsTrigger>
          <TabsTrigger value="pengajuan">Pengajuan</TabsTrigger>
          <TabsTrigger value="aktif">Aktif</TabsTrigger>
          <TabsTrigger value="lunas">Lunas</TabsTrigger>
        </TabsList>

        {["semua", "pengajuan", "aktif", "lunas"].map(tab => (
          <TabsContent key={tab} value={tab}>
            <div className="data-table-wrapper">
              <div className="p-4 border-b">
                <div className="relative max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Cari peminjam..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead>Nominal</TableHead>
                      <TableHead className="hidden md:table-cell">Tujuan</TableHead>
                      <TableHead>Angsuran</TableHead>
                      <TableHead>Sisa</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPinjaman
                      .filter(p => tab === "semua" || p.status === tab)
                      .filter(p => p.namaWarga.toLowerCase().includes(search.toLowerCase()))
                      .map((p, i) => (
                        <TableRow key={p.id}>
                          <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                          <TableCell className="font-medium">{p.namaWarga}</TableCell>
                          <TableCell className="text-sm">{formatRp(p.nominal)}</TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{p.tujuan}</TableCell>
                          <TableCell className="text-sm">{formatRp(p.angsuran)}/bln</TableCell>
                          <TableCell className="text-sm font-medium">{formatRp(p.sisaHutang)}</TableCell>
                          <TableCell><Badge className={`text-xs ${statusColor(p.status)}`}>{p.status}</Badge></TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {p.status === "pending" && <Button variant="outline" size="sm" className="text-xs h-7">Setujui</Button>}
                              {p.status === "aktif" && <Button variant="outline" size="sm" className="text-xs h-7">Bayar</Button>}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </DashboardLayout>
  );
};

export default Pinjaman;
