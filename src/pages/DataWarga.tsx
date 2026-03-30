import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { Users, User, Baby, PersonStanding, Search, Plus, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const mockWarga = [
  { id: 1, nik: "3201010101010001", nama: "Budi Santoso", jk: "L", ttl: "Jakarta, 15-03-1985", status: "Kawin", pekerjaan: "Wiraswasta", noKK: "3201010101010001", blok: "A-01" },
  { id: 2, nik: "3201010101010002", nama: "Siti Nurhaliza", jk: "P", ttl: "Bandung, 22-07-1988", status: "Kawin", pekerjaan: "IRT", noKK: "3201010101010001", blok: "A-01" },
  { id: 3, nik: "3201010101010003", nama: "Ahmad Fauzi", jk: "L", ttl: "Surabaya, 01-12-1990", status: "Belum Kawin", pekerjaan: "Karyawan", noKK: "3201010101010002", blok: "A-02" },
  { id: 4, nik: "3201010101010004", nama: "Dewi Lestari", jk: "P", ttl: "Medan, 10-05-1975", status: "Janda", pekerjaan: "Pedagang", noKK: "3201010101010003", blok: "B-01" },
  { id: 5, nik: "3201010101010005", nama: "Hendra Wijaya", jk: "L", ttl: "Semarang, 30-08-1992", status: "Kawin", pekerjaan: "PNS", noKK: "3201010101010004", blok: "B-02" },
  { id: 6, nik: "3201010101010006", nama: "Rina Marlina", jk: "P", ttl: "Yogyakarta, 14-11-1995", status: "Belum Kawin", pekerjaan: "Mahasiswa", noKK: "3201010101010004", blok: "B-02" },
  { id: 7, nik: "3201010101010007", nama: "Kosong", jk: "-", ttl: "-", status: "Kosong", pekerjaan: "-", noKK: "-", blok: "C-03" },
];

const DataWarga = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = mockWarga.filter(w => {
    const matchSearch = w.nama.toLowerCase().includes(search.toLowerCase()) || w.nik.includes(search);
    const matchStatus = filterStatus === "all" || w.status.toLowerCase() === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <DashboardLayout>
      <div className="module-page-header">
        <h1 className="module-page-title">Data Warga</h1>
        <p className="module-page-subtitle">Kelola data seluruh warga RT</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Jiwa" value={256} icon={Users} gradient="gradient-primary" />
        <StatCard title="Laki-laki" value={132} icon={User} gradient="gradient-info" />
        <StatCard title="Perempuan" value={124} icon={User} gradient="gradient-success" />
        <StatCard title="Balita" value={18} icon={Baby} gradient="gradient-warning" />
      </div>

      <div className="data-table-wrapper">
        <div className="p-4 flex flex-col sm:flex-row gap-3 border-b">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama atau NIK..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px]">
                <Filter className="w-4 h-4 mr-1" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="kawin">Kawin</SelectItem>
                <SelectItem value="belum kawin">Belum Kawin</SelectItem>
                <SelectItem value="janda">Janda</SelectItem>
                <SelectItem value="duda">Duda</SelectItem>
                <SelectItem value="kosong">Kosong</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon"><Download className="w-4 h-4" /></Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gradient-primary gap-1"><Plus className="w-4 h-4" /> Tambah</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Tambah Data Warga</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label>NIK</Label>
                    <Input placeholder="Nomor Induk Kependudukan" />
                  </div>
                  <div className="space-y-2">
                    <Label>Nama Lengkap</Label>
                    <Input placeholder="Nama lengkap" />
                  </div>
                  <div className="space-y-2">
                    <Label>Jenis Kelamin</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="L">Laki-laki</SelectItem>
                        <SelectItem value="P">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tempat, Tanggal Lahir</Label>
                    <Input placeholder="Kota, DD-MM-YYYY" />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kawin">Kawin</SelectItem>
                        <SelectItem value="belum_kawin">Belum Kawin</SelectItem>
                        <SelectItem value="janda">Janda</SelectItem>
                        <SelectItem value="duda">Duda</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Pekerjaan</Label>
                    <Input placeholder="Pekerjaan" />
                  </div>
                  <div className="space-y-2">
                    <Label>No. KK</Label>
                    <Input placeholder="Nomor KK" />
                  </div>
                  <div className="space-y-2">
                    <Label>Blok/Rumah</Label>
                    <Input placeholder="Contoh: A-01" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline">Batal</Button>
                  <Button className="gradient-primary">Simpan</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>NIK</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>JK</TableHead>
                <TableHead className="hidden md:table-cell">TTL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Pekerjaan</TableHead>
                <TableHead>Blok</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((w, i) => (
                <TableRow key={w.id} className={w.status === "Kosong" ? "opacity-50" : ""}>
                  <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                  <TableCell className="font-mono text-xs">{w.nik}</TableCell>
                  <TableCell className="font-medium">{w.nama}</TableCell>
                  <TableCell>
                    <Badge variant={w.jk === "L" ? "default" : "secondary"} className="text-xs">
                      {w.jk}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{w.ttl}</TableCell>
                  <TableCell>
                    <Badge variant={w.status === "Kosong" ? "outline" : "secondary"} className="text-xs">
                      {w.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{w.pekerjaan}</TableCell>
                  <TableCell className="font-medium">{w.blok}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DataWarga;
