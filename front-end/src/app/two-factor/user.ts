/**
 * This is the user class
 */
export class User {
    constructor(
        public id:		            number,
        public email:               string,
        public name:                string,
        public phone_country_code:  string,
        public phone_number:        string,
        public token:               string,
        public two_factor_options:  string,
        public created_at:          Date,
        public updated_at:          Date
    ) { }
}