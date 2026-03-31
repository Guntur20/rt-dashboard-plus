import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { HandHeart, Users, Trophy, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockArisan = [
  { id: "ARS-1", nama: "Arisan Ibu-Ibu RT", nominal: 100000, periode: "bulanan", peserta: "Siti,Dewi,Rina,Ani,Budi,Wati,Yuni,Mega", pemenangList: "Siti,Dewi,Rina", periode_ke: 4, status: "aktif" },
  { id: "ARS-2", nama: "Arisan Bapak-Bapak", nominal: 200000, periode: "bulanan", peserta: "Budi,Ahmad,Hendra,Joko,Rudi", pemenangList: "Budi", periode_ke: 2, status: "aktif" },
];

const Arisan = () => {
  return (
    <DashboardLayout>
      <div className="module-page-header flex items-start justify-between">
        <div>
          <h1 className="module-page-title">Arisan RT</h1>
          <p className="module-page-subtitle">Kelola arisan warga RT</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gradient-primary gap-1"><Plus className="w-4 h-4" /> Buat Arisan</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Buat Arisan Baru</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2"><Label>Nama Arisan</Label><Input placeholder="Nama arisan" /></div>
              <div className="space-y-2"><Label>Nominal per Orang (Rp)</Label><Input type="number" placeholder="100000" /></div>
              <div className="space-y-2"><Label>Periode</Label>
                <Select><SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mingguan">Mingguan</SelectItem>
                    <SelectItem value="bulanan">Bulanan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Metode Undian</Label>
                <Select><SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual (Kocokan)</SelectItem>
                    <SelectItem value="otomatis">Otomatis (Sistem)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Peserta (pisahkan koma)</Label><Textarea placeholder="Nama1, Nama2, Nama3..." /></div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Batal</Button>
                <Button className="gradient-primary">Simpan</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <StatCard title="Arisan Aktif" value={2} icon={HandHeart} gradient="gradient-primary" />
        <StatCard title="Total Peserta" value={13} icon={Users} gradient="gradient-info" />
        <StatCard title="Total Pemenang" value={4} icon={Trophy} gradient="gradient-success" />
      </div>

      <div className="grid gap-4">
        {mockArisan.map(a => {
          const pesertaList = a.peserta.split(",");
          const pemenangList = a.pemenangList ? a.pemenangList.split(",") : [];
          const belum = pesertaList.filter(p => !pemenangList.includes(p));
          return (
            <Card key={a.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{a.nama}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Nominal: Rp {a.nominal.toLocaleString("id-ID")} / {a.periode} • Periode ke-{a.periode_ke}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-xs">🎲 Kocok Undian</Button>
                    <Badge className="bg-success text-xs">{a.status}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Sudah Menang ({pemenangList.length})</p>
                    <div className="flex flex-wrap gap-1">
                      {pemenangList.map(p => <Badge key={p} className="bg-success text-xs">{p}</Badge>)}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Belum Menang ({belum.length})</p>
                    <div className="flex flex-wrap gap-1">
                      {belum.map(p => <Badge key={p} variant="outline" className="text-xs">{p}</Badge>)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default Arisan;
