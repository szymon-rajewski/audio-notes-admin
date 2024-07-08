import Agent from './Agent';

export default interface FindAllAgentsResponse {
  results: Agent[];
  pages: number;
}
