import { baseURL } from '../utils/request';
export function uploadImage(formData: FormData) {
  return fetch(`${baseURL}/file/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });
}
