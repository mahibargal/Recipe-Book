
export class UserData {

    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) {}

    get getToken(){
        return this._token;
    }
}