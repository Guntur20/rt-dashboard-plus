import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { FileText, Clock, CheckCircle, XCircle, Plus, Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const mockPermohonan = [
  { id: 1, pemohon: "Budi Santoso", nik: "320101...0001", jenisSurat: "Surat Pengantar", keperluan: "Pembuatan KTP", tgl: "28-03-2026", status: "Diproses" },
  { id: 2, pemohon: "Siti Nurhaliza", nik: "320101...0002", jenisSurat: "Surat Keterangan Domisili", keperluan: "Pendaftaran sekolah anak", tgl: "27-03-2026", status: "Menunggu" },
  { id: 3, pemohon: "Hendra Wijaya", nik: "320101...0005", jenisSurat: "Surat Keterangan Tidak Mampu", keperluan: "Pengajuan beasiswa", tgl: "25-03-2026", status: "Selesai" },
  { id: 4, pemohon: "Ahmad Fauzi", nik: "320101...0003", jenisSurat: "Surat Pengantar", keperluan: "Pembuatan SKCK", tgl: "24-03-2026", status: "Ditolak" },
];

const PermohonanSurat = () => {
  const [search, setSearch] = useState("");

  const filtered = mockPermohonan.filter(p => p.pemohon.toLowerCase().includes(search.toLowerCase()));

  const statusColor = (status: string) => {
    switch (status) {
      case "Selesai": return "bg-success";
      case "Diproses": return "bg-info";
      case "Menunggu": return "bg-warning";
      case "Ditolak": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  return (
    <DashboardLayout>
      <div className="module-page-header flex items-start justify-between">
        <div>
          <h1 className="module-page-title">Permohonan Surat</h1>
          <p className="module-page-subtitle">Ajukan dan kelola permohonan surat warga</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gradient-primary gap-1"><Plus className="w-4 h-4" /> Buat Permohonan</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Permohonan Surat Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Nama Pemohon</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Pilih warga" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Budi Santoso</SelectItem>
                    <SelectItem value="2">Siti Nurhaliza</SelectItem>
                    <SelectItem value="3">Ahmad Fauzi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Jenis Surat</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Pilih jenis surat" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pengantar">Surat Pengantar</SelectItem>
                    <SelectItem value="domisili">Surat Keterangan Domisili</SelectItem>
                    <SelectItem value="tidak_mampu">Surat Keterangan Tidak Mampu</SelectItem>
                    <SelectItem value="usaha">Surat Keterangan Usaha</SelectItem>
                    <SelectItem value="kematian">Surat Keterangan Kematian</SelectItem>
                    <SelectItem value="pindah">Surat Keterangan Pindah</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Keperluan</Label>
                <Textarea placeholder="Jelaskan keperluan surat" />
              </div>
              <div className="space-y-2">
                <Label>Dokumen Pendukung</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="w-6 h-6 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Upload foto, PDF, JPG, PNG</p>
                  <Input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" multiple />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Keterangan Tambahan</Label>
                <Textarea placeholder="Keterangan tambahan (opsional)" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Batal</Button>
                <Button className="gradient-primary">Ajukan Permohonan</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Permohonan" value={28} icon={FileText} gradient="gradient-primary" />
        <StatCard title="Menunggu" value={3} icon={Clock} gradient="gradient-warning" />
        <StatCard title="Diproses" value={2} icon={CheckCircle} gradient="gradient-info" />
        <StatCard title="Selesai" value={21} icon={CheckCircle} gradient="gradient-success" />
      </div>

      <div className="data-table-wrapper">
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Cari permohonan..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Pemohon</TableHead>
                <TableHead className="hidden md:table-cell">NIK</TableHead>
                <TableHead>Jenis Surat</TableHead>
                <TableHead className="hidden md:table-cell">Keperluan</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p, i) => (
                <TableRow key={p.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="font-medium">{p.pemohon}</TableCell>
                  <TableCell className="hidden md:table-cell font-mono text-xs">{p.nik}</TableCell>
                  <TableCell className="text-sm">{p.jenisSurat}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{p.keperluan}</TableCell>
                  <TableCell className="text-sm">{p.tgl}</TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${statusColor(p.status)}`}>{p.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {p.status === "Menunggu" && (
                        <>
                          <Button variant="outline" size="sm" className="text-xs h-7">Proses</Button>
                          <Button variant="ghost" size="sm" className="text-xs h-7 text-destructive">Tolak</Button>
                        </>
                      )}
                      {p.status === "Selesai" && (
                        <Button variant="outline" size="sm" className="text-xs h-7">Cetak</Button>
                      )}
                    </div>
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

export default PermohonanSurat;
