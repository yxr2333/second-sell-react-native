import { MockUserItem } from '../types';

const useUserList = (): MockUserItem[] => {
  return [
    {
      id: 1,
      username: 'admin',
      password: '123456',
      gender: '男',
    },
    {
      id: 2,
      username: 'yxr',
      password: '123456',
      gender: '男',
    },
    {
      id: 3,
      username: 'zyl',
      password: '123456',
      gender: '女',
    },
  ];
};

export default useUserList;
