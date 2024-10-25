// Generate a random password
function generatePassword(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

// Encrypt text with a basic Caesar Cipher (shift)
function encryptText(text, key) {
    const shift = parseInt(key) % 26;
    return text.split("").map(char => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + shift) % 26) + 65); // Uppercase letters
        } else if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + shift) % 26) + 97); // Lowercase letters
        }
        return char; // Non-alphabet characters unchanged
    }).join("");
}

// Decrypt text using Caesar Cipher (shift)
function decryptText(text, key) {
    const shift = parseInt(key) % 26;
    return text.split("").map(char => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65); // Uppercase letters
        } else if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97); // Lowercase letters
        }
        return char; // Non-alphabet characters unchanged
    }).join("");
}

// Store password in localStorage
function storePassword(accountName, accountPassword) {
    const passwords = JSON.parse(localStorage.getItem("passwords") || "[]");
    passwords.push({ accountName, accountPassword });
    localStorage.setItem("passwords", JSON.stringify(passwords));
    alert("Password stored successfully!");
}

// Search for a password by account name
function searchPassword(accountName) {
    const passwords = JSON.parse(localStorage.getItem("passwords") || "[]");
    const account = passwords.find(p => p.accountName === accountName);
    return account ? `Password: ${account.accountPassword}` : "Account not found!";
}

// Delete a password by account name
function deletePassword(accountName) {
    let passwords = JSON.parse(localStorage.getItem("passwords") || "[]");
    passwords = passwords.filter(p => p.accountName !== accountName);
    localStorage.setItem("passwords", JSON.stringify(passwords));
    alert("Password deleted successfully (if it existed)!");
}

// Add note to localStorage
function addNote(noteText) {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(notes));
    alert("Note added successfully!");
}

// Get all notes
function getAllNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    const noteList = document.getElementById('noteList');
    noteList.innerHTML = ''; // Clear the current list
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.textContent = note;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            deleteNote(index);
            getAllNotes(); // Refresh the notes list
        };
        li.appendChild(deleteButton);
        noteList.appendChild(li);
    });
}

// Delete a specific note
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    alert("Note deleted successfully!");
}

// Event listener updates
document.getElementById('generateBtn').addEventListener('click', function() {
    const length = document.getElementById('passwordLength').value;
    const generatedPassword = generatePassword(length);
    document.getElementById('generatedPassword').value = generatedPassword;
});

document.getElementById('encryptBtn').addEventListener('click', function() {
    const text = document.getElementById('encryptText').value;
    const key = document.getElementById('encryptKey').value;
    const encryptedText = encryptText(text, key);
    document.getElementById('encryptedText').value = encryptedText;
});

document.getElementById('decryptBtn').addEventListener('click', function() {
    const text = document.getElementById('decryptText').value;
    const key = document.getElementById('decryptKey').value;
    const decryptedText = decryptText(text, key);
    document.getElementById('decryptedText').value = decryptedText;
});

document.getElementById('storeBtn').addEventListener('click', function() {
    const accountName = document.getElementById('accountName').value;
    const accountPassword = document.getElementById('accountPassword').value;
    storePassword(accountName, accountPassword);
});

document.getElementById('searchBtn').addEventListener('click', function() {
    const accountName = document.getElementById('searchAccount').value;
    const searchResult = searchPassword(accountName);
    document.getElementById('searchResult').value = searchResult;
});

document.getElementById('deletePasswordBtn').addEventListener('click', function() {
    const accountName = document.getElementById('searchAccount').value;
    deletePassword(accountName);
    document.getElementById('searchResult').value = "";
});

document.getElementById('addNoteBtn').addEventListener('click', function() {
    const noteText = document.getElementById('noteText').value;
    addNote(noteText);
    document.getElementById('noteText').value = ""; // Clear the input after adding note
});

document.getElementById('getNoteBtn').addEventListener('click', function() {
    getAllNotes(); // Fetch and display all notes
});
