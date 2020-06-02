export default class User {
    constructor(
        public readonly registration: String,
        public readonly email: String,
        public readonly password: String,
        public readonly name: String,
        public readonly active: Boolean,
    ) { }
}