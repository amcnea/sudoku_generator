(function() {
    function SudokuBoard(maxNumber) {
        this.maxNumber = maxNumber;

        this.getBlocksFromMaxNumber = function (maxNumber) {
            switch(maxNumber) {
                case 4:
                    return {width: 2, height: 2};
                case 6:
                    return {width: 3, height: 2};
                case 9:
                    return {width: 3, height: 3};
            }
            return null;
        };

        this.initBoard = function () {
            let blockData = this.getBlocksFromMaxNumber(this.maxNumber);

            if (blockData === null) {
                throw "Invalid Maximum Number given.";
            }
            this.maxNumber = this.maxNumber;
            this.blockWidth = blockData.width;
            this.blockHeight = blockData.height;
            this.boardData = new SudokuBoardData(this.maxNumber, this.blockWidth, this.blockHeight);
        };

        this.createRandomPointsList = function () {
            let points = [];

            for (let m = 0; m < this.maxNumber; m++) {
                for (let n = 0; n < this.maxNumber; n++) {
                    points.push({m: m, n: n})
                }
            }
            helpers.shuffleArray(points);
            return points;
        };

        this.createRandomBoard = function () {
            let decisionStack = [];
            let points = this.createRandomPointsList();

            while (points.length > 0) {
                let point = points.pop();
                let currentDecision;
                let answer = null;
                let options;

                currentDecision = new CellDecision(
                    point.m,
                    point.n,
                    this.maxNumber
                );
                decisionStack.push(currentDecision);
                do {
                    options = this.boardData.getOptionsForCell(currentDecision.m, currentDecision.n);
                    answer = currentDecision.makeDecisions(options);
                    if (answer === false) {
                        points.push({m: currentDecision.m, n: currentDecision.n});
                        decisionStack.pop();
                        currentDecision = decisionStack[decisionStack.length - 1];
                        this.boardData.unsetCell(currentDecision.m, currentDecision.n);
                    }
                } while (answer === false);
                this.boardData.setCell(currentDecision.m, currentDecision.n, answer);
            }

        };

        this.clearRandomCells = function (numCells) {
            let points = this.createRandomPointsList();

            for (let i = 0; i < numCells; i++) {
                this.boardData.setCell(points[i].m, points[i].n, null);
            }
        };

        this.render = function () {
            let renderer = new SudokuRenderer(this.boardData);
            let table = document.getElementById('sudoku_table');
            renderer.renderInTable(table);
        };

        this.initBoard()
    }

    window.SudokuBoard = SudokuBoard;
})();