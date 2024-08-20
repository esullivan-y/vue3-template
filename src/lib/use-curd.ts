import { ref } from "vue";
import { useDebounceFn } from "@vueuse/core";

export default function useCRUD(apis: any) {
  // 搜索表单
  const searchForm = ref({});
  // 分页信息
  const page = ref({
    pageSize: 10,
    pageNo: 1,
    total: 0,
  });
  // 表格加载loading
  const tableLoading = ref(false);
  // 表格数据
  const tableData = ref([]);

  // 重置查询
  const reset = () => {
    page.value.pageNo = 1;
    searchForm.value = {};
    queryPage();
  };

  // 分页查询 加了防抖
  const queryPage = useDebounceFn(() => {
    sendPageRequest();
  }, 300);

  /**
   * 发送分页查询请求
   */
  async function sendPageRequest() {
    tableLoading.value = true;
    const data = await apis.pageFunc({ ...page.value, ...searchForm.value });
    tableLoading.value = false;

    if (data) {
      page.value.total = data.total ? data.total : 0;
      tableData.value = data.list ? data.list : [];
    }
  }

  // 编辑or新增-表单弹窗标识
  const formVisible = ref(false);
  // 表单数据
  const formData: Ref<{ id?: string }> = ref({});
  // 显示表单弹窗
  function showForm(item: any) {
    formData.value = { ...item };
    formVisible.value = true;
  }

  /**
   * 保存数据 or 更新数据
   */
  async function saveData() {
    if (formData.value.id) {
      await apis.updateFunc(formData.value);
    } else {
      await apis.createFunc(formData.value);
    }
    formVisible.value = false;
  }
  /**
   * 删除数据
   */
  async function deleteData(id: string) {
    await apis.delFunc(id);
  }
  // 导出变量 方法
  return {
    searchForm,
    tableLoading,
    page,
    tableData,
    formData,
    reset,
    queryPage,
    formVisible,
    showForm,
    saveData,
    deleteData,
  };
}
