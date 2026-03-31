import DashboardLayout from "@/components/DashboardLayout";
import { BookOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockNotulen = [
  { id: "NOT-1", judul: "Rapat Evaluasi Bulanan Maret", tanggal: "2026-03-20", tempat: "Aula RT", peserta: "Ketua RT, Sekretaris, Bendahara, Kasi Keamanan", isi: "Membahas evaluasi kegiatan bulan Maret, penyusunan anggaran April, dan progress pembangunan pos ronda.", keputusan: "1. Anggaran April disetujui\n2. Pos ronda selesai minggu ke-2 April" },
  { id: "NOT-2", judul: "Rapat Koordinasi Kerja Bakti", tanggal: "2026-03-15", tempat: "Pos RT", peserta: "Seluruh pengurus RT", isi: "Perencanaan kerja bakti bulanan dan pembagian tugas.", keputusan: "Kerja bakti dilaksanakan 30 Maret, PJ: Kasi Lingkungan" },
];

const NotulenRapat = () => {
  return (
    <DashboardLayout>
      <div className="module-page-header flex items-start justify-between">
        <div>
          <h1 className="module-page-title">Notulen Rapat</h1>
          <p className="module-page-subtitle">Catatan rapat pengurus RT</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gradient-primary gap-1"><Plus className="w-4 h-4" /> Tambah Notulen</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Tambah Notulen Rapat</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2"><Label>Judul Rapat</Label><Input placeholder="Judul rapat" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2"><Label>Tanggal</Label><Input type="date" /></div>
                <div className="space-y-2"><Label>Tempat</Label><Input placeholder="Lokasi rapat" /></div>
              </div>
              <div className="space-y-2"><Label>Peserta Rapat</Label><Textarea placeholder="Daftar peserta rapat" /></div>
              <div className="space-y-2"><Label>Isi Rapat</Label><Textarea placeholder="Pembahasan rapat..." className="min-h-[100px]" /></div>
              <div className="space-y-2"><Label>Keputusan Rapat</Label><Textarea placeholder="Keputusan yang diambil..." /></div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Batal</Button>
                <Button className="gradient-primary">Simpan</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {mockNotulen.map(n => (
          <Card key={n.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"><BookOpen className="w-4 h-4 text-muted-foreground" /></div>
                  <div>
                    <CardTitle className="text-base">{n.judul}</CardTitle>
                    <p className="text-xs text-muted-foreground">{n.tanggal} • {n.tempat}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Peserta</p>
                <p className="text-sm">{n.peserta}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Pembahasan</p>
                <p className="text-sm text-muted-foreground">{n.isi}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Keputusan</p>
                <p className="text-sm whitespace-pre-line">{n.keputusan}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default NotulenRapat;
