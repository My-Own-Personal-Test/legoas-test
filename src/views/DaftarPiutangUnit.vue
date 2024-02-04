<script lang="ts" setup>
import { computed, onBeforeMount, onUpdated, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { orderBy } from 'lodash'
import { data } from '@/dataSource'
import { convertDateFromMilli, formatNumber } from '@/utils/numberFormat'
import buttonComponent from '@/components/ui/molecules/buttonComponent.vue'

type Table = Record<string, any>

const dataTable = ref<Table[]>([])
const sortingColumn = ref<string>('')
const sortingOrder = ref<'asc' | 'desc'>('asc')
const inputRow = ref<Record<string, any>>({})

const sortedData = computed(() => {
  return orderBy(dataTable.value, [sortingColumn.value], [sortingOrder.value])
})

onBeforeMount(() => {
  dataTable.value = data.value satisfies Table
})

onUpdated(() => {
  convertDate()
  convertPrice()
})

function convertDate() {
  for (const item of dataTable.value) {
    item.tgglJatuhTempo = convertDateFromMilli(item.tgglJatuhTempo) as any
    item.tgglLelang = convertDateFromMilli(item.tgglLelang) as any
    item.tgglLunas = item.tgglLunas ? convertDateFromMilli(item.tgglLunas as any) : ''
  }
}

function convertPrice() {
  for (const item of dataTable.value) {
    item.biayaAdmin = formatNumber(item.biayaAdmin) as any
    item.hargaTerbentuk = formatNumber(item.hargaTerbentuk) as any
    item.total = formatNumber(item.total) as any
  }
}

function sortColumn(column: any) {
  if (sortingColumn.value === column) {
    sortingOrder.value = sortingOrder.value === 'asc' ? 'desc' : 'asc'
  }
  else {
    sortingColumn.value = column
    sortingOrder.value = 'asc'
  }

  if (column === 'hargaTerbentuk')
    dataTable.value = orderBy(dataTable.value, [], [customHargaTerbentukComparator as any])

  else
    dataTable.value = orderBy(dataTable.value, [column], [sortingOrder.value])
}

function customHargaTerbentukComparator(a: any, b: any): number {
  const aValue = parseNumber(a.hargaTerbentuk)
  const bValue = parseNumber(b.hargaTerbentuk)

  return sortingOrder.value === 'asc' ? aValue - bValue : bValue - aValue
}

function parseNumber(value: string) {
  return Number.parseFloat(value.replace(/./g, ''))
}

function checkInput(row: object) {
  inputRow.value = row
}
function pay() {
  const arr = data.value
  for (let index = 0; index < arr.length; index++) {
    if (arr[index].noKewajiban === inputRow.value.noKewajiban)
      arr[index].status = 'Lunas'
  }
}
</script>

<template>
  <section class="p-4">
    <div class="py-4">
      <buttonComponent
        class="btn-success btn-sm"
        el-type="btn"
        @click="pay"
      >
        Bayar
      </buttonComponent>
    </div>
    <div class="overflow-x-auto w-full">
      <table
        id="idTable"
        class="table table-xs w-[110svw]"
      >
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
            <th
              class="hover:cursor-pointer"
              @click="sortColumn('noKewajiban')"
            >
              No. Kewajiban
              <Icon
                icon="ant-design:sort-ascending-outlined"
                class="text-lg"
              />
            </th>
            <th
              class="hover:cursor-pointer"
              @click="sortColumn('noPolisi')"
            >
              No. Polisi
              <Icon
                icon="ant-design:sort-ascending-outlined"
                class="text-lg"
              />
            </th>
            <th
              class="hover:cursor-pointer"
              @click="sortColumn('pemilik')"
            >
              Pemilik
              <Icon
                icon="ant-design:sort-ascending-outlined"
                class="text-lg"
              />
            </th>
            <th
              class="hover:cursor-pointer"
              @click="sortColumn('peserta')"
            >
              Peserta <Icon
                icon="ant-design:sort-ascending-outlined"
                class="text-lg"
              />
            </th>
            <th
              class="hover:cursor-pointer"
              @click="sortColumn('noVA')"
            >
              Nomor VA <Icon
                icon="ant-design:sort-ascending-outlined"
                class="text-lg"
              />
            </th>
            <th
              class="hover:cursor-pointer"
              @click="sortColumn('hargaTerbentuk')"
            >
              Harga Terbentuk (Rp) <Icon
                icon="ant-design:sort-ascending-outlined"
                class="text-lg"
              />
            </th>
            <th
              class="hover:cursor-pointer"
              @click="sortColumn('biayaAdmin')"
            >
              Biaya Admin ex PPN (Rp) <Icon
                icon="ant-design:sort-ascending-outlined"
                class="text-lg"
              />
            </th>
            <th
              class="hover:cursor-pointer"
              @click="sortColumn('ppn')"
            >
              PPN (Rp) <Icon
                icon="ant-design:sort-ascending-outlined"
                class="text-lg"
              />
            </th>
            <th
              class="hover:cursor-pointer"
              @click="sortColumn('total')"
            >
              Total (Rp)
              <Icon
                icon="ant-design:sort-ascending-outlined"
                class="text-lg"
              />
            </th>
            <th
              class="hover:cursor-pointer"
              @click="sortColumn('tgglLelang')"
            >
              Tanggal Lelang
              <Icon
                icon="ant-design:sort-ascending-outlined"
                class="text-lg"
              />
            </th>
            <th>
              Tanggal Jatuh Tempo
              <Icon
                icon="ant-design:sort-ascending-outlined"
                class="text-lg"
              />
            </th>
            <th>
              Tanggal Lunas
              <Icon
                icon="ant-design:sort-ascending-outlined"
                class="text-lg"
              />
            </th>
            <th>
              Status
              <Icon
                icon="ant-design:sort-ascending-outlined"
                class="text-lg"
              />
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr
            v-for="(item, index) in sortedData"
            :key="index"
          >
            <th>
              <label>
                <input
                  type="checkbox"
                  class="checkbox"
                  :value="index"
                  @change="checkInput(item)"
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
