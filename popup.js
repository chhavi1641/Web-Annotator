// popup.js
document.addEventListener('DOMContentLoaded', () => {
    const annotationsList = document.getElementById('annotations-list');
    const clearButton = document.getElementById('clear-annotations');

    chrome.storage.local.get({ annotations: [] }, (data) => {
        data.annotations.forEach((annotation, index) => {
            const div = document.createElement('div');
            div.classList.add('annotation');
            div.style.backgroundColor = annotation.color;
            div.textContent = `${annotation.text} - ${annotation.note || ''}`;
            annotationsList.appendChild(div);
        });
    });

    clearButton.addEventListener('click', () => {
        chrome.storage.local.set({ annotations: [] }, () => {
            annotationsList.innerHTML = '';
        });
    });
});
document.getElementById('export-annotations').addEventListener('click', () => {
    chrome.storage.local.get({ annotations: [] }, (data) => {
        const json = JSON.stringify(data.annotations, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'annotations.json';
        a.click();
        URL.revokeObjectURL(url);
    });
});
