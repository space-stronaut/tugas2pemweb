const { createApp } = Vue;
createApp({
    data() {
        return {
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
            }
        }
      },
        methods : {
            detail(noDo) {
                this.tracking[noDo].perjalanan.forEach(e => {
                    this.detailPerjalanan.push(e)
                })
            },
            checkTest() {
                let date = new Date();
                let year = date.getFullYear()
                let sequence = (Number(Object.keys(this.tracking)[Object.keys(this.tracking).length - 1].split('-')[1])+ 1).toString()
                // console.log(sequence.padStart(4, '0'))
                console.log("DO" + year + "-" + sequence.padStart(4, '0'))
            }
        }
}).mount('#app');