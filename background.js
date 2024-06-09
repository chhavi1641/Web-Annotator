chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "highlight",
        title: "Highlight Text",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "add_note",
        title: "Add Note",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "highlight") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: highlightSelection,
        });
    } else if (info.menuItemId === "add_note") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: addNoteToSelection,
        });
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
        }
    }
}
