const { createApp } = Vue;
createApp({
    data() {
        return {
          showAddForm : false,
          upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
          kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
          pengirimanList: [
            { kode: "REG", nama: "Reguler (3-5 hari)" },
            { kode: "EXP", nama: "Ekspres (1-2 hari)" }
          ],
          paket: [
            { kode: "PAKET-UT-001", nama: "PAKET IPS Dasar", isi: ["EKMA4116","EKMA4115"], harga: 120000 },
            { kode: "PAKET-UT-002", nama: "PAKET IPA Dasar", isi: ["BIOL4201","FISIP4001"], harga: 140000 }
          ],
          detailPerjalanan : [],
          tracking: {
                "DO2025-0001": {
                nim: "123456789",
                nama: "Rina Wulandari",
                status: "Dalam Perjalanan",
                ekspedisi: "JNE",
                tanggalKirim: "2025-08-25",
                paket: "PAKET-UT-001",
                total: 120000,
                perjalanan: [
                    { waktu: "2025-08-25 10:12:20", keterangan: "Penerimaan di Loket: TANGSEL" },
                    { waktu: "2025-08-25 14:07:56", keterangan: "Tiba di Hub: JAKSEL" },
                    { waktu: "2025-08-26 08:44:01", keterangan: "Diteruskan ke Kantor Tujuan" }
                ]
                }
            },
            input : {
                nim : "",
                nama : "",
                ekspedisi : "",
                paket : "",
                harga : 0,
                upbjj : ""
            }
        }
      },
        methods : {
            detail(noDo) {
                this.detailPerjalanan = []
                this.tracking[noDo].perjalanan.forEach(e => {
                    this.detailPerjalanan.push(e)
                })
            },
            addData() {
                let date = new Date();
                let year = date.getFullYear()
                // let tgl = date.getDate()
                // console.log(tglw)
                let sequence = (Number(Object.keys(this.tracking)[Object.keys(this.tracking).length - 1].split('-')[1])+ 1).toString()
                // console.log(sequence.padStart(4, '0'))
                let DO= "DO" + year + "-" + sequence.padStart(4, '0')
                // let jam = date.get
                // console.log(jam)

                this.paket.forEach(e => {
                    if (e.kode == this.input.paket) {
                        this.input.harga = e.harga
                    }
                })

                this.tracking[DO] = {
                    nim: this.input.nim,
                    nama: this.input.nama,
                    status: "Dipesan",
                    ekspedisi: this.input.ekspedisi,
                    tanggalKirim: date.getFullYear() + "-" + date.getMonth() + "-" + (date.getDate() + 1),
                    paket: this.input.paket,
                    total: this.input.harga,
                    perjalanan: [
                        { waktu: date.getFullYear() + "-" + date.getMonth() + "-" + (date.getDate() + 1) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(), keterangan: "Penerimaan di Loket: "+ this.input.upbjj}
                    ]
                };

                this.input = {
                    nim : "",
                    nama : "",
                    ekspedisi : "",
                    paket : "",
                    harga : 0,
                    upbjj : ""
                }
                this.showAddForm = false
            },
            clickAddForm(){
                this.showAddForm = !this.showAddForm
            }
        }
}).mount('#app');