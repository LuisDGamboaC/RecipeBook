// token existe con tiempo limitado
export class User {
    constructor(
        public email: string, 
        public id: string, 
        private _token: string, 
        private _tokenExpirationDate: Date 
    ) {}

    get token() {  // revisa si expira el token en el tiempo limitado
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}