const targetTable = document.querySelector("#sortable");
const headers = Array.from(targetTable.querySelectorAll("thead th"));
const rows = Array.from(targetTable.querySelectorAll("tbody tr"));
const tableBody = targetTable.querySelector("tbody");
const colLen = headers.length;

// Set initial order
rows.forEach((row, rowInd) => {
    row.setAttribute("initial-order", rowInd);
})

headers.forEach((header, headerPos) => {
    header.addEventListener("click", () => {
        let colSelected = headerPos;

        // Reset the sorting algorithm for other headers if one header is clicked
        headers.forEach((remainingHead, i) => {
            if (i !== headerPos) {
                remainingHead.setAttribute("sort-algorithm", "original");
            }
        })

        let sortAlgorithm = header.getAttribute("sort-algorithm");

        header.setAttribute("sort-algorithm", toggleSorting(sortAlgorithm));
        sortRows(colSelected, header.getAttribute("sort-algorithm"));
    })
})

// Function to sort rows
function sortRows(colSelected, sortAlgorithm) {
    rows.sort((lastRow, nextRow) => { 
        let lastRowText = removeChars(Array.from(lastRow.querySelectorAll("td"))[colSelected].textContent, "$", "(", ")", "%", ",");
        let nextRowText = removeChars(Array.from(nextRow.querySelectorAll("td"))[colSelected].textContent, "$", "(", ")", "%", ",");

        let lastRowInitialOrder = lastRow.getAttribute("initial-order");
        let nextRowInitialOrder = nextRow.getAttribute("initial-order");

        if (headers[colSelected].getAttribute("sort-type") !== "name") {
            lastRowText = +lastRowText;
            nextRowText = +nextRowText;
        }

        if (sortAlgorithm === "ascending") {
            if (lastRowText < nextRowText) {
                tableBody.insertBefore(lastRow, nextRow);
                return -1;
            }
            return 1;
        }
        
        else if (sortAlgorithm === "descending") {
            if (lastRowText > nextRowText) {
                tableBody.insertBefore(lastRow, nextRow);
                return -1;
            }
            return 1; 
        }

        if (+lastRowInitialOrder < +nextRowInitialOrder) {
            console.log("go through here")
            tableBody.insertBefore(lastRow, nextRow);
            return -1;
        }

        return 1;
    })
}

// Function to remove characters
function removeChars(str, ...args) {
    let newStr = str;
    for (let arg of args) {
        newStr = newStr.replace(arg, "");
    }
    return newStr;
}

// Function to toggle sorting algorithm
function toggleSorting(currSorting) {
    if (currSorting === "original") {
        return "ascending";
    } 
    else if (currSorting === "ascending") {
        return "descending";
    }

    return "original";
}