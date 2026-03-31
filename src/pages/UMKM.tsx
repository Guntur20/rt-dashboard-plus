import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { ShoppingBag, Users, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const mockUMKM = [
  { id: "UMK-1", namaWarga: "Siti Nurhaliza", namaUsaha: "Warung Makan Siti", kategori: "Kuliner", deskripsi: "Nasi uduk, nasi goreng, pecel lele", noHP: "0812-xxxx-xxxx", instagram: "@warungsiti", status: "aktif" },
  { id: "UMK-2", namaWarga: "Dewi Lestari", namaUsaha: "Kue Dewi", kategori: "Kuliner", deskripsi: "Kue basah dan kering untuk acara", noHP: "0813-xxxx-xxxx", instagram: "@kuedewi", status: "aktif" },
  { id: "UMK-3", namaWarga: "Ahmad Fauzi", namaUsaha: "Service AC Fauzi", kategori: "Jasa", deskripsi: "Service dan pemasangan AC", noHP: "0856-xxxx-xxxx", instagram: "", status: "aktif" },
];

const UMKM = () => {
  const [search, setSearch] = useState("");
  const filtered = mockUMKM.filter(u => u.namaUsaha.toLowerCase().includes(search.toLowerCase()) || u.namaWarga.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="module-page-header flex items-start justify-between">
        <div>
          <h1 className="module-page-title">UMKM Warga</h1>
          <p className="module-page-subtitle">Direktori usaha mikro kecil menengah warga</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gradient-primary gap-1"><Plus className="w-4 h-4" /> Tambah UMKM</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Tambah Data UMKM</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2"><Label>Pemilik Usaha</Label>
                <Select><SelectTrigger><SelectValue placeholder="Pilih warga" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Budi Santoso</SelectItem>
                    <SelectItem value="2">Siti Nurhaliza</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Nama Usaha</Label><Input placeholder="Nama usaha" /></div>
              <div className="space-y-2"><Label>Kategori</Label>
                <Select><SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kuliner">Kuliner</SelectItem>
                    <SelectItem value="jasa">Jasa</SelectItem>
                    <SelectItem value="perdagangan">Perdagangan</SelectItem>
                    <SelectItem value="kerajinan">Kerajinan</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Deskripsi</Label><Textarea placeholder="Deskripsi usaha" /></div>
              <div className="space-y-2"><Label>No. HP</Label><Input placeholder="08xx-xxxx-xxxx" /></div>
              <div className="space-y-2"><Label>Instagram</Label><Input placeholder="@username" /></div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Batal</Button>
                <Button className="gradient-primary">Simpan</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard title="Total UMKM" value={mockUMKM.length} icon={ShoppingBag} gradient="gradient-primary" />
        <StatCard title="Pelaku Usaha" value={mockUMKM.length} icon={Users} gradient="gradient-info" />
      </div>

      <div className="data-table-wrapper">
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Cari UMKM..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Nama Usaha</TableHead>
                <TableHead>Pemilik</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="hidden md:table-cell">Deskripsi</TableHead>
                <TableHead>Kontak</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u, i) => (
                <TableRow key={u.id}>
                  <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                  <TableCell className="font-medium">{u.namaUsaha}</TableCell>
                  <TableCell className="text-sm">{u.namaWarga}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{u.kategori}</Badge></TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-[200px] truncate">{u.deskripsi}</TableCell>
                  <TableCell className="text-sm">{u.noHP}</TableCell>
                  <TableCell><Badge className="bg-success text-xs">{u.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UMKM;
