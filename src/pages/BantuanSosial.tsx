import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { HandHeart, Users, Calendar, Plus, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const mockBansos = [
  { id: "BAN-1", namaWarga: "Dewi Lestari", nik: "3201...0004", program: "PKH", nominal: 600000, bulan: "Maret", tahun: "2026", status: "diterima", keterangan: "" },
  { id: "BAN-2", namaWarga: "Ahmad Fauzi", nik: "3201...0003", program: "BPNT", nominal: 200000, bulan: "Maret", tahun: "2026", status: "diterima", keterangan: "" },
  { id: "BAN-3", namaWarga: "Rina Marlina", nik: "3201...0006", program: "BLT", nominal: 300000, bulan: "Maret", tahun: "2026", status: "pending", keterangan: "Verifikasi data" },
];

const BantuanSosial = () => {
  const [search, setSearch] = useState("");
  const filtered = mockBansos.filter(b => b.namaWarga.toLowerCase().includes(search.toLowerCase()));
  const formatRp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

  return (
    <DashboardLayout>
      <div className="module-page-header flex items-start justify-between">
        <div>
          <h1 className="module-page-title">Bantuan Sosial</h1>
          <p className="module-page-subtitle">Kelola data penerima bantuan sosial warga</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1"><Download className="w-4 h-4" /> Export</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gradient-primary gap-1"><Plus className="w-4 h-4" /> Tambah Penerima</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader><DialogTitle>Tambah Penerima Bansos</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2"><Label>Nama Warga</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Pilih warga" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Dewi Lestari</SelectItem>
                      <SelectItem value="2">Ahmad Fauzi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Program</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pkh">PKH</SelectItem>
                      <SelectItem value="bpnt">BPNT</SelectItem>
                      <SelectItem value="blt">BLT</SelectItem>
                      <SelectItem value="bst">BST</SelectItem>
                      <SelectItem value="lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Nominal (Rp)</Label><Input type="number" placeholder="0" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2"><Label>Bulan</Label><Input placeholder="Maret" /></div>
                  <div className="space-y-2"><Label>Tahun</Label><Input placeholder="2026" /></div>
                </div>
                <div className="space-y-2"><Label>Keterangan</Label><Textarea placeholder="Keterangan (opsional)" /></div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Batal</Button>
                  <Button className="gradient-primary">Simpan</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Penerima" value={mockBansos.length} icon={HandHeart} gradient="gradient-primary" />
        <StatCard title="Bulan Ini" value={2} icon={Calendar} gradient="gradient-info" />
        <StatCard title="Total Disalurkan" value={formatRp(1100000)} icon={Users} gradient="gradient-success" />
      </div>

      <div className="data-table-wrapper">
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Cari penerima..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>NIK</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Nominal</TableHead>
                <TableHead>Periode</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((b, i) => (
                <TableRow key={b.id}>
                  <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                  <TableCell className="font-medium">{b.namaWarga}</TableCell>
                  <TableCell className="font-mono text-xs">{b.nik}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{b.program}</Badge></TableCell>
                  <TableCell className="text-sm">{formatRp(b.nominal)}</TableCell>
                  <TableCell className="text-sm">{b.bulan} {b.tahun}</TableCell>
                  <TableCell><Badge className={`text-xs ${b.status === "diterima" ? "bg-success" : "bg-warning"}`}>{b.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BantuanSosial;
