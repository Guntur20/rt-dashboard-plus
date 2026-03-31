import DashboardLayout from "@/components/DashboardLayout";
import { Megaphone, Plus, Share2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockPengumuman = [
  { id: "PGM-1", judul: "Jadwal Kerja Bakti Bulanan", isi: "Diberitahukan kepada seluruh warga RT 005 bahwa akan diadakan kerja bakti pada hari Minggu, 30 Maret 2026 pukul 07:00 WIB.", kategori: "Kegiatan", createdAt: "2026-03-28", lampiran: "" },
  { id: "PGM-2", judul: "Pembayaran Iuran Bulan April", isi: "Mohon kepada warga yang belum membayar iuran bulan Maret untuk segera melunasi. Iuran April dimulai tgl 1.", kategori: "Keuangan", createdAt: "2026-03-26", lampiran: "" },
  { id: "PGM-3", judul: "Sosialisasi Program Bantuan Sosial", isi: "Akan diadakan sosialisasi terkait program bantuan sosial dari pemerintah di Aula RT pada hari Sabtu, 29 Maret 2026.", kategori: "Informasi", createdAt: "2026-03-24", lampiran: "poster.pdf" },
];

const Pengumuman = () => {
  const kategoriColor = (k: string) => {
    switch (k) {
      case "Kegiatan": return "bg-info";
      case "Keuangan": return "bg-warning";
      case "Informasi": return "bg-success";
      default: return "bg-muted";
    }
  };

  return (
    <DashboardLayout>
      <div className="module-page-header flex items-start justify-between">
        <div>
          <h1 className="module-page-title">Pengumuman</h1>
          <p className="module-page-subtitle">Kelola pengumuman untuk warga RT</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gradient-primary gap-1"><Plus className="w-4 h-4" /> Tambah Pengumuman</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Buat Pengumuman Baru</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2"><Label>Judul Pengumuman</Label><Input placeholder="Judul pengumuman" /></div>
              <div className="space-y-2"><Label>Kategori</Label>
                <Select><SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kegiatan">Kegiatan</SelectItem>
                    <SelectItem value="keuangan">Keuangan</SelectItem>
                    <SelectItem value="informasi">Informasi</SelectItem>
                    <SelectItem value="penting">Penting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Pengumuman Untuk</Label>
                <Select><SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Semua Warga</SelectItem>
                    <SelectItem value="pengurus">Pengurus RT</SelectItem>
                    <SelectItem value="ibu">Ibu-Ibu</SelectItem>
                    <SelectItem value="bapak">Bapak-Bapak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Isi Pengumuman</Label><Textarea placeholder="Tulis isi pengumuman..." className="min-h-[120px]" /></div>
              <div className="space-y-2">
                <Label>Lampiran</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="w-6 h-6 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Upload PDF, JPG, PNG</p>
                  <Input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Batal</Button>
                <Button className="gradient-primary">Publikasikan</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {mockPengumuman.map(p => (
          <Card key={p.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <Megaphone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{p.judul}</CardTitle>
                    <p className="text-xs text-muted-foreground">{p.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${kategoriColor(p.kategori)}`}>{p.kategori}</Badge>
                  <Button variant="ghost" size="sm" className="text-xs h-7 gap-1">
                    <Share2 className="w-3 h-3" /> WhatsApp
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{p.isi}</p>
              {p.lampiran && <p className="text-xs text-primary mt-2">📎 {p.lampiran}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Pengumuman;
