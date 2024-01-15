// Get references to HTML elements with ids "header" and "body"
const header = document.getElementById("header");
const body = document.getElementById("body");

// Loop through ASCII values from 65 ('A') to 90 ('Z')
for (let i = 65; i <= 90; i++) {
    // Convert ASCII value to a character
    let char = String.fromCharCode(i);

    // Create a bold element for each character and append it to the header
    const bold = document.createElement("b");
    bold.innerText = char;
    header.appendChild(bold);
}

// Function to create a row with cells for a given row number
function createRow(rowNum) {
    // Create a div element for the row and set its class to "row"
    const row = document.createElement("div");
    row.className = "row";

    // Loop through ASCII values from 64 ('@') to 90 ('Z')
    for (let i = 64; i <= 90; i++) {
        if (i === 64) {
            // For the first column (i.e., ASCII 64), create a bold element for the row number
            const b = document.createElement("b");
            b.innerText = rowNum;
            row.appendChild(b);
        } else {
            // For other columns, create a cell (div with contentEditable) and set its id
            const cell = document.createElement("div");
            cell.contentEditable = "true";
            cell.id = `${String.fromCharCode(i)}${rowNum}`;
            
            // Attach a focus event listener to the cell, calling the onCellFocus function
            cell.addEventListener("focus", onCellFocus);
            
            // Append the cell to the row
            row.appendChild(cell);
        }
    }
    
    // Append the created row to the body
    body.appendChild(row);
}

// Loop through row numbers from 1 to 100 and create a row for each number
for (let i = 1; i <= 100; i++) {
    createRow(i);
}
