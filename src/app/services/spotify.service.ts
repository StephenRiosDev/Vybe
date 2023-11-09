import axios from "axios"

import { User } from "../models/user";
import { UserService } from './user.service';

class _SpotifyService {

  constructor() { };

  getSearchResults(query: string): Promise<any> {

    return new Promise((resolve, reject) => {
        
      axios
        .post('/api/spotify/search', {
          params: {
            query: query
          }
        })
        .then(res => {

          // Get success state
          const success = res.status >= 200 && res.status <= 299

          // If we succeeded
          if (success) {

            // Get the user data
            const data = res.data;

            // Resolve with the user data
            resolve(data);
          }
          else {

            // Reject with the error
            reject(res.data);
          }
        })
        .catch(err => {

          // console.log(err);

          // Reject with the error
          reject(err);
        })
    })
  }
}

export const SpotifyService = new _SpotifyService();