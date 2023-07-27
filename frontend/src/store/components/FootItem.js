class FootItem {
  constructor(title, description, cost, image, id, ingredients, offer_status, category) {
    this.title = title;
    this.description = description;
    this.cost = cost;
    this.image = image;
    this.id = id
    this.ingredients = ingredients
    this.offer_status = offer_status;
    this.category = category;
  }

  getImage() {
    return this.image;
  }

  getDescription() {
    return this.description
  }

  getId() {
    return this.id;
  }
}

export default FootItem;