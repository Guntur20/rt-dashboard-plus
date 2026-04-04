import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { CreditCard, CheckCircle, AlertTriangle, Wallet, Plus, Download, Search, Send, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const komponenIuran = [
  { nama: "Sampah", nominal: 20000 },
  { nama: "Satpam", nominal: 10000 },
  { nama: "Mushalla", nominal: 10000 },
  { nama: "Kas RT", nominal: 10000 },
];

const initialIuran = [
  { id: 1, nama: "Budi Santoso", blok: "A-01", bulan: "Maret 2026", status: "Lunas", tglBayar: "05-03-2026", metode: "Transfer", total: 50000 },
  { id: 2, nama: "Ahmad Fauzi", blok: "A-02", bulan: "Maret 2026", status: "Belum", tglBayar: "-", metode: "-", total: 50000 },
  { id: 3, nama: "Dewi Lestari", blok: "B-01", bulan: "Maret 2026", status: "Belum", tglBayar: "-", metode: "-", total: 50000 },
  { id: 4, nama: "Hendra Wijaya", blok: "B-02", bulan: "Maret 2026", status: "Lunas", tglBayar: "02-03-2026", metode: "Cash", total: 50000 },
  { id: 5, nama: "Siti Nurhaliza", blok: "A-01", bulan: "Maret 2026", status: "Lunas", tglBayar: "10-03-2026", metode: "Transfer", total: 150000 },
];

const tunggakan = [
  { nama: "Ahmad Fauzi", blok: "A-02", bulanTunggak: 3, total: "Rp 150.000" },
  { nama: "Dewi Lestari", blok: "B-01", bulanTunggak: 2, total: "Rp 100.000" },
  { nama: "Rizky Ramadhan", blok: "C-01", bulanTunggak: 4, total: "Rp 200.000" },
  { nama: "Maya Sari", blok: "D-02", bulanTunggak: 1, total: "Rp 50.000" },
];

const IuranWarga = () => {
  const [search, setSearch] = useState("");
  const [iuranList, setIuranList] = useState(initialIuran);
  const [editItem, setEditItem] = useState<typeof initialIuran[0] | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    setIuranList(prev => prev.filter(i => i.id !== id));
    toast({ title: "Berhasil", description: "Data iuran dihapus" });
  };

  return (
    <DashboardLayout>
      <div className="module-page-header">
        <h1 className="module-page-title">Iuran Warga</h1>
        <p className="module-page-subtitle">Kelola iuran bulanan dan tagihan warga</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Iuran/Bulan" value="Rp 50rb" icon={CreditCard} gradient="gradient-primary" subtitle="Per KK" />
        <StatCard title="Sudah Bayar" value="62 KK" icon={CheckCircle} gradient="gradient-success" subtitle="Bulan ini" />
        <StatCard title="Belum Bayar" value="16 KK" icon={AlertTriangle} gradient="gradient-warning" subtitle="Bulan ini" />
        <StatCard title="Total Terkumpul" value="Rp 3.1jt" icon={Wallet} gradient="gradient-accent" subtitle="Bulan ini" />
      </div>

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Komponen Iuran (Custom)</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {komponenIuran.map((k) => (
              <div key={k.nama} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm font-medium">{k.nama}</span>
                <Badge variant="secondary">Rp {k.nominal.toLocaleString('id-ID')}</Badge>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
            <span className="font-semibold text-sm">Total Iuran per Bulan</span>
            <Badge className="gradient-primary text-primary-foreground">Rp {komponenIuran.reduce((a, b) => a + b.nominal, 0).toLocaleString('id-ID')}</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="rekap" className="mb-6">
        <TabsList>
          <TabsTrigger value="rekap">Rekap Pembayaran</TabsTrigger>
          <TabsTrigger value="tunggakan">Tunggakan</TabsTrigger>
        </TabsList>

        <TabsContent value="rekap">
          <div className="data-table-wrapper">
            <div className="p-4 flex flex-col sm:flex-row gap-3 border-b">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Cari nama warga..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="maret-2026">
                  <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maret-2026">Maret 2026</SelectItem>
                    <SelectItem value="feb-2026">Februari 2026</SelectItem>
                    <SelectItem value="jan-2026">Januari 2026</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon"><Download className="w-4 h-4" /></Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gradient-primary gap-1"><Plus className="w-4 h-4" /> Bayar Iuran</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>Pembayaran Iuran</DialogTitle></DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2"><Label>Nama Warga</Label>
                        <Select><SelectTrigger><SelectValue placeholder="Pilih warga" /></SelectTrigger>
                          <SelectContent><SelectItem value="1">Budi Santoso - A-01</SelectItem><SelectItem value="2">Ahmad Fauzi - A-02</SelectItem></SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2"><Label>Jumlah Bulan</Label>
                        <Select><SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Bulan (Rp 50.000)</SelectItem><SelectItem value="3">3 Bulan (Rp 150.000)</SelectItem>
                            <SelectItem value="6">6 Bulan (Rp 300.000)</SelectItem><SelectItem value="12">12 Bulan (Rp 600.000)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2"><Label>Metode Pembayaran</Label>
                        <Select><SelectTrigger><SelectValue placeholder="Pilih metode" /></SelectTrigger>
                          <SelectContent><SelectItem value="cash">Cash</SelectItem><SelectItem value="transfer">Transfer</SelectItem></SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2"><Label>Upload Bukti Transfer</Label><Input type="file" accept="image/*" /></div>
                      <div className="space-y-2"><Label>Keterangan</Label><Input placeholder="Keterangan tambahan" /></div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Batal</Button>
                        <Button className="gradient-primary">Simpan</Button>
                        <Button variant="outline" className="gap-1"><Send className="w-4 h-4" /> Kirim WA</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead><TableHead>Nama</TableHead><TableHead>Blok</TableHead><TableHead>Bulan</TableHead>
                    <TableHead>Status</TableHead><TableHead className="hidden md:table-cell">Tgl Bayar</TableHead>
                    <TableHead className="hidden md:table-cell">Metode</TableHead><TableHead>Total</TableHead><TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {iuranList.filter(i => i.nama.toLowerCase().includes(search.toLowerCase())).map((item, idx) => (
                    <TableRow key={item.id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell className="font-medium">{item.nama}</TableCell>
                      <TableCell>{item.blok}</TableCell>
                      <TableCell>{item.bulan}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === "Lunas" ? "default" : "destructive"} className={`text-xs ${item.status === "Lunas" ? "bg-success" : ""}`}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{item.tglBayar}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.metode}</TableCell>
                      <TableCell className="font-medium">Rp {item.total.toLocaleString('id-ID')}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={() => { setEditItem(item); setEditOpen(true); }}><Pencil className="w-3 h-3" /></Button>
                          <Button variant="outline" size="sm" className="h-7 w-7 p-0 text-destructive hover:text-destructive" onClick={() => handleDelete(item.id)}><Trash2 className="w-3 h-3" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tunggakan">
          <div className="data-table-wrapper">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-warning" /> Warga Menunggak</h3>
              <Button variant="outline" size="sm" className="gap-1"><Download className="w-4 h-4" /> Export</Button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow><TableHead>#</TableHead><TableHead>Nama</TableHead><TableHead>Blok</TableHead><TableHead>Bulan Tunggak</TableHead><TableHead>Total</TableHead><TableHead>Aksi</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {tunggakan.map((t, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell className="font-medium">{t.nama}</TableCell>
                      <TableCell>{t.blok}</TableCell>
                      <TableCell><Badge variant="destructive" className="text-xs">{t.bulanTunggak} bulan</Badge></TableCell>
                      <TableCell className="font-bold text-destructive">{t.total}</TableCell>
                      <TableCell><Button variant="outline" size="sm" className="gap-1 text-xs"><Send className="w-3 h-3" /> Ingatkan</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Data Iuran</DialogTitle></DialogHeader>
          {editItem && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2"><Label>Nama</Label><Input defaultValue={editItem.nama} /></div>
              <div className="space-y-2"><Label>Bulan</Label><Input defaultValue={editItem.bulan} /></div>
              <div className="space-y-2"><Label>Status</Label>
                <Select defaultValue={editItem.status}><SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="Lunas">Lunas</SelectItem><SelectItem value="Belum">Belum</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Total</Label><Input type="number" defaultValue={editItem.total} /></div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditOpen(false)}>Batal</Button>
                <Button className="gradient-primary" onClick={() => { setEditOpen(false); toast({ title: "Berhasil", description: "Data iuran diupdate" }); }}>Simpan</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default IuranWarga;
