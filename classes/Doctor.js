class Doctor extends Traveler {

constructor (name) {
super(name);
this.profession = "Doctor";
}

heal(traveler) {
    
    traveler.isHealthy = true;
}

}
