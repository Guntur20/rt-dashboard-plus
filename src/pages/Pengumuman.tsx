import DashboardLayout from "@/components/DashboardLayout";
import { Megaphone, Plus, Share2, Upload, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const initialPengumuman = [
  { id: "PGM-1", judul: "Jadwal Kerja Bakti Bulanan", isi: "Diberitahukan kepada seluruh warga RT 005 bahwa akan diadakan kerja bakti pada hari Minggu, 30 Maret 2026 pukul 07:00 WIB.", kategori: "Kegiatan", createdAt: "2026-03-28", lampiran: "" },
  { id: "PGM-2", judul: "Pembayaran Iuran Bulan April", isi: "Mohon kepada warga yang belum membayar iuran bulan Maret untuk segera melunasi. Iuran April dimulai tgl 1.", kategori: "Keuangan", createdAt: "2026-03-26", lampiran: "" },
  { id: "PGM-3", judul: "Sosialisasi Program Bantuan Sosial", isi: "Akan diadakan sosialisasi terkait program bantuan sosial dari pemerintah di Aula RT pada hari Sabtu, 29 Maret 2026.", kategori: "Informasi", createdAt: "2026-03-24", lampiran: "poster.pdf" },
];

const Pengumuman = () => {
  const [pengumumanList, setPengumumanList] = useState(initialPengumuman);
  const [editItem, setEditItem] = useState<typeof initialPengumuman[0] | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const { toast } = useToast();

  const kategoriColor = (k: string) => {
    switch (k) {
      case "Kegiatan": return "bg-info";
      case "Keuangan": return "bg-warning";
      case "Informasi": return "bg-success";
      default: return "bg-muted";
    }
  };

  const handleDelete = (id: string) => {
    setPengumumanList(prev => prev.filter(p => p.id !== id));
    toast({ title: "Berhasil", description: "Pengumuman dihapus" });
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
                    <SelectItem value="kegiatan">Kegiatan</SelectItem><SelectItem value="keuangan">Keuangan</SelectItem>
                    <SelectItem value="informasi">Informasi</SelectItem><SelectItem value="penting">Penting</SelectItem>
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
              <div className="flex justify-end gap-2"><Button variant="outline">Batal</Button><Button className="gradient-primary">Publikasikan</Button></div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {pengumumanList.map(p => (
          <Card key={p.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <Megaphone className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{p.judul}</CardTitle>
                    <p className="text-xs text-muted-foreground">{p.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${kategoriColor(p.kategori)}`}>{p.kategori}</Badge>
                  <Button variant="ghost" size="sm" className="text-xs h-7 gap-1"><Share2 className="w-3 h-3" /> WA</Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => { setEditItem(p); setEditOpen(true); }}><Pencil className="w-3 h-3" /></Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive hover:text-destructive" onClick={() => handleDelete(p.id)}><Trash2 className="w-3 h-3" /></Button>
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

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Edit Pengumuman</DialogTitle></DialogHeader>
          {editItem && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2"><Label>Judul</Label><Input defaultValue={editItem.judul} /></div>
              <div className="space-y-2"><Label>Isi</Label><Textarea defaultValue={editItem.isi} className="min-h-[120px]" /></div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditOpen(false)}>Batal</Button>
                <Button className="gradient-primary" onClick={() => { setEditOpen(false); toast({ title: "Berhasil", description: "Pengumuman diupdate" }); }}>Simpan</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Pengumuman;
