const Park = function(name, price, dinosaurs) {
    this.name = name;
    this.price = price;
    this.dinosaurs = dinosaurs;
}

module.exports = Park;

Park.prototype.addDinosaur = function(newDinosaur) {
    this.dinosaurs.push(newDinosaur);
}

Park.prototype.removeDinosaur = function(dinosaurName) {
    let indexPosition = this.dinosaurs.indexOf(dinosaurName)
    this.dinosaurs.splice(dinosaurName, 1)
}

Park.prototype.getMostPopularDinosaur = function() {
    // Turnary opperators
    let maxGuests = this.dinosaurs.reduce((dino1, dino2) => dino1.guestsAttractedPerDay > dino2.guestsAttractedPerDay
        ? dino1 : dino2);
    return maxGuests
}

Park.prototype.getDinosaursWithSpecies = function(species) {
    let dinosaurList = [];
    for (let dinosaur of this.dinosaurs) {
        if (dinosaur.species == species) {
            dinosaurList.push(dinosaur)
        }
    }
    return dinosaurList
}

Park.prototype.getAllVisitorCount = function() {
    let newSum = 0;
    let sumOfVisitors = this.dinosaurs.reduce((acc, val) => acc + val.guestsAttractedPerDay, 0);
    return sumOfVisitors
}

Park.prototype.getYearAllVisitorCount = function() {
    return this.getAllVisitorCount() * 365;
}

Park.prototype.getYearlyRevenue = function() {
    return ((this.getYearAllVisitorCount()) * this.price) / 100
}