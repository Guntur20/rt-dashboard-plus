import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { FileText, Users, Home, Search, Plus, Download, Upload, Eye, Pencil, Trash2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface AnggotaKK {
  id: string;
  nik: string;
  nama: string;
  jk: string;
  tempatLahir: string;
  tglLahir: string;
  hubungan: string;
  pendidikan: string;
  pekerjaan: string;
}

interface KKData {
  id: string;
  noKK: string;
  namaKepala: string;
  alamat: string;
  rt: string;
  kelurahan: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  status: string;
  jumlahAnggota: number;
  anggota: AnggotaKK[];
}

const initialKK: KKData[] = [
  {
    id: "KK-1", noKK: "3201010101010001", namaKepala: "Budi Santoso", alamat: "Jl. Mawar No.1", rt: "005",
    kelurahan: "Sukamaju", kecamatan: "Cimanggis", kabupaten: "Depok", provinsi: "Jawa Barat", status: "aktif", jumlahAnggota: 4,
    anggota: [
      { id: "A1", nik: "3201010101010001", nama: "Budi Santoso", jk: "L", tempatLahir: "Jakarta", tglLahir: "15-03-1985", hubungan: "Kepala Keluarga", pendidikan: "S1", pekerjaan: "Wiraswasta" },
      { id: "A2", nik: "3201010101010010", nama: "Siti Nurhaliza", jk: "P", tempatLahir: "Bandung", tglLahir: "22-07-1988", hubungan: "Istri", pendidikan: "S1", pekerjaan: "IRT" },
      { id: "A3", nik: "3201010101010011", nama: "Andi Santoso", jk: "L", tempatLahir: "Depok", tglLahir: "10-02-2010", hubungan: "Anak", pendidikan: "SD", pekerjaan: "Pelajar" },
      { id: "A4", nik: "3201010101010012", nama: "Putri Santoso", jk: "P", tempatLahir: "Depok", tglLahir: "05-08-2015", hubungan: "Anak", pendidikan: "TK", pekerjaan: "-" },
    ]
  },
  {
    id: "KK-2", noKK: "3201010101010002", namaKepala: "Ahmad Fauzi", alamat: "Jl. Melati No.3", rt: "005",
    kelurahan: "Sukamaju", kecamatan: "Cimanggis", kabupaten: "Depok", provinsi: "Jawa Barat", status: "aktif", jumlahAnggota: 2,
    anggota: [
      { id: "B1", nik: "3201010101010003", nama: "Ahmad Fauzi", jk: "L", tempatLahir: "Surabaya", tglLahir: "01-12-1990", hubungan: "Kepala Keluarga", pendidikan: "S1", pekerjaan: "Karyawan" },
      { id: "B2", nik: "3201010101010013", nama: "Rina Fauzi", jk: "P", tempatLahir: "Jakarta", tglLahir: "15-04-1992", hubungan: "Istri", pendidikan: "D3", pekerjaan: "Guru" },
    ]
  },
  {
    id: "KK-3", noKK: "3201010101010003", namaKepala: "Dewi Lestari", alamat: "Jl. Anggrek No.5", rt: "005",
    kelurahan: "Sukamaju", kecamatan: "Cimanggis", kabupaten: "Depok", provinsi: "Jawa Barat", status: "aktif", jumlahAnggota: 3,
    anggota: [
      { id: "C1", nik: "3201010101010004", nama: "Dewi Lestari", jk: "P", tempatLahir: "Medan", tglLahir: "10-05-1975", hubungan: "Kepala Keluarga", pendidikan: "SMA", pekerjaan: "Pedagang" },
      { id: "C2", nik: "3201010101010014", nama: "Fikri Lestari", jk: "L", tempatLahir: "Depok", tglLahir: "20-01-2000", hubungan: "Anak", pendidikan: "S1", pekerjaan: "Karyawan" },
      { id: "C3", nik: "3201010101010015", nama: "Nisa Lestari", jk: "P", tempatLahir: "Depok", tglLahir: "12-06-2005", hubungan: "Anak", pendidikan: "SMA", pekerjaan: "Pelajar" },
    ]
  },
  {
    id: "KK-4", noKK: "-", namaKepala: "Rumah C-03", alamat: "Jl. Kenanga No.7", rt: "005",
    kelurahan: "Sukamaju", kecamatan: "Cimanggis", kabupaten: "Depok", provinsi: "Jawa Barat", status: "kosong", jumlahAnggota: 0,
    anggota: []
  },
];

const KartuKeluarga = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [inputMode, setInputMode] = useState<"manual" | "upload">("manual");
  const [kkList, setKkList] = useState<KKData[]>(initialKK);
  const [selectedKK, setSelectedKK] = useState<KKData | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editKK, setEditKK] = useState<KKData | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const { toast } = useToast();

  const filtered = kkList.filter(k => {
    const matchSearch = k.namaKepala.toLowerCase().includes(search.toLowerCase()) || k.noKK.includes(search);
    const matchStatus = filterStatus === "all" || k.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleDelete = (id: string) => {
    setKkList(prev => prev.filter(k => k.id !== id));
    toast({ title: "Berhasil", description: "Data KK berhasil dihapus" });
  };

  const handleDeleteAnggota = (kkId: string, anggotaId: string) => {
    setKkList(prev => prev.map(kk => {
      if (kk.id !== kkId) return kk;
      const newAnggota = kk.anggota.filter(a => a.id !== anggotaId);
      return { ...kk, anggota: newAnggota, jumlahAnggota: newAnggota.length };
    }));
    if (selectedKK?.id === kkId) {
      setSelectedKK(prev => {
        if (!prev) return prev;
        const newAnggota = prev.anggota.filter(a => a.id !== anggotaId);
        return { ...prev, anggota: newAnggota, jumlahAnggota: newAnggota.length };
      });
    }
    toast({ title: "Berhasil", description: "Anggota berhasil dihapus" });
  };

  return (
    <DashboardLayout>
      <div className="module-page-header flex items-start justify-between">
        <div>
          <h1 className="module-page-title">Kartu Keluarga</h1>
          <p className="module-page-subtitle">Kelola data Kartu Keluarga warga RT</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gradient-primary gap-1"><Plus className="w-4 h-4" /> Tambah KK</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Kartu Keluarga</DialogTitle>
            </DialogHeader>
            <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as "manual" | "upload")} className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manual">Input Manual</TabsTrigger>
                <TabsTrigger value="upload">Upload PDF</TabsTrigger>
              </TabsList>
              <TabsContent value="upload" className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm font-medium">Upload file KK (PDF)</p>
                  <p className="text-xs text-muted-foreground mt-1">Drag & drop atau klik untuk memilih file</p>
                  <Input type="file" className="hidden" accept=".pdf" />
                </div>
                <p className="text-xs text-muted-foreground">* Data akan otomatis terisi setelah upload berhasil</p>
              </TabsContent>
              <TabsContent value="manual" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2"><Label>No. Kartu Keluarga</Label><Input placeholder="16 digit No. KK" /></div>
                  <div className="space-y-2"><Label>Nama Kepala Keluarga</Label><Input placeholder="Nama lengkap" /></div>
                  <div className="space-y-2"><Label>Alamat</Label><Input placeholder="Alamat lengkap" /></div>
                  <div className="space-y-2"><Label>RT</Label><Input placeholder="005" /></div>
                  <div className="space-y-2"><Label>Kelurahan</Label><Input placeholder="Kelurahan" /></div>
                  <div className="space-y-2"><Label>Kecamatan</Label><Input placeholder="Kecamatan" /></div>
                  <div className="space-y-2"><Label>Kabupaten/Kota</Label><Input placeholder="Kabupaten/Kota" /></div>
                  <div className="space-y-2"><Label>Provinsi</Label><Input placeholder="Provinsi" /></div>
                  <div className="space-y-2"><Label>Kode Pos</Label><Input placeholder="Kode pos" /></div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aktif">Aktif</SelectItem>
                        <SelectItem value="kosong">Kosong/Belum Berpenghuni</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline">Batal</Button>
              <Button className="gradient-primary">Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total KK" value={kkList.length} icon={FileText} gradient="gradient-primary" />
        <StatCard title="KK Aktif" value={kkList.filter(k => k.status === "aktif").length} icon={Users} gradient="gradient-success" />
        <StatCard title="Kosong/Belum Huni" value={kkList.filter(k => k.status === "kosong").length} icon={Home} gradient="gradient-warning" />
        <StatCard title="Total Anggota" value={kkList.reduce((a, k) => a + k.jumlahAnggota, 0)} icon={Users} gradient="gradient-info" />
      </div>

      <div className="data-table-wrapper">
        <div className="p-4 flex flex-col sm:flex-row gap-3 border-b">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Cari No. KK atau Kepala Keluarga..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="aktif">Aktif</SelectItem>
                <SelectItem value="kosong">Kosong</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon"><Download className="w-4 h-4" /></Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>No. KK</TableHead>
                <TableHead>Kepala Keluarga</TableHead>
                <TableHead className="hidden md:table-cell">Alamat</TableHead>
                <TableHead>Anggota</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((k, i) => (
                <TableRow key={k.id} className={k.status === "kosong" ? "opacity-50" : ""}>
                  <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                  <TableCell className="font-mono text-xs">{k.noKK}</TableCell>
                  <TableCell className="font-medium">{k.namaKepala}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{k.alamat}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">{k.jumlahAnggota} jiwa</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={k.status === "kosong" ? "outline" : "default"} className="text-xs">
                      {k.status === "kosong" ? "Kosong" : "Aktif"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" className="text-xs h-7" onClick={() => { setSelectedKK(k); setDetailOpen(true); }}>
                        <Eye className="w-3 h-3 mr-1" />Detail
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs h-7" onClick={() => { setEditKK(k); setEditOpen(true); }}>
                        <Pencil className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs h-7 text-destructive hover:text-destructive" onClick={() => handleDelete(k.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Detail KK Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" /> Detail Kartu Keluarga
            </DialogTitle>
          </DialogHeader>
          {selectedKK && (
            <div className="space-y-6">
              {/* KK Info Card */}
              <Card>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div><span className="text-muted-foreground block text-xs">No. KK</span><span className="font-mono font-medium">{selectedKK.noKK}</span></div>
                    <div><span className="text-muted-foreground block text-xs">Kepala Keluarga</span><span className="font-medium">{selectedKK.namaKepala}</span></div>
                    <div><span className="text-muted-foreground block text-xs">Status</span><Badge variant={selectedKK.status === "kosong" ? "outline" : "default"} className="text-xs mt-1">{selectedKK.status === "kosong" ? "Kosong" : "Aktif"}</Badge></div>
                    <div><span className="text-muted-foreground block text-xs">Alamat</span><span>{selectedKK.alamat}</span></div>
                    <div><span className="text-muted-foreground block text-xs">RT/Kelurahan</span><span>{selectedKK.rt} / {selectedKK.kelurahan}</span></div>
                    <div><span className="text-muted-foreground block text-xs">Kecamatan</span><span>{selectedKK.kecamatan}</span></div>
                    <div><span className="text-muted-foreground block text-xs">Kabupaten</span><span>{selectedKK.kabupaten}</span></div>
                    <div><span className="text-muted-foreground block text-xs">Provinsi</span><span>{selectedKK.provinsi}</span></div>
                    <div><span className="text-muted-foreground block text-xs">Jumlah Anggota</span><span className="font-bold">{selectedKK.jumlahAnggota} jiwa</span></div>
                  </div>
                </CardContent>
              </Card>

              {/* Anggota KK Table */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm flex items-center gap-2"><Users className="w-4 h-4" /> Anggota Keluarga</h3>
                  <Button size="sm" className="gradient-primary gap-1 text-xs h-7"><UserPlus className="w-3 h-3" /> Tambah Anggota</Button>
                </div>
                <div className="data-table-wrapper">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>#</TableHead>
                          <TableHead>NIK</TableHead>
                          <TableHead>Nama</TableHead>
                          <TableHead>JK</TableHead>
                          <TableHead className="hidden md:table-cell">TTL</TableHead>
                          <TableHead>Hubungan</TableHead>
                          <TableHead className="hidden md:table-cell">Pendidikan</TableHead>
                          <TableHead className="hidden md:table-cell">Pekerjaan</TableHead>
                          <TableHead>Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedKK.anggota.map((a, i) => (
                          <TableRow key={a.id}>
                            <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                            <TableCell className="font-mono text-xs">{a.nik}</TableCell>
                            <TableCell className="font-medium">{a.nama}</TableCell>
                            <TableCell><Badge variant={a.jk === "L" ? "default" : "secondary"} className="text-xs">{a.jk}</Badge></TableCell>
                            <TableCell className="hidden md:table-cell text-xs">{a.tempatLahir}, {a.tglLahir}</TableCell>
                            <TableCell><Badge variant="outline" className="text-xs">{a.hubungan}</Badge></TableCell>
                            <TableCell className="hidden md:table-cell text-xs">{a.pendidikan}</TableCell>
                            <TableCell className="hidden md:table-cell text-xs">{a.pekerjaan}</TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button variant="outline" size="sm" className="h-6 w-6 p-0"><Pencil className="w-3 h-3" /></Button>
                                <Button variant="outline" size="sm" className="h-6 w-6 p-0 text-destructive hover:text-destructive" onClick={() => handleDeleteAnggota(selectedKK.id, a.id)}>
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        {selectedKK.anggota.length === 0 && (
                          <TableRow><TableCell colSpan={9} className="text-center text-muted-foreground py-8">Tidak ada anggota (rumah kosong)</TableCell></TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit KK Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Edit Kartu Keluarga</DialogTitle></DialogHeader>
          {editKK && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="space-y-2 col-span-2"><Label>No. KK</Label><Input defaultValue={editKK.noKK} /></div>
              <div className="space-y-2"><Label>Nama Kepala Keluarga</Label><Input defaultValue={editKK.namaKepala} /></div>
              <div className="space-y-2"><Label>Alamat</Label><Input defaultValue={editKK.alamat} /></div>
              <div className="space-y-2"><Label>RT</Label><Input defaultValue={editKK.rt} /></div>
              <div className="space-y-2"><Label>Kelurahan</Label><Input defaultValue={editKK.kelurahan} /></div>
              <div className="space-y-2"><Label>Kecamatan</Label><Input defaultValue={editKK.kecamatan} /></div>
              <div className="space-y-2"><Label>Kabupaten</Label><Input defaultValue={editKK.kabupaten} /></div>
              <div className="space-y-2"><Label>Provinsi</Label><Input defaultValue={editKK.provinsi} /></div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue={editKK.status}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aktif">Aktif</SelectItem>
                    <SelectItem value="kosong">Kosong</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 flex justify-end gap-2 mt-2">
                <Button variant="outline" onClick={() => setEditOpen(false)}>Batal</Button>
                <Button className="gradient-primary" onClick={() => { setEditOpen(false); toast({ title: "Berhasil", description: "Data KK berhasil diupdate" }); }}>Simpan</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default KartuKeluarga;
