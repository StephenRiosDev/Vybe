import axios from "axios"

import { User, UserLogin, UserRegistration } from "../models/user";

class _UserService {

  constructor(){};

  // Internal Functions

    // Sets the user data to local storage
    static setActiveSession = ( user: User ): void => {
    
      window.localStorage.setItem('user', JSON.stringify(user))
    }

    // Clears the user data from local storage
    static clearActiveSession = (): void => {

      window.localStorage.removeItem('user');
    }

  // Public Functions

    // Returns the current session data
    getActiveSession = (): User | undefined => {

      const userData = window.localStorage.getItem('user') as string;
    
      if ( userData ) {
    
        return JSON.parse(userData) as User;
      }
      
      return;
    }

    // Returns just the user token for the logged in user
    getUserToken = (): string | undefined => {
    
      return JSON.parse(window.localStorage.getItem('user') as string || "{}")?.token;
    }

    // Logs a user in using a username and password
    login = async ( user: UserLogin ): Promise<User | Error> => {
    
      return new Promise((resolve, reject) => {

        axios
          .post('/api/users/login', user )
          .then( res => {
      
            // Get success state
            const success = res.status >= 200 && res.status <= 299
      
            // If we succeeded
            if (success) {
    
              // Get the user data
              const user = res.data as User;
    
              // Set the user session
              _UserService.setActiveSession( user )
              
              // return the user
              resolve( user )
            }
          })
          
          // Return any errors
          .catch( err =>  reject(err) )
      })
    }
    
    // Attempts to log the user out
    logout = (): void => {
    
      axios
        .post("api/users/logout", {...this.getAuthorizationHeaders(), ...this.getActiveSession()})
        .then( res => {
            
            const success = res.status >= 200 && res.status <= 299;
      
            if (success) {
              _UserService.clearActiveSession();
            };
    
            return "Successfully Logged Out";
        })
        .catch( err => {
          return err.response.data;
        })
    }
    
    // Registers a new user and logs them in
    register = async ( user: UserRegistration ): Promise<User | undefined> => {
      
      axios
        .post('/api/users/register', user)
        .then(res => {

          // Get success state
          const success = res.status >= 200 && res.status <= 299

          // If we succeeded
          if (success) {

            // Log the user in
            _UserService.setActiveSession( res.data as User )
          }
        })
        .catch(err => {

          return err.response.data;
        })
      return;
    }

    // Gets authorization headers for the currently logged in user
    getAuthorizationHeaders = (): { Authorization: string } | void => {
      
      // Get the users token from local storage
      const token = JSON.parse(window.localStorage.getItem('user') as string || "{}")?.token;
      
      // If we got a token
      if ( token ) {
        
        // Return the authorization headers
        return {
          Authorization: `Bearer ${token}`
        }

      } else {

        // Otherwise return void
        return;
      }
    }
}

export const UserService = new _UserService();


