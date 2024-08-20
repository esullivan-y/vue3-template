import { ref } from "vue";
import { useDebounceFn } from "@vueuse/core";

/**
 * @description usePage 接收一个 getListApi 参数，返回列表所需数据
 * @param {Function} getListApi  - 获取分页列表数据的接口
 */
export default function usePage(getListApi: any) {
  const searchForm: any = ref({});
  const page: Ref<{ current: number; size: number; total: number }> = ref({
    current: 1,
    size: 10,
    total: 0,
  });
  const tableLoading = ref(false);
  const reset = () => {
    page.value.current = 1;
    queryPage();
  };
  const tableData = ref([]);

  const queryPage = useDebounceFn(() => {
    sendRequest();
  }, 300);

  async function sendRequest() {
    tableLoading.value = true;
    const result = await getListApi({
      size: page.value.size,
      current: page.value.current,
      ...searchForm.value,
    });
    const data = result.data;
    tableLoading.value = false;
    // console.log(data);
    if (data) {
      page.value.total = data.total ? data.total : 0;
      tableData.value = data.list ? data.list : [];
    }
  }

  return {
    searchForm,
    tableLoading,
    page,
    tableData,
    reset,
    queryPage,
  };
}
