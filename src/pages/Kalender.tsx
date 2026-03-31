import DashboardLayout from "@/components/DashboardLayout";
import { CalendarDays, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const mockEvents = [
  { id: "KAL-1", tanggal: "2026-03-30", judul: "Kerja Bakti", tipe: "rt", warna: "blue" },
  { id: "KAL-2", tanggal: "2026-03-31", judul: "Hari Raya Nyepi", tipe: "libur", warna: "red" },
  { id: "KAL-3", tanggal: "2026-04-05", judul: "Rapat Bulanan RT", tipe: "rt", warna: "blue" },
  { id: "KAL-4", tanggal: "2026-04-10", judul: "Cuti Bersama Idul Fitri", tipe: "libur", warna: "red" },
  { id: "KAL-5", tanggal: "2026-04-14", judul: "Posyandu Balita", tipe: "rt", warna: "green" },
  { id: "KAL-6", tanggal: "2026-04-17", judul: "17 April - Pengajian Rutin", tipe: "rt", warna: "purple" },
];

const Kalender = () => {
  const tipeColor = (t: string) => {
    switch (t) {
      case "libur": return "bg-destructive";
      case "rt": return "bg-info";
      case "cuti": return "bg-warning";
      default: return "bg-muted";
    }
  };

  return (
    <DashboardLayout>
      <div className="module-page-header flex items-start justify-between">
        <div>
          <h1 className="module-page-title">Kalender</h1>
          <p className="module-page-subtitle">Kalender kegiatan RT & hari libur nasional</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gradient-primary gap-1"><Plus className="w-4 h-4" /> Tambah Kegiatan</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Tambah Kegiatan/Acara</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2"><Label>Judul</Label><Input placeholder="Nama kegiatan" /></div>
              <div className="space-y-2"><Label>Tanggal</Label><Input type="date" /></div>
              <div className="space-y-2"><Label>Tipe</Label>
                <Select><SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rt">Kegiatan RT</SelectItem>
                    <SelectItem value="libur">Hari Libur</SelectItem>
                    <SelectItem value="cuti">Cuti Bersama</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Batal</Button>
                <Button className="gradient-primary">Simpan</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3">
        {mockEvents.map(e => (
          <Card key={e.id}>
            <CardContent className="flex items-center gap-4 py-4">
              <div className="w-12 h-12 rounded-lg bg-muted flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-muted-foreground">{new Date(e.tanggal).toLocaleDateString("id-ID", { month: "short" })}</span>
                <span className="text-lg font-bold text-foreground">{new Date(e.tanggal).getDate()}</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{e.judul}</p>
                <p className="text-xs text-muted-foreground">{new Date(e.tanggal).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
              <Badge className={`text-xs ${tipeColor(e.tipe)}`}>{e.tipe === "libur" ? "Libur" : e.tipe === "cuti" ? "Cuti" : "RT"}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Kalender;
