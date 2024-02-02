import { http } from '@/utils/http';

const baseApi = '/fe/fe_worker_protocol';

/* 获取个人签署链接-任务 */
export const getInvitationProtocolSignUrlForTask = params => {
  return http.request(
    'get',
    `${baseApi}/invitation_protocol_sign_url_for_task`,
    { params }
  );
};

/* 获取个人签署链接-邀请码 */
export const getInvitationProtocolSignUrlForCode = params => {
  return http.request(
    'get',
    `${baseApi}/invitation_protocol_sign_url_for_code`,
    { params }
  );
};
