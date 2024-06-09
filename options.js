// options.js
document.addEventListener('DOMContentLoaded', () => {
    const highlightColorInput = document.getElementById('highlight-color');
    const noteColorInput = document.getElementById('note-color');
    const saveButton = document.getElementById('save-options');

    chrome.storage.sync.get(['highlightColor', 'noteColor'], (data) => {
        highlightColorInput.value = data.highlightColor || '#FFFF00';
        noteColorInput.value = data.noteColor || '#FFD700';
    });

    saveButton.addEventListener('click', () => {
        const highlightColor = highlightColorInput.value;
        const noteColor = noteColorInput.value;
        chrome.storage.sync.set({ highlightColor, noteColor }, () => {
            alert('Options saved!');
        });
    });
});
