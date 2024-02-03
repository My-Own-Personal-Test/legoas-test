<script lang="ts" setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import { data } from '@/dataSource'
import { convertMillisecondsToDateFormat, formatNumber } from '@/utils/numberFormat'

type Table = Record<string, any>

const dataTable = ref<Table[]>([])

onBeforeMount(() => {
  convertDate()
  convertPrice()
})

onMounted(() => {
  dataTable.value = data satisfies Table
})

function convertDate() {
  for (const item of data) {
    item.tgglJatuhTempo = convertMillisecondsToDateFormat(item.tgglJatuhTempo) as any
    item.tgglLelang = convertMillisecondsToDateFormat(item.tgglLelang) as any
    item.tgglLunas = item.tgglLunas ? convertMillisecondsToDateFormat(item.tgglLunas as any) : ''
  }
}

function convertPrice() {
  for (const item of data) {
    item.biayaAdmin = formatNumber(item.biayaAdmin) as any
    item.hargaTerbentuk = formatNumber(item.hargaTerbentuk) as any
    item.total = formatNumber(item.total) as any
  }
}
</script>

<template>
  <section class="container py-4">
    <div class="overflow-x-auto w-full ">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  class="checkbox"
                >
              </label>
            </th>
            <th>No. Kewajiban</th>
            <th>No. Polisi</th>
            <th>Pemilik</th>
            <th>Peserta</th>
            <th>Nomor VA</th>
            <th>Harga Terbentuk (Rp)</th>
            <th>Biaya Admin ex PPN (Rp)</th>
            <th>PPN (Rp)</th>
            <th>Total (Rp)</th>
            <th>Tanggal Lelang</th>
            <th>Tanggal Jatuh Tempo</th>
            <th>Tanggal Lunas</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr
            v-for="(item, index) in dataTable"
            :key="index"
          >
            <th>
              <label>
                <input
                  type="checkbox"
                  class="checkbox"
                  :value="index"
                >
              </label>
            </th>
            <td
              v-for="itemData of item"
              :key="itemData.id"
            >
              {{ itemData }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
