import { defineStore } from 'pinia';

interface ReportPayload {
  content_id: number;
  target_type: 'BOARD' | 'COMMENT';
  reason_type: string;
}

export const useReportStore = defineStore('report', {
  actions: {
    async requestReport(payload: ReportPayload) {
      const userToken = localStorage.getItem('userToken');
      const accountId = localStorage.getItem('account_id');

      if (!userToken) {
        throw new Error('로그인이 필요합니다.');
      }

      // 안전하게 import 후 axios 인스턴스 생성
      const { createAxiosInstance } = await import('@/common/utils/axiosInstance');
      const axios = createAxiosInstance(userToken, accountId);

      const response = await axios.post('/report/request', payload);

      if (!response.data.success) {
        throw new Error(response.data.error || '신고에 실패했습니다.');
      }

      return response.data;
    },
  },
});
