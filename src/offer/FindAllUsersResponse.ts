import User from '../user/User';

export default interface FindAllUsersResponse {
  results: User[];
  pages: number;
}
