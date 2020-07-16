class Hunter extends Traveler {

    constructor(name) {
        super(name);
        this.food = 2;
        this.profession = "Hunter";
    }

    hunt() {
        if (this.isHealthy === true) {  // only healthy humter can hunt
            this.food += 5;

        }
    }

    eat() {
        if (this.food > 1) {
            this.food -= 2;
            // this.isHealthy = true;
        } else {

            this.isHealthy = false;
            this.food = 0;
        }

    }

    giveFood(traveler, numOfFoodUnits) {

        this.numOfFoodUnits = numOfFoodUnits;

        // let availableFood = this.food;
        if (this.numOfFoodUnits <= this.food) {

            traveler.food = Number(traveler.food) + Number(this.numOfFoodUnits);

            this.food -= this.numOfFoodUnits;
        }

    }

}