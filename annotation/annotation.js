let documents = [
  { name: "Document 1", content: "This is the content of Document 1. It has some interesting parts.", relevancy: "high", annotations: [] },
  { name: "Document 2", content: "This is the content of Document 2. This document is very detailed.", relevancy: "low", annotations: [] },
  { name: "Document 3", content: "Here is another document with relevant content.", relevancy: "high", annotations: [] },
];

let filteredDocuments = [...documents]; // Clone of the documents array for filtering
let selectedDocument = null; // Track the currently selected document
let highlighterEnabled = false; // Highlighter toggle

// Function to render the document list with relevancy dropdowns
function renderDocumentList() {
  const documentList = document.getElementById("documentList");
  documentList.innerHTML = ""; // Clear the current list

  filteredDocuments.forEach((doc, index) => {
    const li = document.createElement("li");

    const docLink = document.createElement("a");
    docLink.href = "#";
    docLink.textContent = doc.name;
    docLink.onclick = () => selectDocument(index); // On click, select the document
    li.appendChild(docLink);

    const relevancySelect = document.createElement("select");
    relevancySelect.innerHTML = `
      <option value="high" ${doc.relevancy === "high" ? "selected" : ""}>High</option>
      <option value="low" ${doc.relevancy === "low" ? "selected" : ""}>Low</option>
    `;
    relevancySelect.onchange = () => changeRelevancy(index, relevancySelect.value);
    li.appendChild(relevancySelect);

    documentList.appendChild(li);
  });
}

function selectDocument(index) {
  selectedDocument = filteredDocuments[index];
  const documentContainer = document.getElementById("documentContainer");
  const annotationsContainer = document.getElementById("annotationsContainer");

  documentContainer.innerHTML = selectedDocument.content;

  // Clear the annotations container and then append all current annotations for the selected document
  annotationsContainer.innerHTML = "";
  selectedDocument.annotations.forEach(annotation => {
    const annotationDiv = document.createElement("div");
    annotationDiv.classList.add(selectedDocument.relevancy === 'high' ? 'high-relevancy' : 'low-relevancy');
    annotationDiv.innerHTML = `
      ${annotation} <button onclick="showAnnotationPopup('${annotation}')">Edit</button>
    `;
    annotationsContainer.appendChild(annotationDiv);
  });
}


function changeRelevancy(index, newRelevancy) {
  filteredDocuments[index].relevancy = newRelevancy;
  if (filteredDocuments[index] === selectedDocument) {
    selectDocument(index);
  }
}

function filterDocuments() {
  const searchText = document.getElementById("searchBox").value.toLowerCase();
  filteredDocuments = documents.filter(doc => doc.content.toLowerCase().includes(searchText));
  renderDocumentList();
}

function clearFilter() {
  document.getElementById("searchBox").value = ""; 
  filteredDocuments = [...documents];
  renderDocumentList();
}

function toggleHighlighter() {
  highlighterEnabled = !highlighterEnabled;
  const highlighterButton = document.getElementById("highlightButton");
  highlighterButton.textContent = highlighterEnabled ? "Disable Highlighter" : "Enable Highlighter";
}

let selectedText = ''; // Track the selected text for annotation

// Function to handle text highlighting and showing the annotation popup
function highlightText() {
  if (!highlighterEnabled) return;

  const documentContainer = document.getElementById("documentContainer");
  const selection = window.getSelection();
  selectedText = selection.toString();
  
  if (selectedText) {
    const highlighted = `<span class="highlight">${selectedText}</span>`;
    documentContainer.innerHTML = documentContainer.innerHTML.replace(selectedText, highlighted);
    selection.removeAllRanges(); // Clear the selection
    showAnnotationPopup(selectedText); // Show annotation popup with the selected text
  }
}

// Show the annotation popup with the selected text
function showAnnotationPopup(annotation = '') {
  const popup = document.getElementById("annotationPopup");
  const textarea = document.getElementById("annotationText");
  textarea.value = annotation; // Populate the popup with the selected text
  popup.style.display = "block"; 
}

// Save annotation and update the right pane with the highlighted text as the annotation
function saveAnnotation() {
  const textarea = document.getElementById("annotationText");
  const newAnnotation = textarea.value.trim(); // Trim to avoid empty/whitespace annotations

  // Check if the annotation is empty
  if (newAnnotation === "") {
    alert("Please enter an annotation before saving.");
    return; // Do not save the annotation
  }

  // Append the new annotation to the current document's annotation array
  if (!selectedDocument.annotations.includes(newAnnotation) && newAnnotation.trim() !== "") {
    selectedDocument.annotations.push(newAnnotation);
  }

  document.getElementById("annotationPopup").style.display = "none";
  
  // Append the new annotation to the annotations container without removing the previous ones
  const annotationsContainer = document.getElementById("annotationsContainer");
  const annotationDiv = document.createElement("div");
  annotationDiv.classList.add(selectedDocument.relevancy === 'high' ? 'high-relevancy' : 'low-relevancy');
  annotationDiv.innerHTML = `
    ${newAnnotation} 
    <button onclick="showAnnotationPopup('${newAnnotation}')">Edit</button>
    <button onclick="removeAnnotation('${newAnnotation}')">Remove</button>
  `;
  annotationsContainer.appendChild(annotationDiv);
  
  // Clear the popup text area
  textarea.value = "";
}

function removeAnnotation(annotationText) {
  // Remove annotation from the array
  selectedDocument.annotations = selectedDocument.annotations.filter(annotation => annotation !== annotationText);

  // Remove from the right pane
  const annotationsContainer = document.getElementById("annotationsContainer");
  const annotationDivs = annotationsContainer.querySelectorAll("div");

  annotationDivs.forEach(div => {
      if (div.innerText.includes(annotationText)) {
          annotationsContainer.removeChild(div);
      }
  });
}

// Update the right pane with annotations from the selected document
function updateAnnotationsPane() {
  const annotationsContainer = document.getElementById("annotationsContainer");
  annotationsContainer.innerHTML = selectedDocument.annotations.map(annotation => `
    <div class="${selectedDocument.relevancy === 'high' ? 'high-relevancy' : 'low-relevancy'}">
      ${annotation}
    </div>
  `).join("");
}

document.getElementById("documentContainer").addEventListener("mouseup", highlightText);


function closeAnnotationPopup() {
  document.getElementById("annotationPopup").style.display = "none";
}

renderDocumentList();
// Function to handle file uploads
function uploadDocuments() {
  const fileInput = document.getElementById("fileUpload");
  const files = fileInput.files; // Get the list of uploaded files

  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Ensure the uploaded file is a .txt file
      if (file.type === "text/plain") {
        const reader = new FileReader();

        reader.onload = function (event) {
          const fileContent = event.target.result;

          // Create a new document object and push it into the documents array
          const newDocument = {
            title: file.name, // Use the file name as the document title
            content: fileContent,
            annotations: [],
            relevancy: "low" // Default relevancy can be set to low
          };

          // Add the new document to the list of documents
          documents.push(newDocument);

          // Update the left pane to display the new document
          updateDocumentsList();
        };

        reader.readAsText(file); // Read the file content as text
      } else {
        alert("Only .txt files are allowed.");
      }
    }
  }
}

// Function to update the left pane with the new list of documents
function updateDocumentsList() {
  const documentsList = document.getElementById("documentsList");

  // Clear the current list
  documentsList.innerHTML = "";

  // Loop through the documents array and display each document in the list
  documents.forEach((doc, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = doc.title;
    listItem.onclick = function () {
      selectDocument(index); // This will handle selecting a document
    };
    documentsList.appendChild(listItem);
  });
}
