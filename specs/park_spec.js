const assert = require('assert');
const Park = require('../models/park.js');
const Dinosaur = require('../models/dinosaur.js');

describe('Park', function() {
    let park;
    let dinosaur;
    let dinosaur1;
    let dinosaur2;
    beforeEach(function () {
        dinosaur = new Dinosaur('t-rex', 'carnivore', 50);
        dinosaur1 = new Dinosaur('brontosaurus', 'herbivore', 30);
        dinosaur2 = new Dinosaur('stegosaurus', 'herbivore', 90);
        park = new Park('Cool Park', 1999, [dinosaur, dinosaur1])
    })

    it('should have a name', function() {
        const actual = park.name;
        assert.strictEqual(actual, 'Cool Park');
    });
    it('should have a ticket price', function() {
        const actual = park.price;
        assert.strictEqual(actual, 1999);
    });
    it('should have a collection of dinosaurs', function() {
        const actual = park.dinosaurs.length
        assert.strictEqual(actual, 2);
    });

    it('should be able to add a dinosaur to its collection', function() {
        park.addDinosaur(dinosaur2);
        const actual = park.dinosaurs.length;
        assert.strictEqual(actual, 3);
    });

    it('should be able to remove a dinosaur from its collection', function() {
        park.removeDinosaur(dinosaur.name);
        const expected = [dinosaur1]
        const actual = park.dinosaurs;
        assert.deepStrictEqual(actual, expected);
    });

    it('should be able to find the dinosaur that attracts the most visitors', function() {
        park.addDinosaur(dinosaur2);
        const actual = park.getMostPopularDinosaur();
        assert.deepStrictEqual(actual, dinosaur2);

    });

    it('should be able to find all dinosaurs of a particular species', function() {
        const expect = [park.dinosaurs[0]];
        const actual = park.getDinosaursWithSpecies('t-rex');
        assert.deepStrictEqual(actual, expect);
    });
    it('should be able to calculate the total number of visitors per day', function() {
        park.addDinosaur(dinosaur2);
        const expect = 170;
        const actual = park.getAllVisitorCount();
        assert.strictEqual(actual, expect);
    });

    it('should be able to calculate the total number of visitors per year', function() {
        park.addDinosaur(dinosaur2);
        const expect = ((dinosaur1.guestsAttractedPerDay + dinosaur2.guestsAttractedPerDay
            + dinosaur.guestsAttractedPerDay) * 365)
        const actual = park.getYearAllVisitorCount()
        assert.strictEqual(actual, expect)
    });

    it('should be able to calculate total revenue for one year', function() {
        park.addDinosaur(dinosaur2);
        const expect = (park.getYearlyRevenue() * park.price) / 100
        const actual = park.getYearlyRevenue();
        assert.strictEqual(1240379.5, actual)
    });

  });
