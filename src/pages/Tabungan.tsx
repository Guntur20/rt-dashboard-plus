import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { PiggyBank, Users, TrendingUp, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const mockTabungan = [
  { id: "TAB-1", namaWarga: "Budi Santoso", jenis: "setor", jumlah: 200000, keterangan: "Setoran bulanan", tanggal: "2026-03-25" },
  { id: "TAB-2", namaWarga: "Siti Nurhaliza", jenis: "setor", jumlah: 150000, keterangan: "Setoran bulanan", tanggal: "2026-03-24" },
  { id: "TAB-3", namaWarga: "Budi Santoso", jenis: "tarik", jumlah: 100000, keterangan: "Kebutuhan mendadak", tanggal: "2026-03-20" },
  { id: "TAB-4", namaWarga: "Ahmad Fauzi", jenis: "setor", jumlah: 300000, keterangan: "Setoran 3 bulan", tanggal: "2026-03-18" },
];

const Tabungan = () => {
  const [search, setSearch] = useState("");
  const filtered = mockTabungan.filter(t => t.namaWarga.toLowerCase().includes(search.toLowerCase()));
  const formatRp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

  return (
    <DashboardLayout>
      <div className="module-page-header flex items-start justify-between">
        <div>
          <h1 className="module-page-title">Tabungan Warga</h1>
          <p className="module-page-subtitle">Kelola tabungan warga RT</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gradient-primary gap-1"><Plus className="w-4 h-4" /> Transaksi Baru</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Transaksi Tabungan</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2"><Label>Nama Warga</Label>
                <Select><SelectTrigger><SelectValue placeholder="Pilih warga" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Budi Santoso</SelectItem>
                    <SelectItem value="2">Siti Nurhaliza</SelectItem>
                    <SelectItem value="3">Ahmad Fauzi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Jenis</Label>
                <Select><SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="setor">Setor</SelectItem>
                    <SelectItem value="tarik">Tarik</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Jumlah (Rp)</Label><Input type="number" placeholder="0" /></div>
              <div className="space-y-2"><Label>Tanggal</Label><Input type="date" /></div>
              <div className="space-y-2"><Label>Keterangan</Label><Input placeholder="Keterangan" /></div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Batal</Button>
                <Button className="gradient-primary">Simpan</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Saldo Tabungan" value={formatRp(4250000)} icon={PiggyBank} gradient="gradient-primary" />
        <StatCard title="Jumlah Penabung" value={35} icon={Users} gradient="gradient-info" />
        <StatCard title="Setoran Bulan Ini" value={formatRp(650000)} icon={TrendingUp} gradient="gradient-success" />
      </div>

      <div className="data-table-wrapper">
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Cari warga..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Nama Warga</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
                <TableHead>Keterangan</TableHead>
                <TableHead>Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((t, i) => (
                <TableRow key={t.id}>
                  <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                  <TableCell className="font-medium">{t.namaWarga}</TableCell>
                  <TableCell><Badge className={`text-xs ${t.jenis === "setor" ? "bg-success" : "bg-warning"}`}>{t.jenis === "setor" ? "Setor" : "Tarik"}</Badge></TableCell>
                  <TableCell className={`text-right font-medium text-sm ${t.jenis === "setor" ? "text-green-600" : "text-red-600"}`}>{t.jenis === "setor" ? "+" : "-"}{formatRp(t.jumlah)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{t.keterangan}</TableCell>
                  <TableCell className="text-sm">{t.tanggal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Tabungan;
