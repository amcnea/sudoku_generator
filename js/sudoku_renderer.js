(function () {
    function SudokuRenderer(boardData) {
        this.boardData = boardData;

        this.clearTable = function (table) {
            while (table.rows.length > 0) {
                table.deleteRow(0);
            }
            table.className = '';
        };

        this.renderInTable = function (table) {
            this.clearTable(table);

            table.className = 'size' + boardData.maxNumber;
            for (let m = 0; m < boardData.maxNumber; m++) {
                let row = table.insertRow(m);
                for (let n = 0; n < boardData.maxNumber; n++) {
                    let cell = row.insertCell(n);
                    let contents = boardData.getCell(m, n);
                    cell.innerHTML = contents ? contents : ' ';
                    if (m % boardData.blockHeight === 0) {
                        cell.className += " blockTop";
                    }
                    if (n % boardData.blockWidth === 0) {
                        cell.className += " blockLeft";
                    }
                    if (m === boardData.maxNumber - 1) {
                        cell.className += " blockBottom";
                    }
                    if (n === boardData.maxNumber - 1) {
                        cell.className += " blockRight";
                    }
                }
            }
        }
    }
    window.SudokuRenderer = SudokuRenderer;
})();