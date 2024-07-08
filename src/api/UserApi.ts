import axios from 'axios';
import { HOST } from './config';
import GetUserResponse from '../user/GetUserResponse';
import User from '../user/User';
import FindAllUsersResponse from '../offer/FindAllUsersResponse';

export default class UserApi {
  async getAll(userId: string, page = 1, keyword = '') {
    const response = await axios.post<FindAllUsersResponse>(
      `${HOST}/zirraiadminapi/user-search?userId=${encodeURIComponent(
        userId
      )}&page=${page}${keyword ? `&keyword=${keyword}` : ''}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }

  async get(id: string) {
    const response = await axios.get<User>(
      `${HOST}/api/admin-user/${id}?userId=${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }

  async create() {
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const response = await axios.post<GetUserResponse>(
      `${HOST}/zirraiadminapi/user`,
      {
        username,
        password,
      }
    );
    return response.data;
  }
}
