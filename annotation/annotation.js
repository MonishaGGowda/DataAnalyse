let documents = [
  { name: "Document 1", content: "This is the content of Document 1. It has some interesting parts.", relevancy: "high", annotations: ["Annotation 1", "Annotation 2"] },
  { name: "Document 2", content: "This is the content of Document 2. This document is very detailed.", relevancy: "low", annotations: ["Annotation 3", "Annotation 4"] },
  { name: "Document 3", content: "Here is another document with relevant content.", relevancy: "high", annotations: ["Annotation 5", "Annotation 6"] },
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
  
  annotationsContainer.innerHTML = selectedDocument.annotations.map(annotation => `
    <div class="${selectedDocument.relevancy === 'high' ? 'high-relevancy' : 'low-relevancy'}">
      ${annotation} <button onclick="showAnnotationPopup('${annotation}')">Edit</button>
    </div>
  `).join("");
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

function highlightText() {
  if (!highlighterEnabled) return;

  const documentContainer = document.getElementById("documentContainer");
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    const highlighted = `<span class="highlight">${selectedText}</span>`;
    const innerHTML = documentContainer.innerHTML.replace(selectedText, highlighted);
    documentContainer.innerHTML = innerHTML;
    window.getSelection().removeAllRanges(); 
    showAnnotationPopup(selectedText);
  }
}

document.getElementById("documentContainer").addEventListener("mouseup", highlightText);

function showAnnotationPopup(annotation) {
  const popup = document.getElementById("annotationPopup");
  const textarea = document.getElementById("annotationText");
  textarea.value = annotation; 
  popup.style.display = "block"; 
}

function saveAnnotation() {
  const textarea = document.getElementById("annotationText");
  const updatedAnnotation = textarea.value;

  const annotationIndex = selectedDocument.annotations.indexOf(textarea.value);
  if (annotationIndex !== -1) {
    selectedDocument.annotations[annotationIndex] = updatedAnnotation;
  }

  document.getElementById("annotationPopup").style.display = "none";
  selectDocument(filteredDocuments.indexOf(selectedDocument)); 
}

function closeAnnotationPopup() {
  document.getElementById("annotationPopup").style.display = "none";
}

renderDocumentList();
