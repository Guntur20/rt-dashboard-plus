import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { UserCheck, Moon, Users, Plus, Search, Camera, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const mockVisitors = [
  { id: 1, nama: "Andi Pratama", tujuan: "Kunjungan biasa", rumah: "A-01 (Budi Santoso)", jam: "08:30", tgl: "30-03-2026", kendaraan: "Motor", nopol: "B 1234 CD", status: "Aktif", jenis: "Kunjungan" },
  { id: 2, nama: "Kurir JNE", tujuan: "Antar paket", rumah: "B-02 (Hendra W.)", jam: "10:15", tgl: "30-03-2026", kendaraan: "Motor", nopol: "B 5678 EF", status: "Selesai", jenis: "Paket" },
  { id: 3, nama: "Pak Teknisi PLN", tujuan: "Perbaikan listrik", rumah: "A-02 (Ahmad Fauzi)", jam: "09:00", tgl: "30-03-2026", kendaraan: "Mobil", nopol: "B 9012 GH", status: "Aktif", jenis: "Teknisi" },
  { id: 4, nama: "Rina Susanti", tujuan: "Menginap", rumah: "B-01 (Dewi Lestari)", jam: "14:00", tgl: "29-03-2026", kendaraan: "Mobil", nopol: "D 3456 IJ", status: "Menginap", jenis: "Menginap" },
  { id: 5, nama: "Delivery Grab", tujuan: "Antar paket", rumah: "C-01 (Rizky R.)", jam: "12:30", tgl: "30-03-2026", kendaraan: "Motor", nopol: "B 7890 KL", status: "Selesai", jenis: "Paket" },
];

const EVisitor = () => {
  const [search, setSearch] = useState("");

  const filtered = mockVisitors.filter(v => v.nama.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="module-page-header flex items-start justify-between">
        <div>
          <h1 className="module-page-title">E-Visitor</h1>
          <p className="module-page-subtitle">Pencatatan tamu dan pengunjung RT</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gradient-primary gap-1"><Plus className="w-4 h-4" /> Registrasi Tamu</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Registrasi Tamu Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Jenis Kunjungan</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Pilih jenis" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kunjungan">Kunjungan Biasa</SelectItem>
                    <SelectItem value="paket">Antar Paket</SelectItem>
                    <SelectItem value="menginap">Menginap</SelectItem>
                    <SelectItem value="teknisi">Kerja/Teknisi</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nama Tamu</Label>
                  <Input placeholder="Nama lengkap" />
                </div>
                <div className="space-y-2">
                  <Label>No. Identitas</Label>
                  <Input placeholder="KTP/SIM" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Rumah yang Dikunjungi</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Pilih rumah" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a01">A-01 (Budi Santoso)</SelectItem>
                    <SelectItem value="a02">A-02 (Ahmad Fauzi)</SelectItem>
                    <SelectItem value="b01">B-01 (Dewi Lestari)</SelectItem>
                    <SelectItem value="b02">B-02 (Hendra Wijaya)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Detail Keperluan</Label>
                <Textarea placeholder="Jelaskan keperluan kunjungan" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Kendaraan</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="motor">Motor</SelectItem>
                      <SelectItem value="mobil">Mobil</SelectItem>
                      <SelectItem value="sepeda">Sepeda</SelectItem>
                      <SelectItem value="jalan">Jalan Kaki</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Nomor Polisi</Label>
                  <Input placeholder="B 1234 XX" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Durasi Kunjungan</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Estimasi" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30m">30 Menit</SelectItem>
                    <SelectItem value="1h">1 Jam</SelectItem>
                    <SelectItem value="2h">2 Jam</SelectItem>
                    <SelectItem value="1d">1 Hari</SelectItem>
                    <SelectItem value="menginap">Menginap</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Catatan Tambahan</Label>
                <Textarea placeholder="Catatan tambahan (opsional)" />
              </div>
              <div className="space-y-2">
                <Label>Upload Foto</Label>
                <div className="grid grid-cols-3 gap-2">
                  {["Foto Wajah", "KTP", "Kendaraan"].map((label) => (
                    <div key={label} className="border-2 border-dashed rounded-lg p-3 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                      <Camera className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                      <span className="text-[10px] text-muted-foreground">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Batal</Button>
                <Button className="gradient-primary">Simpan</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <StatCard title="Tamu Hari Ini" value={5} icon={UserCheck} gradient="gradient-primary" />
        <StatCard title="Tamu Menginap" value={2} icon={Moon} gradient="gradient-accent" />
        <StatCard title="Total Semua" value={156} icon={Users} gradient="gradient-info" subtitle="Bulan ini" />
      </div>

      <div className="data-table-wrapper">
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Cari tamu..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Tujuan Rumah</TableHead>
                <TableHead className="hidden md:table-cell">Jam</TableHead>
                <TableHead className="hidden md:table-cell">Tanggal</TableHead>
                <TableHead className="hidden lg:table-cell">Kendaraan</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((v, i) => (
                <TableRow key={v.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="font-medium">{v.nama}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{v.jenis}</Badge></TableCell>
                  <TableCell className="text-sm">{v.rumah}</TableCell>
                  <TableCell className="hidden md:table-cell">{v.jam}</TableCell>
                  <TableCell className="hidden md:table-cell">{v.tgl}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="flex items-center gap-1 text-sm"><Car className="w-3 h-3" /> {v.nopol}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${
                      v.status === "Aktif" ? "bg-success" :
                      v.status === "Menginap" ? "bg-info" : "bg-muted text-muted-foreground"
                    }`}>
                      {v.status}
                    </Badge>
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

export default EVisitor;
