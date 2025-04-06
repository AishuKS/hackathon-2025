import { api } from './axios';

export const getFoodListings = async () => {
  const res = await api.get('/api/food');
  return res.data;
};
