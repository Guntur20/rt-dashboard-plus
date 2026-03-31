import DashboardLayout from "@/components/DashboardLayout";
import { ClipboardList, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const mockJadwal = [
  { id: "JAD-1", judul: "Kerja Bakti Bulanan", tanggal: "2026-03-30", waktuMulai: "07:00", waktuSelesai: "11:00", lokasi: "Lingkungan RT", petugas: "Seluruh Warga", kategori: "Kebersihan", keterangan: "Membersihkan lingkungan" },
  { id: "JAD-2", judul: "Rapat Pengurus RT", tanggal: "2026-04-05", waktuMulai: "19:30", waktuSelesai: "21:00", lokasi: "Aula RT", petugas: "Pengurus RT", kategori: "Rapat", keterangan: "Evaluasi bulanan" },
  { id: "JAD-3", judul: "Posyandu Balita", tanggal: "2026-04-14", waktuMulai: "08:00", waktuSelesai: "12:00", lokasi: "Pos RT", petugas: "Kader Posyandu", kategori: "Kesehatan", keterangan: "Penimbangan dan imunisasi" },
  { id: "JAD-4", judul: "Pengajian Rutin", tanggal: "2026-04-17", waktuMulai: "19:00", waktuSelesai: "21:00", lokasi: "Mushalla", petugas: "DKM", kategori: "Keagamaan", keterangan: "Pengajian bulanan" },
];

const JadwalKegiatan = () => {
  const [search, setSearch] = useState("");
  const filtered = mockJadwal.filter(j => j.judul.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="module-page-header flex items-start justify-between">
        <div>
          <h1 className="module-page-title">Jadwal Kegiatan</h1>
          <p className="module-page-subtitle">Kelola jadwal kegiatan dan acara RT</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gradient-primary gap-1"><Plus className="w-4 h-4" /> Tambah Jadwal</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Tambah Jadwal Kegiatan</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2"><Label>Nama Kegiatan</Label><Input placeholder="Nama kegiatan" /></div>
              <div className="space-y-2"><Label>Kategori</Label>
                <Select><SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kebersihan">Kebersihan</SelectItem>
                    <SelectItem value="rapat">Rapat</SelectItem>
                    <SelectItem value="kesehatan">Kesehatan</SelectItem>
                    <SelectItem value="keagamaan">Keagamaan</SelectItem>
                    <SelectItem value="sosial">Sosial</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2"><Label>Tanggal</Label><Input type="date" /></div>
                <div className="space-y-2"><Label>Mulai</Label><Input type="time" /></div>
                <div className="space-y-2"><Label>Selesai</Label><Input type="time" /></div>
              </div>
              <div className="space-y-2"><Label>Lokasi</Label><Input placeholder="Lokasi kegiatan" /></div>
              <div className="space-y-2"><Label>Penanggung Jawab</Label><Input placeholder="PJ kegiatan" /></div>
              <div className="space-y-2"><Label>Deskripsi</Label><Textarea placeholder="Deskripsi kegiatan" /></div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Batal</Button>
                <Button className="gradient-primary">Simpan</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="data-table-wrapper">
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Cari kegiatan..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Kegiatan</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Waktu</TableHead>
                <TableHead className="hidden md:table-cell">Lokasi</TableHead>
                <TableHead className="hidden md:table-cell">PJ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((j, i) => (
                <TableRow key={j.id}>
                  <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                  <TableCell className="font-medium">{j.judul}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{j.kategori}</Badge></TableCell>
                  <TableCell className="text-sm">{j.tanggal}</TableCell>
                  <TableCell className="text-sm">{j.waktuMulai} - {j.waktuSelesai}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{j.lokasi}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{j.petugas}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JadwalKegiatan;
