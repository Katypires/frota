import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://10.8.2.140:8000/api',
});

api.interceptors.request.use(async (config) => {
  const userInfo = await AsyncStorage.getItem("@sesau");
  const savedUser = JSON.parse(userInfo || "{}");

  if (savedUser.token) {
    config.headers.Authorization = `Bearer ${savedUser.token}`;
  }

  return config;
});

export { api };
