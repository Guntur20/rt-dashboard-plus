import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { Wallet, TrendingUp, TrendingDown, DollarSign, Plus, Download, Search, FileSpreadsheet } from "lucide-react";
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

const mockKas = [
  { id: "KAS-1", tanggal: "2026-03-28", jenis: "masuk", kategori: "Iuran Warga", keterangan: "Iuran Maret - Budi Santoso", jumlah: 50000, saldo: 5250000 },
  { id: "KAS-2", tanggal: "2026-03-27", jenis: "keluar", kategori: "Operasional", keterangan: "Pembelian alat kebersihan", jumlah: 150000, saldo: 5200000 },
  { id: "KAS-3", tanggal: "2026-03-26", jenis: "masuk", kategori: "Iuran Warga", keterangan: "Iuran Maret - Ahmad Fauzi", jumlah: 50000, saldo: 5350000 },
  { id: "KAS-4", tanggal: "2026-03-25", jenis: "keluar", kategori: "Keamanan", keterangan: "Honor satpam bulan Maret", jumlah: 1500000, saldo: 5300000 },
  { id: "KAS-5", tanggal: "2026-03-24", jenis: "masuk", kategori: "Sumbangan", keterangan: "Sumbangan Pak Hendra", jumlah: 500000, saldo: 6800000 },
];

const mockGL = [
  { kategori: "Iuran Warga", masuk: 3200000, keluar: 0 },
  { kategori: "Operasional", masuk: 0, keluar: 850000 },
  { kategori: "Keamanan", masuk: 0, keluar: 1500000 },
  { kategori: "Kebersihan", masuk: 0, keluar: 600000 },
  { kategori: "Sumbangan", masuk: 1500000, keluar: 0 },
  { kategori: "Mushalla", masuk: 0, keluar: 300000 },
];

const KasRT = () => {
  const [search, setSearch] = useState("");
  const [filterJenis, setFilterJenis] = useState("all");

  const filtered = mockKas.filter(k => {
    const matchSearch = k.keterangan.toLowerCase().includes(search.toLowerCase());
    const matchJenis = filterJenis === "all" || k.jenis === filterJenis;
    return matchSearch && matchJenis;
  });

  const formatRp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

  return (
    <DashboardLayout>
      <div className="module-page-header flex items-start justify-between">
        <div>
          <h1 className="module-page-title">Kas RT</h1>
          <p className="module-page-subtitle">Laporan keuangan dan buku kas RT</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1"><Download className="w-4 h-4" /> Export</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gradient-primary gap-1"><Plus className="w-4 h-4" /> Tambah Transaksi</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Tambah Transaksi Kas</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Jenis Transaksi</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Pilih jenis" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masuk">Pemasukan</SelectItem>
                      <SelectItem value="keluar">Pengeluaran</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tanggal</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Kategori</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Pilih kategori" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iuran">Iuran Warga</SelectItem>
                      <SelectItem value="operasional">Operasional</SelectItem>
                      <SelectItem value="keamanan">Keamanan</SelectItem>
                      <SelectItem value="kebersihan">Kebersihan</SelectItem>
                      <SelectItem value="mushalla">Mushalla</SelectItem>
                      <SelectItem value="sumbangan">Sumbangan</SelectItem>
                      <SelectItem value="lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Jumlah (Rp)</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Keterangan</Label>
                  <Textarea placeholder="Detail transaksi" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Batal</Button>
                  <Button className="gradient-primary">Simpan</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Saldo Saat Ini" value={formatRp(5250000)} icon={Wallet} gradient="gradient-primary" />
        <StatCard title="Pemasukan Bulan Ini" value={formatRp(3700000)} icon={TrendingUp} gradient="gradient-success" />
        <StatCard title="Pengeluaran Bulan Ini" value={formatRp(2450000)} icon={TrendingDown} gradient="gradient-destructive" />
        <StatCard title="Total Transaksi" value={42} icon={DollarSign} gradient="gradient-info" />
      </div>

      <Tabs defaultValue="buku-kas">
        <TabsList>
          <TabsTrigger value="buku-kas">Buku Kas</TabsTrigger>
          <TabsTrigger value="general-ledger"><FileSpreadsheet className="w-4 h-4 mr-1" /> General Ledger</TabsTrigger>
        </TabsList>

        <TabsContent value="buku-kas">
          <div className="data-table-wrapper">
            <div className="p-4 flex flex-col sm:flex-row gap-3 border-b">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Cari transaksi..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={filterJenis} onValueChange={setFilterJenis}>
                <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="masuk">Pemasukan</SelectItem>
                  <SelectItem value="keluar">Pengeluaran</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Jenis</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Keterangan</TableHead>
                    <TableHead className="text-right">Jumlah</TableHead>
                    <TableHead className="text-right">Saldo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((k, i) => (
                    <TableRow key={k.id}>
                      <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                      <TableCell className="text-sm">{k.tanggal}</TableCell>
                      <TableCell>
                        <Badge className={`text-xs ${k.jenis === "masuk" ? "bg-success" : "bg-destructive"}`}>
                          {k.jenis === "masuk" ? "Masuk" : "Keluar"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{k.kategori}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{k.keterangan}</TableCell>
                      <TableCell className={`text-right font-medium text-sm ${k.jenis === "masuk" ? "text-green-600" : "text-red-600"}`}>
                        {k.jenis === "masuk" ? "+" : "-"}{formatRp(k.jumlah)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatRp(k.saldo)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="general-ledger">
          <div className="data-table-wrapper">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold text-sm">General Ledger — Tahun 2026</h3>
              <Button variant="outline" size="sm" className="gap-1"><Download className="w-3 h-3" /> Export GL</Button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kategori</TableHead>
                    <TableHead className="text-right">Debit (Masuk)</TableHead>
                    <TableHead className="text-right">Kredit (Keluar)</TableHead>
                    <TableHead className="text-right">Saldo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockGL.map((g) => (
                    <TableRow key={g.kategori}>
                      <TableCell className="font-medium">{g.kategori}</TableCell>
                      <TableCell className="text-right text-green-600 text-sm">{g.masuk > 0 ? formatRp(g.masuk) : "-"}</TableCell>
                      <TableCell className="text-right text-red-600 text-sm">{g.keluar > 0 ? formatRp(g.keluar) : "-"}</TableCell>
                      <TableCell className="text-right font-medium text-sm">{formatRp(g.masuk - g.keluar)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2 font-bold">
                    <TableCell>TOTAL</TableCell>
                    <TableCell className="text-right text-green-600">{formatRp(mockGL.reduce((a, g) => a + g.masuk, 0))}</TableCell>
                    <TableCell className="text-right text-red-600">{formatRp(mockGL.reduce((a, g) => a + g.keluar, 0))}</TableCell>
                    <TableCell className="text-right">{formatRp(mockGL.reduce((a, g) => a + g.masuk - g.keluar, 0))}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default KasRT;
