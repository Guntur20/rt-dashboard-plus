import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { Users, User, Baby, Search, Plus, Download, Filter, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// ==========================================
// PENTING: GANTI DENGAN URL WEB APP ANDA
// ==========================================
const WURL = "https://script.google.com/macros/s/AKfycbzxtXglMQZVD8XytKA7W-cVek7kbhM8O50epvGCDdMHZirhGJxepCIMwf5f4yLNf6HD/exec";

const DataWarga = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [wargaList, setWargaList] = useState([]); // Mulai dengan array kosong
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  
  // State untuk Form Input Tambah Warga
  const [formData, setFormData] = useState({
    nik: "", nama: "", jk: "L", ttl: "", status: "Belum Kawin", pekerjaan: "", noKK: "", blok: ""
  });

  const { toast } = useToast();

  // 1. FUNGSI AMBIL DATA DARI GOOGLE SHEETS
  const fetchWarga = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(WURL + "?action=getWarga");
      const result = await response.json();
      if (result.success) {
        setWargaList(result.data);
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Gagal mengambil data dari Google Sheets" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWarga();
  }, []);

  // 2. FUNGSI SIMPAN DATA KE GOOGLE SHEETS
  const handleSimpan = async () => {
    if (!formData.nama || !formData.nik) {
      return toast({ variant: "destructive", title: "Gagal", description: "Nama dan NIK wajib diisi" });
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(WURL, {
        method: "POST",
        body: JSON.stringify({ action: "saveWarga", data: formData })
      });
      const result = await response.json();

      if (result.success) {
        toast({ title: "Berhasil", description: "Data warga telah disimpan ke Google Sheets" });
        setOpenAdd(false);
        setFormData({ nik: "", nama: "", jk: "L", ttl: "", status: "Belum Kawin", pekerjaan: "", noKK: "", blok: "" });
        fetchWarga(); // Refresh tabel
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Koneksi ke server gagal" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. FUNGSI HAPUS DATA
  const handleDelete = async (id: string) => {
    if (!confirm("Hapus data ini?")) return;
    try {
      await fetch(WURL, {
        method: "POST",
        body: JSON.stringify({ action: "deleteWarga", data: { id } })
      });
      toast({ title: "Dihapus", description: "Data warga telah dihapus" });
      fetchWarga();
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "Gagal menghapus" });
    }
  };

  const filtered = wargaList.filter(w => {
    const matchSearch = (w.nama || "").toLowerCase().includes(search.toLowerCase()) || (w.nik || "").includes(search);
    const matchStatus = filterStatus === "all" || (w.status || "").toLowerCase() === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <DashboardLayout>
      <div className="module-page-header">
        <h1 className="module-page-title">Data Warga</h1>
        <p className="module-page-subtitle">Kelola data seluruh warga RT (Real-time dari Google Sheets)</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Jiwa" value={wargaList.length} icon={Users} gradient="gradient-primary" />
        <StatCard title="Laki-laki" value={wargaList.filter(w => w.jk === 'L').length} icon={User} gradient="gradient-info" />
        <StatCard title="Perempuan" value={wargaList.filter(w => w.jk === 'P').length} icon={User} gradient="gradient-success" />
        <StatCard title="Balita" value={18} icon={Baby} gradient="gradient-warning" />
      </div>

      <div className="data-table-wrapper">
        <div className="p-4 flex flex-col sm:flex-row gap-3 border-b">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Cari nama atau NIK..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px]"><Filter className="w-4 h-4 mr-1" /><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="kawin">Kawin</SelectItem>
                <SelectItem value="belum kawin">Belum Kawin</SelectItem>
                <SelectItem value="janda">Janda</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={fetchWarga}><Loader2 className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /></Button>
            
            <Dialog open={openAdd} onOpenChange={setOpenAdd}>
              <DialogTrigger asChild>
                <Button className="gradient-primary gap-1"><Plus className="w-4 h-4" /> Tambah</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader><DialogTitle>Tambah Data Warga</DialogTitle></DialogHeader>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2"><Label>NIK</Label><Input value={formData.nik} onChange={(e) => setFormData({...formData, nik: e.target.value})} /></div>
                  <div className="space-y-2"><Label>Nama Lengkap</Label><Input value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} /></div>
                  <div className="space-y-2"><Label>Jenis Kelamin</Label>
                    <Select onValueChange={(v) => setFormData({...formData, jk: v})} value={formData.jk}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="L">Laki-laki</SelectItem><SelectItem value="P">Perempuan</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2"><Label>Tempat, Tanggal Lahir</Label><Input value={formData.ttl} onChange={(e) => setFormData({...formData, ttl: e.target.value})} /></div>
                  <div className="space-y-2"><Label>Status</Label>
                    <Select onValueChange={(v) => setFormData({...formData, status: v})} value={formData.status}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="Kawin">Kawin</SelectItem><SelectItem value="Belum Kawin">Belum Kawin</SelectItem><SelectItem value="Janda">Janda</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2"><Label>Pekerjaan</Label><Input value={formData.pekerjaan} onChange={(e) => setFormData({...formData, pekerjaan: e.target.value})} /></div>
                  <div className="space-y-2"><Label>No. KK</Label><Input value={formData.noKK} onChange={(e) => setFormData({...formData, noKK: e.target.value})} /></div>
                  <div className="space-y-2"><Label>Blok/Rumah</Label><Input value={formData.blok} onChange={(e) => setFormData({...formData, blok: e.target.value})} /></div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setOpenAdd(false)}>Batal</Button>
                  <Button className="gradient-primary" onClick={handleSimpan} disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Simpan Ke Sheet"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          {isLoading ? (
            <div className="flex items-center justify-center p-20 text-muted-foreground"><Loader2 className="w-6 h-6 animate-spin mr-2" /> Menghubungkan ke Google Sheets...</div>
          ) : (
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>NIK</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>JK</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Blok</TableHead>
                    <TableHead>Aksi</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {filtered.map((w, i) => (
                    <TableRow key={w.id || i}>
                    <TableCell className="font-mono text-xs">{w.nik}</TableCell>
                    <TableCell className="font-medium">{w.nama}</TableCell>
                    <TableCell><Badge variant={w.jk === "L" ? "default" : "secondary"}>{w.jk}</Badge></TableCell>
                    <TableCell>{w.status}</TableCell>
                    <TableCell>{w.blok}</TableCell>
                    <TableCell>
                        <div className="flex gap-1">
                        <Button variant="outline" size="sm" className="h-7 w-7 p-0 text-destructive" onClick={() => handleDelete(w.id)}><Trash2 className="w-3 h-3" /></Button>
                        </div>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DataWarga;
