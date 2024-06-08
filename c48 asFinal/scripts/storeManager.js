function saveItem(key, item) {
    let val = JSON.stringify(item); // Convert the object to a JSON string
    localStorage.setItem(key, val); // Store the JSON string in local storage
}

function getItem(key) {
    let val = localStorage.getItem(key); // Get the JSON string from local storage
    if (val) {
        return JSON.parse(val); // Parse the JSON string back into an object/array
    }
}

function deleteItem(key) {
    localStorage.removeItem(key);
}