const bcrypt = require('bcrypt');

type User = {
    id: number,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
}

class UserSessions {

    constructor(){};

    static sessions: {[key: string]: any} = {};

    getSession( token: string ) { return UserSessions.sessions[ token ] }

    setSession( user: User, token: string ) {

        // If we don't have the data we need, return an error
        if ( !user || !token ) return false;

        // Set the session
        UserSessions.sessions[ token ] = user;

        // Let the user know we set the session
        return true;
    }

    unsetSession( token: string ) { 

        // If there isn't a matching session, return an error
        if ( !this.isValidSession( token ) ) return false;

        // Delete the user session requested
        delete UserSessions.sessions[ token ];

        // Let the user know we unset the session;
        return true;
    }

    isValidSession( token: string ) { return Object.keys(UserSessions.sessions).includes( token ) }
}

module.exports = new UserSessions();