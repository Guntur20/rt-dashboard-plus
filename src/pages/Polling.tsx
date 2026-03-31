import DashboardLayout from "@/components/DashboardLayout";
import { Vote, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const mockPolling = [
  { id: "POL-1", judul: "Pembelian CCTV untuk Gerbang Utama", deskripsi: "Apakah warga setuju untuk membeli CCTV baru?", pilihan: "Setuju,Tidak Setuju,Abstain", votes: "35,8,5", status: "aktif", deadline: "2026-04-15" },
  { id: "POL-2", judul: "Cat Ulang Pagar Lingkungan", deskripsi: "Pemilihan warna cat untuk pagar lingkungan", pilihan: "Hijau,Biru,Putih,Abu-abu", votes: "12,18,8,10", status: "aktif", deadline: "2026-04-10" },
  { id: "POL-3", judul: "Penambahan Tong Sampah", deskripsi: "Setujukah warga dengan pengadaan tong sampah organik/anorganik?", pilihan: "Setuju,Tidak Setuju", votes: "42,3", status: "selesai", deadline: "2026-03-20" },
];

const Polling = () => {
  return (
    <DashboardLayout>
      <div className="module-page-header flex items-start justify-between">
        <div>
          <h1 className="module-page-title">Polling Warga</h1>
          <p className="module-page-subtitle">Voting dan polling untuk keputusan RT</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gradient-primary gap-1"><Plus className="w-4 h-4" /> Buat Polling</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Buat Polling Baru</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2"><Label>Judul Polling</Label><Input placeholder="Judul polling" /></div>
              <div className="space-y-2"><Label>Deskripsi</Label><Textarea placeholder="Jelaskan tujuan polling" /></div>
              <div className="space-y-2"><Label>Pilihan (pisahkan koma)</Label><Input placeholder="Setuju, Tidak Setuju, Abstain" /></div>
              <div className="space-y-2"><Label>Deadline</Label><Input type="date" /></div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Batal</Button>
                <Button className="gradient-primary">Buat</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {mockPolling.map(p => {
          const pilihan = p.pilihan.split(",");
          const votes = p.votes.split(",").map(Number);
          const total = votes.reduce((a, v) => a + v, 0);

          return (
            <Card key={p.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center"><Vote className="w-4 h-4 text-white" /></div>
                    <div>
                      <CardTitle className="text-base">{p.judul}</CardTitle>
                      <p className="text-xs text-muted-foreground">{p.deskripsi}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${p.status === "aktif" ? "bg-success" : "bg-muted"}`}>{p.status}</Badge>
                    <span className="text-xs text-muted-foreground">s/d {p.deadline}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {pilihan.map((opt, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{opt}</span>
                      <span className="text-muted-foreground">{votes[i]} suara ({total > 0 ? Math.round((votes[i] / total) * 100) : 0}%)</span>
                    </div>
                    <Progress value={total > 0 ? (votes[i] / total) * 100 : 0} className="h-2" />
                  </div>
                ))}
                <p className="text-xs text-muted-foreground text-right">Total: {total} suara</p>
                {p.status === "aktif" && (
                  <div className="flex gap-2 pt-2">
                    {pilihan.map((opt, i) => (
                      <Button key={i} variant="outline" size="sm" className="text-xs">{opt}</Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default Polling;
