const { createApp } = Vue;
createApp({
    data() {
        return {
          showAddForm : false,
          filterForm : false,
          upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
          kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
          kategoriBoolean : false,
          filter : {
            upbjj : "",
            kategori : "",
            status : ""
          },
          input : {
            index : 0,
            kode : "",
            judul : "",
            kategori : "",
            upbjj : "",
            lokasiRak : "",
            harga : 0,
            qty : 0,
            safety : 0,
            catatanHTML : ""
          },
          stok: [
            {
                kode: "EKMA4116",
                judul: "Pengantar Manajemen",
                kategori: "MK Wajib",
                upbjj: "Jakarta",
                lokasiRak: "R1-A3",
                harga: 65000,
                qty: 28,
                safety: 20,
                catatanHTML: "<em>Edisi 2024, cetak ulang</em>"
            },
            {
                kode: "EKMA4115",
                judul: "Pengantar Akuntansi",
                kategori: "MK Wajib",
                upbjj: "Jakarta",
                lokasiRak: "R1-A4",
                harga: 60000,
                qty: 7,
                safety: 15,
                catatanHTML: "<strong>Cover baru</strong>"
            },
            {
                kode: "BIOL4201",
                judul: "Biologi Umum (Praktikum)",
                kategori: "Praktikum",
                upbjj: "Surabaya",
                lokasiRak: "R3-B2",
                harga: 80000,
                qty: 12,
                safety: 10,
                catatanHTML: "Butuh <u>pendingin</u> untuk kit basah"
            },
            {
                kode: "FISIP4001",
                judul: "Dasar-Dasar Sosiologi",
                kategori: "MK Pilihan",
                upbjj: "Makassar",
                lokasiRak: "R2-C1",
                harga: 55000,
                qty: 2,
                safety: 8,
                catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder"
            }
        ],
        }
      },
        methods : {
            clickShowAddForm(){
                this.showAddForm = !this.showAddForm
            },
            clickShowFilter() {
                this.filterForm = !this.filterForm
            },
            editStok(s, i) {
                this.input.index=i
                this.input.kode=s.kode
                this.input.judul=s.judul
                this.input.kategori=s.kategori
                this.input.upbjj=s.upbjj
                this.input.lokasiRak=s.lokasiRak
                this.input.harga=s.harga
                this.input.qty=s.qty
                this.input.safety=s.safety
                this.input.catatanHTML=s.catatanHTML
            },
            submitStok() {
                let qty = this.input.qty
                if (qty < 1) {
                    qty = 0
                }
                this.stok[this.input.index].qty = qty

                this.input = {
                    index : 0,
                    kode : "",
                    judul : "",
                    kategori : "",
                    upbjj : "",
                    lokasiRak : "",
                    harga : 0,
                    qty : 0,
                    safety : 0,
                    catatanHTML : ""
                }

                this.showAddForm = false
            },
            addData() {
                this.stok.unshift(this.input)
                this.input = {
                    index : 0,
                    kode : "",
                    judul : "",
                    kategori : "",
                    upbjj : "",
                    lokasiRak : "",
                    harga : 0,
                    qty : 0,
                    safety : 0,
                    catatanHTML : ""
                }

                this.showAddForm = false
            }
        },
        watch : {
            stok: {
                handler() {
                    alert("Stok berubah")
                },
                deep : true
            }
        },
        computed : {
            filteredStok() {
                return this.stok.filter(e => {
                    if (this.filter.upbjj == "") {
                        this.kategoriBoolean = false
                        return e
                    } else if(this.filter.upbjj != "" && this.filter.kategori == "") {
                        this.kategoriBoolean = true
                        return e
                    }

                    if (this.filter.status == "Aman") {
                        this.kategoriBoolean = true
                        return e.upbjj == this.filter.upbjj && e.kategori == this.filter.kategori && e.qty >= e.safety
                    } else if (this.filter.status == "Menipis") {
                        this.kategoriBoolean = true
                        return e.upbjj == this.filter.upbjj && e.kategori == this.filter.kategori && e.qty < e.safety && e.qty != 0
                    } else if (this.filter.status == "Kosong"){
                        this.kategoriBoolean = true
                        return e.upbjj == this.filter.upbjj && e.kategori == this.filter.kategori && e.qty == 0
                    }

                    this.kategoriBoolean = true
                    return e.upbjj == this.filter.upbjj && e.kategori == this.filter.kategori
                })
            }
        }
}).mount('#app');