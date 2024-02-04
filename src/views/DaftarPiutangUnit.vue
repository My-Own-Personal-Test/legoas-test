<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { orderBy } from 'lodash'
import { data } from '@/dataSource'
import { convertDateFromMilli, formatNumber } from '@/utils/numberFormat'
import { DialogController } from '@/composables/ui/dialogController'
import buttonComponent from '@/components/ui/atoms/buttonComponent.vue'
import AdvanceSearchDialog from '@/components/pageComponents/DaftarPiutangUnit/AdvanceSearchDialog.vue'

type Table = Record<string, any>

const dataTable = ref<Table[]>([])
const sortingColumn = ref<string>('')
const sortingOrder = ref<'asc' | 'desc'>('asc')
const inputRow = ref<Record<string, any>>({})

const dialog = new DialogController()

const sortedData = computed(() => {
  return orderBy(dataTable.value, [sortingColumn.value], [sortingOrder.value])
})

onBeforeMount(() => {
  dataTable.value = data.value satisfies Table
})

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
    <div class="py-4 w-full flex justify-between">
      <buttonComponent
        class="btn-success btn-sm"
        el-type="btn"
        @click="pay"
      >
        <Icon
          icon="ant-design:dollar-circle-filled"
          class="text-lg"
        />
        Bayar
      </buttonComponent>

      <div class="flex gap-x-4">
        <buttonComponent
          el-type="btn"
          class="btn-sm btn-primary"
          @click="dialog.useDialogController({ content: 'advance-search', show: true })"
        >
          <Icon
            icon="ant-design:search-outlined"
            class="text-lg"
          />
          Advance Search
        </buttonComponent>
        <buttonComponent
          el-type="btn"
          class="btn-sm btn-info"
        >
          <Icon
            icon="ant-design:reload-outlined"
            class="text-lg"
          />
          Refresh
        </buttonComponent>
      </div>
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
            <th
              class="hover:cursor-pointer"
              @click="sortColumn('tgglJatuhTempo')"
            >
              Tanggal Jatuh Tempo
              <Icon
                icon="ant-design:sort-ascending-outlined"
                class="text-lg"
              />
            </th>
            <th
              class="hover:cursor-pointer"
              @click="sortColumn('tgglLunas')"
            >
              Tanggal Lunas
              <Icon
                icon="ant-design:sort-ascending-outlined"
                class="text-lg"
              />
            </th>
            <th
              class="hover:cursor-pointer"
              @click="sortColumn('status')"
            >
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
            <td>
              {{ item.noKewajiban }}
            </td>
            <td>
              {{ item.noPolisi }}
            </td>
            <td>
              {{ item.pemilik }}
            </td>
            <td>
              {{ item.peserta }}
            </td>
            <td>
              {{ item.noVA }}
            </td>
            <td>
              {{ formatNumber(item.hargaTerbentuk) }}
            </td>
            <td>
              {{ formatNumber(item.biayaAdmin) }}
            </td>
            <td>
              {{ formatNumber(item.ppn) }}
            </td>
            <td>
              {{ formatNumber(item.total) }}
            </td>
            <td>
              {{ convertDateFromMilli(item.tgglLelang) }}
            </td>
            <td>
              {{ convertDateFromMilli(item.tgglJatuhTempo) }}
            </td>
            <td>
              {{ convertDateFromMilli(item.tgglLunas) }}
            </td>
            <td>
              {{ item.status }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <AdvanceSearchDialog />
</template>
