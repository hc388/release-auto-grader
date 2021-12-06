class Auth {
    constructor() {
        this.authenticated = false;
    }

    login(cb) {
        this.authenticated = true;
        cb();
    }

    logout(cb) {
        this.authenticated = false;
        cb();
    }

    isAuthenticated() {
        console.log(JSON.parse(localStorage.getItem("login")))
        console.log(JSON.parse(localStorage.getItem("login")).isLoggedIn)
        return JSON.parse(localStorage.getItem("login")).isLoggedIn;
    }

    getRole(){
        return JSON.parse(localStorage.getItem("login")).role;
    }
}

export default new Auth();
