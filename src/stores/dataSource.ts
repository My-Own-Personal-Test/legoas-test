import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDataSource = defineStore('dataSource', () => {
  const data = ref([
    {
      noKewajiban: 'B20116005069',
      noPolisi: 'KT 3090 BJS',
      pemilik: 'PT OLX',
      peserta: 'Suyono',
      noVA: '',
      hargaTerbentuk: 93850000,
      biayaAdmin: 0,
      ppn: 0,
      total: 93850000,
      tgglLelang: 1605027600000,
      tgglJatuhTempo: 1605621600000,
      tgglLunas: 0,
      status: 'Konfirmasi pembayaran',
    },
    {
      noKewajiban: 'B20116005067',
      noPolisi: 'KT 3090 JSX',
      pemilik: 'PT OLX',
      peserta: 'Budiman',
      noVA: 95621000012456,
      hargaTerbentuk: 13950000,
      biayaAdmin: 0,
      ppn: 0,
      total: 13950000,
      tgglLelang: 1605016800000,
      tgglJatuhTempo: 1605535200000,
      tgglLunas: 1605286800000,
      status: 'Lunas',
    },
    {
      noKewajiban: 'B20116005065',
      noPolisi: 'B 1234 JEP',
      pemilik: 'PT OLX',
      peserta: 'Suherman',
      noVA: 95621000012459,
      hargaTerbentuk: 190000000,
      biayaAdmin: 0,
      ppn: 0,
      total: 190000000,
      tgglLelang: 1604854800000,
      tgglJatuhTempo: 1605373200000,
      tgglLunas: 0,
      status: 'Proses pembayaran',
    },
  ])

  return { data }
})
