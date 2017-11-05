(function () {
    function CellDecision(m, n, maxNumber) {
        this.m = m;
        this.n = n;
        this.maxNumber = maxNumber;
        this.decisions = [];

        this.makeDecisions = function (options) {
            for (let i = 0; i < this.decisions.length; i++) {
                helpers.removeFromArray(options, this.decisions[i])
            }
            if (options.length === 0) {
                return false;
            }

            let index = helpers.randomInt(options.length);
            this.decisions.push(options[index]);
            return options[index];
        }
    }
    window.CellDecision = CellDecision;
})();