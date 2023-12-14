import { http } from '@/utils/http';

const baseApi = '/fe';

interface IAppealParam {
  idCardFront?: string;
  idCardReverse?: string;
}
interface IAppealReturn {
  bankAccount: string;
  bankName: string;
  dealStatus: string;
  firstLoginTime: string;
  id: number;
  idCardFront: string;
  idCardNo: string;
  idCardReverse: string;
  invitationChannelName: string;
  lastLoginTime: string;
  mobile: string;
  rejectCause: string;
  workerId: number;
  workerName: string;
}
/* 员工申诉 */
export const workerAppeal = (data: IAppealParam): Promise<IAppealReturn> => {
  return http.request('post', `${baseApi}/fe_worker_appeal`, { data });
};
