function saveItem(key, item) {
    let val = JSON.stringify(item);
    localStorage.setItem(key, val);
}

function getItem(key) {
    let val = localStorage.getItem(key);
    if (val) {
        return JSON.parse(val);
    }
    return [];
}

function deleteItem(key) {
    localStorage.removeItem(key);
}