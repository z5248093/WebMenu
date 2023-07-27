import MenuStore from "./store/MenuStore";
import axios from "axios";
import FootItem from "./store/components/FootItem";

class StartUp {

    async init() {
        let categories = await axios.get("http://127.0.0.1:8000/listCags")
        let tmp = categories?.data
        for (var i = 0; i < tmp.length; i++) {
            this.setMenuCatageory(tmp[i]?.id, tmp[i]?.name, this.setCategory)
        }
    }

    setCategory(id, category, items) {
        MenuStore.setCategory(id, category, items)
    }


    setMenuCatageory(id, catagoery, setCategory) {
        let items = []
        axios.get("http://127.0.0.1:8000/listItems", {
                params: {
                    category: id
                }
                })
                .then(function (response) {
                var tmp = response.data
                for (var i = 0; i < tmp.length; i++) {
                    let foodItem = new FootItem(tmp[i].name, tmp[i].description, tmp[i].price, tmp[i].image, tmp[i].id, tmp[i].ingredients, tmp[i].offer_status, id)
                    items.push(foodItem)
                }
                setCategory(id, catagoery, items)
                console.log(response);

                })
                .catch(function (error) {
                console.log(error);
                });
    }
}

export default new StartUp();