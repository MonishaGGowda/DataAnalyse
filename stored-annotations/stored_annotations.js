const annotations = [
    {
        title: "Annotation 1",
        source: "Document 1",
        sourceLink: "document1.html",
        description: "This is a brief description of Annotation 1.",
        dateAdded: "2024-10-10",
        addedBy: "User A",
        tags: ["important", "urgent"]
    },
    {
        title: "Annotation 2",
        source: "Document 2",
        sourceLink: "document2.html",
        description: "This is a brief description of Annotation 2.",
        dateAdded: "2024-10-11",
        addedBy: "User B",
        tags: ["casual"]
    },
    {
        title: "Annotation 3",
        source: "Document 3",
        sourceLink: "document3.html",
        description: "This is a brief description of Annotation 3.",
        dateAdded: "2024-10-12",
        addedBy: "User A",
        tags: ["important"]
    },
    {
        title: "Annotation 4",
        source: "Document 3",
        sourceLink: "document3.html",
        description: "This is a brief description of Annotation 4.",
        dateAdded: "2024-10-12",
        addedBy: "User C",
        tags: ["urgent", "casual"]
    }
];

const cardListContainer = document.querySelector('.card-list');
const tagSelect = document.getElementById('tagSelect');
const filterInput = document.getElementById('filterInput');

function displayAnnotations(filteredAnnotations) {
    cardListContainer.innerHTML = ''; 
    filteredAnnotations.forEach(annotation => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <h3 class="annotation-title">${annotation.title}</h3>
            <p class="source-document">Source: <a href="${annotation.sourceLink}" target="_blank">${annotation.source}</a></p>
            <p class="annotation-text">${annotation.description}</p>
            <p class="annotation-meta">
                Date Added: ${annotation.dateAdded}<br>
                Added By: ${annotation.addedBy}
            </p>
            <p class="annotation-tags">
                Tags: 
                ${annotation.tags.map(tag => `<span class="tag">${tag}</span>`).join(', ')}
            </p>
        `;

        cardListContainer.appendChild(card);
    });
}

function populateTagSelect() {
    const tags = new Set(); 
    annotations.forEach(annotation => {
        annotation.tags.forEach(tag => tags.add(tag));
    });

    tags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        tagSelect.appendChild(option);
    });
}

function filterAnnotations() {
    const selectedTag = tagSelect.value;
    const searchTerm = filterInput.value.toLowerCase();
    console.log("Inside filter")

    const filteredAnnotations = annotations.filter(annotation => {
        const matchesTag = selectedTag ? annotation.tags.includes(selectedTag) : true;
        const matchesSearchTerm = annotation.source.toLowerCase().includes(searchTerm);
        console.log(annotation,matchesTag,matchesSearchTerm)
        return matchesTag && matchesSearchTerm;
    });

    displayAnnotations(filteredAnnotations);
}

// Add event listeners for filtering
tagSelect.addEventListener('change', filterAnnotations);
filterInput.addEventListener('input', filterAnnotations);

// Initially populate and display all annotations
populateTagSelect();
displayAnnotations(annotations);
