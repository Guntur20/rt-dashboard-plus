import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { Package, CheckCircle, AlertTriangle, DollarSign, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const mockInventaris = [
  { id: "INV-1", nama: "Tenda 4x6m", kode: "TND-001", kategori: "Perlengkapan Acara", jumlah: 3, satuan: "unit", kondisi: "Baik", nilaiPerolehan: 4500000, tanggalBeli: "2024-01-15", lokasi: "Gudang RT", status: "tersedia" },
  { id: "INV-2", nama: "Meja Lipat", kode: "MJL-001", kategori: "Perabotan", jumlah: 20, satuan: "unit", kondisi: "Baik", nilaiPerolehan: 3000000, tanggalBeli: "2023-06-10", lokasi: "Gudang RT", status: "tersedia" },
  { id: "INV-3", nama: "Kursi Plastik", kode: "KRS-001", kategori: "Perabotan", jumlah: 50, satuan: "unit", kondisi: "Sebagian Rusak", nilaiPerolehan: 2500000, tanggalBeli: "2022-12-01", lokasi: "Gudang RT", status: "tersedia" },
  { id: "INV-4", nama: "Sound System", kode: "SND-001", kategori: "Elektronik", jumlah: 1, satuan: "set", kondisi: "Baik", nilaiPerolehan: 8000000, tanggalBeli: "2025-03-20", lokasi: "Sekretariat", status: "dipinjam" },
  { id: "INV-5", nama: "Gerobak Sampah", kode: "GRB-001", kategori: "Kebersihan", jumlah: 2, satuan: "unit", kondisi: "Rusak Ringan", nilaiPerolehan: 1200000, tanggalBeli: "2023-01-05", lokasi: "Pos RT", status: "tersedia" },
];

const mockPinjaman = [
  { id: "PNJ-1", barang: "Sound System", peminjam: "Budi Santoso", tglPinjam: "2026-03-25", tglKembali: "-", status: "Dipinjam", keperluan: "Acara pengajian" },
  { id: "PNJ-2", barang: "Tenda 4x6m (2)", peminjam: "Ahmad Fauzi", tglPinjam: "2026-03-20", tglKembali: "2026-03-22", status: "Dikembalikan", keperluan: "Hajatan" },
];

const Inventaris = () => {
  const [search, setSearch] = useState("");

  const filtered = mockInventaris.filter(i => i.nama.toLowerCase().includes(search.toLowerCase()) || i.kode.toLowerCase().includes(search.toLowerCase()));

  const formatRp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;
  const totalNilai = mockInventaris.reduce((a, i) => a + i.nilaiPerolehan, 0);

  const kondisiColor = (k: string) => {
    if (k === "Baik") return "bg-success";
    if (k.includes("Rusak Ringan") || k.includes("Sebagian")) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <DashboardLayout>
      <div className="module-page-header flex items-start justify-between">
        <div>
          <h1 className="module-page-title">Inventaris RT</h1>
          <p className="module-page-subtitle">Kelola data barang dan aset milik RT</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gradient-primary gap-1"><Plus className="w-4 h-4" /> Tambah Barang</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Tambah Inventaris</DialogTitle></DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="space-y-2"><Label>Nama Barang</Label><Input placeholder="Nama barang" /></div>
              <div className="space-y-2"><Label>Kode</Label><Input placeholder="KDE-001" /></div>
              <div className="space-y-2"><Label>Kategori</Label>
                <Select><SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="perabotan">Perabotan</SelectItem>
                    <SelectItem value="elektronik">Elektronik</SelectItem>
                    <SelectItem value="perlengkapan">Perlengkapan Acara</SelectItem>
                    <SelectItem value="kebersihan">Kebersihan</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Jumlah</Label><Input type="number" placeholder="0" /></div>
              <div className="space-y-2"><Label>Satuan</Label><Input placeholder="unit/set/buah" /></div>
              <div className="space-y-2"><Label>Kondisi</Label>
                <Select><SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baik">Baik</SelectItem>
                    <SelectItem value="rusak_ringan">Rusak Ringan</SelectItem>
                    <SelectItem value="rusak_berat">Rusak Berat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Nilai Perolehan (Rp)</Label><Input type="number" placeholder="0" /></div>
              <div className="space-y-2"><Label>Tanggal Beli</Label><Input type="date" /></div>
              <div className="space-y-2 col-span-2"><Label>Lokasi Penyimpanan</Label><Input placeholder="Gudang RT" /></div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline">Batal</Button>
              <Button className="gradient-primary">Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Aset" value={mockInventaris.length} icon={Package} gradient="gradient-primary" />
        <StatCard title="Kondisi Baik" value={mockInventaris.filter(i => i.kondisi === "Baik").length} icon={CheckCircle} gradient="gradient-success" />
        <StatCard title="Perlu Perhatian" value={mockInventaris.filter(i => i.kondisi !== "Baik").length} icon={AlertTriangle} gradient="gradient-warning" />
        <StatCard title="Total Nilai" value={formatRp(totalNilai)} icon={DollarSign} gradient="gradient-info" />
      </div>

      <Tabs defaultValue="data-barang">
        <TabsList>
          <TabsTrigger value="data-barang">Data Barang</TabsTrigger>
          <TabsTrigger value="pinjaman">Pinjaman Barang</TabsTrigger>
        </TabsList>

        <TabsContent value="data-barang">
          <div className="data-table-wrapper">
            <div className="p-4 border-b">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Cari barang..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Kode</TableHead>
                    <TableHead>Nama Barang</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Kondisi</TableHead>
                    <TableHead className="hidden md:table-cell">Nilai</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((item, i) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                      <TableCell className="font-mono text-xs">{item.kode}</TableCell>
                      <TableCell className="font-medium">{item.nama}</TableCell>
                      <TableCell className="text-sm">{item.kategori}</TableCell>
                      <TableCell>{item.jumlah} {item.satuan}</TableCell>
                      <TableCell><Badge className={`text-xs ${kondisiColor(item.kondisi)}`}>{item.kondisi}</Badge></TableCell>
                      <TableCell className="hidden md:table-cell text-sm">{formatRp(item.nilaiPerolehan)}</TableCell>
                      <TableCell><Badge variant={item.status === "dipinjam" ? "outline" : "secondary"} className="text-xs">{item.status === "dipinjam" ? "Dipinjam" : "Tersedia"}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pinjaman">
          <div className="data-table-wrapper">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Barang</TableHead>
                    <TableHead>Peminjam</TableHead>
                    <TableHead>Keperluan</TableHead>
                    <TableHead>Tgl Pinjam</TableHead>
                    <TableHead>Tgl Kembali</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPinjaman.map((p, i) => (
                    <TableRow key={p.id}>
                      <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                      <TableCell className="font-medium">{p.barang}</TableCell>
                      <TableCell>{p.peminjam}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.keperluan}</TableCell>
                      <TableCell className="text-sm">{p.tglPinjam}</TableCell>
                      <TableCell className="text-sm">{p.tglKembali}</TableCell>
                      <TableCell><Badge className={`text-xs ${p.status === "Dipinjam" ? "bg-warning" : "bg-success"}`}>{p.status}</Badge></TableCell>
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

export default Inventaris;
