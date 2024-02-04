<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { type LocationQueryValueRaw, useRouter } from 'vue-router'
import { useDataSource } from '@/stores/dataSource'
import { formatNumber } from '@/utils/numberFormat'
import { DialogController } from '@/composables/ui/dialogController'
import dialogComponent from '@/components/ui/molecules/dialogComponent.vue'
import buttonComponent from '@/components/ui/atoms/buttonComponent.vue'

const dataSource = useDataSource()
const dataValue = ref(dataSource.data)
const statusOptions = ['Proses pembayaran', 'Lunas', 'Konfirmasi pembayaran', 'Batal']

const dialog = new DialogController()
const router = useRouter()

const minVal = computed(() => {
  let value = 0
  const compareVal: number[] = []
  for (const item of dataValue.value)
    compareVal.push(item.hargaTerbentuk)

  value = Math.min(...compareVal)

  return value
})
const searchParams = ref({
  price: 0,
  date: null as string | null,
  status: [] as string[],
})

const maxVal = computed(() => {
  let value = 0
  const compareVal: number[] = []
  for (const item of dataValue.value)
    compareVal.push(item.hargaTerbentuk)

  value = Math.max(...compareVal)

  return value
})

function search() {
  dataSource.data = dataValue.value.filter((item) => {
    const priceCondition = Math.abs(item.hargaTerbentuk - searchParams.value.price) <= (maxVal.value - minVal.value) / 2

    const dateCondition
      = searchParams.value.date === null
      || new Date(item.tgglLelang).toISOString().split('T')[0] === searchParams.value.date

    const statusCondition
      = searchParams.value.status.length === 0 || searchParams.value.status.includes(item.status)

    return priceCondition && dateCondition && statusCondition
  })

  router.replace({
    name: 'dpu-page',
    query: {
      price: searchParams.value.price ?? searchParams.value.price,
      date: searchParams.value.date ?? searchParams.value.date,
      status: searchParams.value.status ?? searchParams.value.status,
    },
  })

  dialog.useDialogController({ content: 'advance-search', show: false })
}

function reset() {
  searchParams.value = {
    price: minVal.value,
    date: null,
    status: [],
  }

  dataSource.data = dataSource.originalData
}
</script>

<template>
  <dialogComponent
    id="advance-search"
    size="w-3xl"
  >
    <header class="pb-8">
      <span class="text-xl font-semibold">Advance Search</span>
    </header>
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        ✕
      </button>
    </form>
    <div class="flex flex-col gap-y-6">
      <div class="flex flex-col gap-y-2">
        <label for="price-input">Rentang Harga</label>
        <input
          id="price-input"
          v-model="searchParams.price"
          class="range range-primary"
          type="range"
          :min="minVal"
          :max="maxVal"
        >
        {{ formatNumber(searchParams.price as number) }}
      </div>

      <div class="flex flex-col gap-y-2">
        <label for="price-input">Tanggal Lelang</label>
        <input
          id="price-input"
          v-model="searchParams.date"
          class="input input-primary"
          type="date"
        >
      </div>

      <div class="form-control">
        <span>Status</span>
        <label
          v-for="(item, index) in statusOptions"
          :key="index"
          class="label cursor-pointer"
        >
          <span class="label-text">{{ item }}</span>
          <input
            v-model="searchParams.status"
            type="checkbox"
            :value="item"
            class="checkbox checkbox-primary"
          >
        </label>
      </div>

      <div class="flex w-full justify-center gap-x-4">
        <buttonComponent
          el-type="btn"
          class="btn-primary btn-sm w-1/2"
          @click="search"
        >
          <Icon
            icon="ant-design:search-outlined"
            class="text-xl"
          />
          <span>Search</span>
        </buttonComponent>

        <buttonComponent
          el-type="btn"
          class="btn-error btn-sm w-1/2"
          @click="reset"
        >
          <Icon
            icon="ant-design:reload-outlined"
            class="text-xl"
          />
          <span>reset</span>
        </buttonComponent>
      </div>
    </div>
  </dialogComponent>
</template>
