document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.shiftKey && event.code === 'KeyH') {
        highlightSelection();
    } else if (event.ctrlKey && event.shiftKey && event.code === 'KeyN') {
        addNoteToSelection();
    }
});

function highlightSelection() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.style.backgroundColor = '#FFFF00'; // default yellow
        span.classList.add('highlighted');
        range.surroundContents(span);
        saveAnnotation(range.toString(), span.style.backgroundColor, null);
    }
}

function addNoteToSelection() {
    const note = prompt('Enter your note:');
    if (note) {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const span = document.createElement('span');
            span.style.backgroundColor = '#FFD700'; // different color for notes
            span.classList.add('highlighted-note');
            span.title = note;
            range.surroundContents(span);
            saveAnnotation(range.toString(), span.style.backgroundColor, note);
        }
    }
}

function saveAnnotation(text, color, note) {
    const pageUrl = window.location.href;
    chrome.storage.local.get({ annotations: [] }, (data) => {
        const annotations = data.annotations;
        annotations.push({ text, color, note, url: pageUrl, timestamp: new Date().toISOString() });
        chrome.storage.local.set({ annotations });
    });
}
