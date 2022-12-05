import request from '../utils/request';

export function getRecentSpike(size: number) {
  return request({
    method: 'get',
    url: '/spike/recent',
    params: {
      size,
    },
  });
}
