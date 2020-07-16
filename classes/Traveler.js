class Traveler {

    constructor(name) {

        this.name = name;
        this.profession = "Traveler";
        this.food = 1;
        this.isHealthy = true;
        this.id = Math.random() * 10;
        this.inWagon = false;
    }

    hunt() {

        if (this.isHealthy === true) {  // only healthy traveler can hunt
            this.food += 2;
        }
        
    }

    eat() {
       
        if (this.food > 0) {
            this.food -= 1;
            
        } else {  // ill traveler can not eat

            this.isHealthy = false;
            this.food = 0;
        }

    }

}