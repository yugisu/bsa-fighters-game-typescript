import { callApi } from '../helpers/apiHelper';
import { FighterType, FighterDetails } from 'javascript/types/fighter.type';

class FighterService {
  async getFighters(): Promise<FighterType[]> {
    try {
      const endpoint = 'fighters.json';
      const apiResult = await callApi(endpoint, 'GET');

      return JSON.parse(atob(apiResult.content));
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(id: string): Promise<FighterDetails> {
    try {
      const endpoint = `details/fighter/${id}.json`;
      const apiResult = await callApi(endpoint, 'GET');

      return JSON.parse(atob(apiResult.content));
    } catch (error) {
      throw error;
    }
  }
}

export const fighterService = new FighterService();
