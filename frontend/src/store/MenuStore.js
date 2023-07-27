import FootItem from "./components/FootItem"
import axios from "axios";
import EventEmitter from "events"
import EventConstants from "../constants/EventConstants.js"

class MenuStore extends EventEmitter {
    constructor() {
        super();
        this.items = []
        this.mains = []
        this.desserts = []
        this.sides = []
        this.drinks = []
        this.entrees = []
    }

    getMenu() {
        let itemList = []
        for (var key in this.items) {
            itemList.push(this.items[key])
        }
        return  itemList
    }

    getMenuDict() {
        return this.items
    }

    setCategory(id, category, items) {
        this.items[id] = {id:id, category: category, items: items}
        this.emit(EventConstants.MENU_UPDATE)
    }

    setEntrees(entrees) {
        this.entrees = entrees
        this.emit(EventConstants.MENU_UPDATE)
    }

    setMains(mains) {
        this.mains = mains
        this.emit(EventConstants.MENU_UPDATE)
    }

    setDesserts(desserts) {
        this.desserts = desserts
        this.emit(EventConstants.MENU_UPDATE)
    }

    setSides(sides) {
        this.sides = sides
        this.emit(EventConstants.MENU_UPDATE)
    }

    setDrinks(drinks) {
        this.drinks = drinks
        this.emit(EventConstants.MENU_UPDATE)
    }

    

    getEntrees() {
        return this.entrees
    }

    getMains() {
        return this.mains
    }

    getDesserts() {
        return this.desserts
    }

    getSides() {
        return this.sides
    }

    getDrinks() {
        return this.drinks
    }

    addChangeListener(callback) {
        this.on(EventConstants.MENU_UPDATE, callback)
    }

    removeChangeListener(callback) {
        this.removeListener(EventConstants.MENU_UPDATE, callback)
    }
}

export default new MenuStore();