export default class Rating {
    constructor({ 
        ratingId = null, 
        restaurantId = null, 
        customerId = null, 
        score = 0, 
        description = '', 
        createdAt = null, 
        updatedAt = null
    }) {
        this.ratingId = ratingId;
        this.restaurantId = restaurantId;
        this.customerId = customerId;
        this.score = score;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}