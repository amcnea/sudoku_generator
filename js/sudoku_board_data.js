(function () {
    function SudokuBoardData(maxNumber, blockWidth, blockHeight) {
        this.maxNumber = maxNumber;
        this.blockWidth = blockWidth;
        this.blockHeight = blockHeight;
        this.blocksPerRow = this.maxNumber / this.blockWidth;
        this.board = null;
        this.rowOptions = null;
        this.colOptions = null;
        this.blockOptions = null;

        this.initBoardArray = function () {
            this.board = [];
            this.rowOptions = [];
            this.colOptions = [];
            this.blockOptions = [];
            for (let m = 0; m < this.maxNumber; m++) {
                this.board[m] = [];
                this.rowOptions[m] = helpers.makeOptionsList(this.maxNumber);
                this.colOptions[m] = helpers.makeOptionsList(this.maxNumber);
                this.blockOptions[m] = helpers.makeOptionsList(this.maxNumber);
                for (let n = 0; n < this.maxNumber; n++) {
                    this.board[m][n] = null;
                }
            }
        };

        /**
         * @param row
         * @return Array
         */
        this.getOptionsForRow = function (row) {
            return this.rowOptions[row];
/*
            let options = helpers.makeOptionsList(this.maxNumber);
            let index;

            for (let n = 0; n < this.maxNumber; n++) {
                if (this.board[row][n] !== null) {
                    index = options.indexOf(this.board[row][n]);
                    if (index > -1) {
                        options.splice(index, 1);
                    }
                }
            }
            return options;*/
        };

        /**
         * @param col
         * @return Array
         */
        this.getOptionsForColumn = function (col) {
            return this.colOptions[col];
/**
            let options = helpers.makeOptionsList(this.maxNumber);
            let index;

            for (let m = 0; m < this.maxNumber; m++) {
                if (this.board[m][col] !== null) {
                    index = options.indexOf(this.board[m][col]);
                    if (index > -1) {
                        options.splice(index, 1);
                    }
                }
            }
            return options;
 */
        };

        /**
         * @param row
         * @param col
         * @return Array
         */
        this.getOptionsForBlock = function (row, col) {
            return this.blockOptions[this.getBlockNumber(row, col)];
/*            let startBlockRow = row - (row % this.blockHeight);
            let startBlockCol = col - (col % this.blockWidth);
            let endBlockRow = startBlockRow + this.blockHeight - 1;
            let endBlockCol = startBlockCol + this.blockWidth - 1;
            let options = helpers.makeOptionsList(this.maxNumber);
            let index;

            for (let m = startBlockRow; m <= endBlockRow; m++) {
                for (let n = startBlockCol; n <= endBlockCol; n++) {
                    if (this.board[m][n] !== null) {
                        index = options.indexOf(this.board[m][n]);
                        if (index > -1) {
                            options.splice(index, 1);
                        }
                    }
                }
            }
            return options;
*/
        };

        this.getOptionsForCell = function (row, col) {
            let rowOptions = this.getOptionsForRow(row);
            let colOptions = this.getOptionsForColumn(col);
            let blockOptions = this.getOptionsForBlock(row, col);
            let cellOptions = [];

            let option;
            for (let i = 0; i < rowOptions.length; i++) {
                option = rowOptions[i];
                if (colOptions.indexOf(option) > -1 && blockOptions.indexOf(option) > -1) {
                    cellOptions.push(option);
                }
            }

            return cellOptions;
        };

        this.getBlockNumber = function (m, n) {
            return parseInt(m / this.blockWidth, 10) + this.blocksPerRow * parseInt(n / this.blockHeight);
        };

        this.setCell = function (m, n, value) {
            helpers.removeFromArray(this.rowOptions[m], value);
            helpers.removeFromArray(this.colOptions[n], value);
            helpers.removeFromArray(this.blockOptions[this.getBlockNumber(m, n)], value);
            this.board[m][n] = value;
        };

        this.unsetCell = function (m, n) {
            if (this.board[m][n] !== null) {
                this.rowOptions[m].push(this.board[m][n]);
                this.colOptions[n].push(this.board[m][n]);
                this.blockOptions[this.getBlockNumber(m, n)].push(this.board[m][n]);
                this.board[m][n] = null;
            }
        };

        this.getCell = function (m, n) {
            return this.board[m][n];
        };

        this.initBoardArray();
    }
    window.SudokuBoardData = SudokuBoardData;
})();