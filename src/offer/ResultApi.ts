import axios from 'axios';
import { HOST } from '../api/config';
import FindAllResultsResponse from '../result/FindAllResultsResponse';

export default class ResultApi {
  async getById(id: string) {
    const response = await axios.get(`${HOST}/api/result/${id}`);
  }

  async getAll(userId: string, page = 1, keyword = '') {
    const response = await axios.get<FindAllResultsResponse>(
      `${HOST}/api/results?userId=${userId}&page=${page}${keyword ? `&keyword=${keyword}` : ''}`
    );
    return response.data;
  }
}
