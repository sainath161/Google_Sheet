// Get references to various HTML elements
const activeCellElement = document.getElementById("active-cell");
const textAlignHighlight = document.getElementsByClassName("text_align");
const bold_btn = document.getElementById("bold");
const italic_btn = document.getElementById("italic");
const underline_btn = document.getElementById("underline");

// Initialize activeCell variable to keep track of the currently active cell
let activeCell = null;

// Initialize activeStatOption to store the initial state of the active cell's styling options
let activeStatOption;

// Function triggered when a cell is focused
function onCellFocus(e) {
  // Update the activeCell and activeCellElement
  activeCell = e.target;
  activeCellElement.innerText = activeCell.id;

  // Get computed styles of the active cell and store them in activeStatOption
  const computedStyle = getComputedStyle(activeCell);
  activeStatOption = {
    fontFamily: computedStyle.fontFamily,
    isBold: computedStyle.fontWeight === "600",
    isItalic: computedStyle.fontStyle === "italic",
    isUnderLine: computedStyle.textDecoration.includes("underline"),
    textAlign: computedStyle.textAlign,
    backGroundColor: computedStyle.backgroundColor,
    textColor: computedStyle.color,
    fontSize: computedStyle.fontSize
  };

  // Highlight the corresponding option buttons based on the active cell's state
  highlightOptionButtonsOnFocus();
}

// Helper function to toggle the styling of buttons based on their selected state
function toggleButtonsStyle(button, isSelected) {
  if (isSelected) {
    button.classList.add("active-option");
  } else {
    button.classList.remove("active-option");
  }
}

// Function to highlight option buttons when a cell is focused
function highlightOptionButtonsOnFocus() {
  toggleButtonsStyle(bold_btn, activeStatOption.isBold);
  toggleButtonsStyle(italic_btn, activeStatOption.isItalic);
  toggleButtonsStyle(underline_btn, activeStatOption.isUnderLine);
  textAlignHighlightButton(activeStatOption.textAlign);
}

// Function to cut text from the active cell and copy to clipboard
function cutText() {
  if (activeCell) {
    const textToCut = activeCell.innerText;
    navigator.clipboard.writeText(textToCut)
      .then(() => {
        activeCell.innerText = '';
        console.log('Text cut to clipboard');
      })
      .catch(err => console.error('Unable to cut text', err));
  }
}

// Function to copy text from the active cell and copy to clipboard
function copyText() {
  if (activeCell) {
    const textToCopy = activeCell.innerText;
    navigator.clipboard.writeText(textToCopy)
      .then(() => console.log('Text copied to clipboard'))
      .catch(err => console.error('Unable to copy text', err));
  }
}

// Function to paste text from clipboard to the active cell
function pasteText() {
  if (activeCell) {
    navigator.clipboard.readText()
      .then((text) => {
        activeCell.innerText = text;
      })
      .catch(err => console.error('Unable to paste text', err));
  }
}

// Function to toggle bold styling of the active cell
function onClickBold(boldButton) {
  boldButton.classList.toggle("active-option");

  if (activeCell) {
    if (activeStatOption.isBold === false) {
      activeCell.style.fontWeight = "600";
    } else {
      activeCell.style.fontWeight = "400";
    }
    activeStatOption.isBold = !activeStatOption.isBold;
  }
}

// Function to toggle italic styling of the active cell
function onClickItalic(italicButton) {
  italicButton.classList.toggle("active-option");
  if (activeCell) {
    if (activeStatOption.isItalic) {
      activeCell.style.fontStyle = "normal";
    } else {
      activeCell.style.fontStyle = "italic";
    }
    activeStatOption.isItalic = !activeStatOption.isItalic;
  }
}

// Function to toggle underline styling of the active cell
function onUnderLine(underlineButton) {
  underlineButton.classList.toggle("active-option");
  if (activeStatOption.isUnderLine) {
    activeCell.style.textDecoration = "none";
  } else {
    activeCell.style.textDecoration = "underline";
  }
  activeStatOption.isUnderLine = !activeStatOption.isUnderLine;
}

// Function to highlight the text alignment button based on the active cell's alignment
function textAlignHighlightButton(textalignvalue) {
  for (let i = 0; i < textAlignHighlight.length; i++) {
    if (textAlignHighlight[i].getAttribute("data-value") === textalignvalue) {
      textAlignHighlight[i].classList.add("active-option");
    } else {
      textAlignHighlight[i].classList.remove("active-option");
    }
  }
}

// Function to set text alignment of the active cell
function textAlign(alignButton) {
  let selectedValue = alignButton.getAttribute("data-value");
  textAlignHighlightButton(selectedValue);

  if (activeCell) {
    activeCell.style.textAlign = selectedValue;
    activeStatOption.textAlign = selectedValue;
  }
}

// Function to change text color of the active cell
function onchangeTextColor(onchangeColor) {
  let colorValue = onchangeColor.value;
  if (activeCell) {
    activeCell.style.color = colorValue;
    activeStatOption.textColor = colorValue;
  }
}

// Function to change background color of the active cell
function onchangeBackGroundColor(onchangeColor) {
  let colorValue = onchangeColor.value;
  if (activeCell) {
    activeCell.style.backgroundColor = colorValue;
    activeStatOption.backGroundColor = colorValue;
  }
}

// Function to change font family of the active cell
function onChangeFontFamily(fontFamilySelected) {
  let selectedValue = fontFamilySelected.value;
  if (activeCell) {
    activeCell.style.fontFamily = selectedValue;
    activeStatOption.fontFamily = selectedValue;
  }
}

// Function to change font size of the active cell
function onChangeFontSize(fontSizeSelected) {
  let selectedValue = Number(fontSizeSelected.value);
  if (activeCell) {
    activeCell.style.fontSize = selectedValue + "px";
    activeStatOption.fontSize = selectedValue + "px";
  }
}
