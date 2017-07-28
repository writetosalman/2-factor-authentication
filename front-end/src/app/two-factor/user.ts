/**
 * This is the user class
 */
export class User {
    constructor(
        public id:                  number,
        public email:               string,
        public name:                string,
        public password:            string,
        public token:               string,
        public isTwoFacDone:        boolean,
    ) { }
}