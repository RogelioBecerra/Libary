
// selectors
const form = document.querySelector("#form");
const name_input = document.querySelector("#name");
const author_input = document.querySelector("#author");
const status_input = document.querySelector("#dropdown");
const submitbtn = document.querySelector("#btn");
const shelf = document.querySelector("#shelf");

// Array that stores Book objects
let libary = [];

// Defult Book objects added to libary array
const b1 = new Book("Meditations", "Marcus Aurelius", "Read");
const b2 = new Book("The Song of Achilles", "Madeline Miller", "Read");
libary.push(b1);
libary.push(b2);
render();

form.addEventListener("submit", (e) => {
     e.preventDefault();
     // valadate();        HAS NOT BEEN MADE******
     addToLibary();
     render();
     clearInput();
});

//functions -----------------------------------

/**
 * Book object
 * @param {String} name
 * @param {String} author
 * @param {String} status
 */
function Book(name, author, status) {
     this.name = name;
     this.author = author;
     this.status = status;
}

/**
 * adds books to array and calls render()
 */
function addToLibary() {
     const name = name_input.value;
     const author = author_input.value;
     const status = status_input.value;
     const newBook = new Book(name, author, status);
     libary.push(newBook);
     render();
}

/**
 * makes the book objects appear on screen
 */
function render() {
     shelf.innerHTML = "";
     libary.forEach((book,index) => {
          createBookHTML(book, index);
     });
     removeBook();
     statusChange();
}

/**
 * turns Book object into html
 * @param {Book} book
 */
function createBookHTML(book, index) {
     const html = HTMLConverter(`
     <tr>
          <td>${book.name}</td>
          <td> ${book.author}</td>
          <td><button class="status-btn">${book.status}</button></td>
          <td><button id="remove-btn" class="remove-btns" data-remove="${index}">Remove</button></td>
     </tr>
      `);
     shelf.appendChild(html);
}

/**
 * Takes a string version of html and convertes it to real HTML
 * @param {String} html
 * @returns HTML element
 */
function HTMLConverter(html) {
     const templete = document.createElement("template");
     templete.innerHTML = html.trim();
     return templete.content.firstElementChild;
}

/**
 * clears form input
 */
function clearInput() {
     form.reset();
}

/**
 * status buttons status can be changed
 */
function statusChange() {
     const statusbuttons = document.querySelectorAll(".status-btn");
     statusbuttons.forEach((btn) => {
          btn.addEventListener("click", () => {
               btn.textContent == "Read"
                    ? (btn.textContent = "Not Read")
                    : (btn.textContent = "Read");
          });
     });
}

/**
 * Allows remove buttons remove books
 */
function removeBook(){
     const removeButtons = document.querySelectorAll('.remove-btns');
     removeButtons.forEach((btn)=>{
          btn.addEventListener('click', ()=>{
               // get data-attribute of element
               const index = btn.getAttribute('data-remove')
               // remove the object at the index found from the libary
               libary.splice(index,1);
               render();
          })
     })
}
