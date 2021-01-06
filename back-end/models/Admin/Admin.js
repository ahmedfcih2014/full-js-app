export default class Admin {
    #name
    #username
    #password
    #id

    constructor(id) {
        this.#id = id
    }

    credentials(username ,password) {
        this.#username = username
        this.#password = password
    }

    set_name(name) {
        this.#name = name
    }

    get_name() {
        return this.#name
    }

    set_password(password) {
        this.#password = password
    }

    set_name(username) {
        this.#username = username
    }

    get_name() {
        return this.#username
    }

    set_name(id) {
        this.#id = id
    }

    get_name() {
        return this.#id
    }
}