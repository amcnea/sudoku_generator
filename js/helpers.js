(function () {
    let helpers = {};

    helpers.makeOptionsList = function (maxNumber) {
        let options = [];
        for (let i = 1; i <= maxNumber; i++) {
            options.push(i);
        }
        return options;
    };

    helpers.randomInt = function(exclusiveMax) {
        return parseInt(Math.random() * exclusiveMax, 10);
    };

    helpers.removeFromArray = function(arr, item) {
        let index = arr.indexOf(item);
        if (index > -1) {
            arr.splice(index, 1);
        }
    };

    helpers.shuffleArray = function(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    window.helpers = helpers;
})();