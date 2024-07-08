import axios from 'axios';
import { HOST } from './config';
import GetUserResponse from '../user/GetUserResponse';
import CreateOfferRequest from '../offer/CreateOfferRequest';
import CreateOfferResponse from '../offer/CreateOfferResponse';
import FindAllUsersResponse from '../offer/FindAllUsersResponse';

export default class OfferApi {
  async get(id: string) {
    const response = await axios.get<GetUserResponse>(
      `${HOST}/api/user/${id}?userId=${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data.user;
  }

  async getAll(userId: string, page = 1, keyword = '') {
    const response = await axios.post<FindAllUsersResponse>(
      `${HOST}/api/offer-search?userId=${encodeURIComponent(
        userId
      )}&page=${page}${keyword ? `&keyword=${keyword}` : ''}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }

  async create(request: CreateOfferRequest) {
    const response = await axios.post<CreateOfferResponse>(
      `${HOST}/api/offer?userId=${request.userId}`,
      request,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }

  async updatePhotos(
    userId: string,
    offerId: string,
    form: FormData
  ): Promise<void> {
    const response = await axios.post(
      `${HOST}/api/offer-photos/${offerId}?userId=${userId}`,
      form,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }
}
