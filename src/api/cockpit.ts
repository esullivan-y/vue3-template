import request from "@/utils/request";

const COCKPIT_BASE_URL = "/cockpit";

export default class CockpitAPI {
  /**
   * 纪检监督数量
   * @param params
   */
  static postSuperviseSummary(params: any) {
    return request({
      url: `${COCKPIT_BASE_URL}/supervise-summary`,
      method: "post",
      params: params,
    });
  }

  /**
   * 进度跟踪-数据统计(受理数量-处置中-待派发-办结数量)
   * @param params
   */
  static postOrderStatistics(params: any) {
    return request({
      url: `${COCKPIT_BASE_URL}/order-statistics`,
      method: "post",
      params: params,
    });
  }

  /**
   * 申报数据来源-统计
   * @param params
   */
  static postOrderSourceStatistics(params: any) {
    return request({
      url: `${COCKPIT_BASE_URL}/order-source-statistics`,
      method: "post",
      params: params,
    });
  }

  /**
   * 诉求趋势-月度统计
   * @param params
   */
  static postOrderMonthStatistics(params: any) {
    return request({
      url: `${COCKPIT_BASE_URL}/order-month-statistics`,
      method: "post",
      params: params,
    });
  }

  /**
   * 工单处理、受理数-分类统计(顶级分类)
   * @param params
   */
  static postOrderCateStatistics(params: any) {
    return request({
      url: `${COCKPIT_BASE_URL}/order-cate-statistics`,
      method: "post",
      params: params,
    });
  }

  /**
   * 分层处置-分级处置数量
   * @param params
   */
  static postLayeringSummary(params: any) {
    return request({
      url: `${COCKPIT_BASE_URL}/layering-summary`,
      method: "post",
      params: params,
    });
  }

  /**
   * 热点问题统计(3级问题类型数量占比)-top10
   * @param params
   */
  static postHotIssueCateStatistics(params: any) {
    return request({
      url: `${COCKPIT_BASE_URL}/hot-issue-cate-statistics`,
      method: "post",
      params: params,
    });
  }

  /**
   * 红黑榜
   * @param params
   */
  static getEvaluateRanking(params: any) {
    return request({
      url: `${COCKPIT_BASE_URL}/evaluate-ranking`,
      method: "get",
      params: params,
    });
  }

  /**
   * 区域数据概览
   * @param params
   */
  static getAreaSummary(params: any) {
    return request({
      url: `${COCKPIT_BASE_URL}/area-summary`,
      method: "get",
      params: params,
    });
  }

  /**
   * 6个统计数据 各种率
   * @param params
   */
  static postStatisticalRate(params: any) {
    return request({
      url: `${COCKPIT_BASE_URL}/statistical-rate`,
      method: "post",
      params: params,
    });
  }

  /**
   * 热点问题列表
   * @param params
   */
  static postHotIssuePage(params: any) {
    return request({
      url: `${COCKPIT_BASE_URL}/hot-issue-page`,
      method: "post",
      data: params,
    });
  }
}
