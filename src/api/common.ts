import request, { baseURL } from '../utils/request';
/**
 * 上传图片
 * @param formData 表单数据
 * @returns 上传结果
 */
export function uploadImage(formData: FormData) {
  return fetch(`${baseURL}/file/upload/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });
}

export function sendCodeByEmail(email: string) {
  return request({
    method: 'post',
    url: '/user/mail/send/pwd',
    params: {
      email,
    },
  });
}
