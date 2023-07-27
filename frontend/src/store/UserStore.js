
import EventConstants from "../constants/EventConstants";
import EventEmitter from "events";

class UserStore extends EventEmitter {
    constructor() {
      super()
      this.loggedIn = false
      this.order = []
      this.orderHistory = []
      this.username = ""
      this.cart = []
    }

    addChangeListener(callback) {
        this.on(EventConstants.CART_UPDATE, callback)
    }

    removeChangeListener(callback) {
        this.removeListener(EventConstants.CART_UPDATE, callback)
    }

    getUser() {
        return this;
    }

    getCart() {
        return this.cart
    }

    setLoggedIn(loggedIn) {
        this.loggedIn = loggedIn;
    }
}

export default new UserStore();