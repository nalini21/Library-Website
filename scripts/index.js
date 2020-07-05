const bookList = document.querySelector('.books');
const favList = document.querySelector('.favlist');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const about = document.getElementById("aboutData");
const verification = document.querySelectorAll('.ver');
const fav = document.querySelectorAll('.fav');
const addBook = document.querySelectorAll('.add');
const verButton = document.querySelector('#send');
const delButton = document.querySelector('#del');

//setting diff UI according to the login status
const setupUI = (user) => {
    if (user) {
        loggedInLinks.forEach(item => {
            item.style.display = "block";
            item.style.color = "grey";
            item.style.fontWeight = "bold";
        });
        loggedOutLinks.forEach(item => item.style.display = "none");

        let abouthtml = '';
        abouthtml = `<p class="purple-text ">hello, </p>
            <p class="blue-text" > you are signed in as: ${user.email}</p>`;
        about.innerHTML = abouthtml;

        if (!user.emailVerified) {
            verification.forEach(item => {
                item.style.display = "block";
                item.style.color = "grey";
                item.style.fontWeight = "bold";
            });
            fav.forEach(item => {
                item.style.display = "none";
            });
            addBook.forEach(item => {
                item.style.display = "none";
            });
            const html = `<li><div class="container center green-text" >
                        <i class="material-icons medium green-text">warning</i>
                        <h4  style="font-weight: bold; font-family:">Verify your email to see the content</h4>
                        </div>
                     </li>`;
            bookList.innerHTML = html;


        }
        else {
            verification.forEach(item => {
                item.style.display = "none";
            });
            fav.forEach(item => {
                item.style.display = "block";
                item.style.color = "grey";
                item.style.fontWeight = "bold";
            });
            addBook.forEach(item => {
                item.style.display = "block";
                item.style.color = "grey";
                item.style.fontWeight = "bold";
            });
        }
    }
    else {
        loggedInLinks.forEach(item => item.style.display = "none");
        loggedOutLinks.forEach(item => {
            item.style.display = "block";
            item.style.color = "grey";
            item.style.fontWeight = "bold";
        });
        let html = ``;
        about.innerHTML = html;
    }
}

//setup books
const setupBooks = (data) => {
    let html = '';
    if (data.length) {
        data.forEach(doc => {
            const book = doc.data();
            let cls = '';
            if (book.status === "false") 
                cls = "available";
            else 
                cls = "issued";
            let li = `
        <li>
            <div class="collapsible-header grey-lighten-4 ${cls}">
            <i class="material-icons saveButton" id="${doc.id}">bookmark</i>   
                <div class="container">
                <p>${book.name}</p>
                <div class="subheader"> ~ ${book.author}</div>
                </div>
             
            </div>
            <div class="collapsible-body white">
            <div class="container">            
                <p class="issueData">Issued by:   ${book.issuedBy}</p>
                <p class="issueData">Issue Date:  ${book.issueDate}</p>
                <p class="issueData">Phone number: ${book.phone}</p>
            </div>  
            <a href="#" class="btn-small btn-floating editButton modal-trigger" data-target="modal-edit" bookId="${doc.id}"> 
            <i class="material-icons">create</i> 
            </a>  
            </div>
        </li>`;
            html += li;
        });
    }
    else {
        html = `<li><div class="container center orange-text" >
          <i class="material-icons medium orange-text">error</i>
          <h4 style="font-weight: bold;">Register or Login to see the content</h4>
          </div></li>`
    }
    bookList.innerHTML = html;
}


const setupFav = (data, user) => {
    userID = user.uid;
    if (data.length) {
        favList.innerHTML = ``;
        data.forEach(doc => {
            let li = document.createElement('li');
            let name = document.createElement('span');
            let author = document.createElement('span');
            let cross = document.createElement('div');
            cross.textContent = ('x');
            const bookID = doc.id;
            li.setAttribute('id', bookID);
            db.collection('books').doc(bookID).get().then(doc => {
                name.textContent = doc.data().name;
                author.textContent = doc.data().author;
            });
            li.appendChild(name);
            li.appendChild(author);
            li.appendChild(cross);
            favList.appendChild(li);
            //deleting bookmarked book
            cross.addEventListener('click', (evt) => {
                evt.preventDefault();
                
                let id = evt.target.parentElement.getAttribute('id');
                db.collection('users').doc(userID).collection('favorites').doc(id).delete();
                console.log('bookmarked collection updated');
                
            })
        });

    }
}
//setting materialize
document.addEventListener('DOMContentLoaded', function () {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});

//sending verification link
verButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    const modal = document.querySelector('#modal-ver');
    M.Modal.getInstance(modal).close();
    send_verification();
});

function send_verification() {
    var user = auth.currentUser;
    user.sendEmailVerification().then(function () {
        window.alert('email verification link sent to your email id');
    }).catch(function (error) {
        window.alert(error.message);
    });
}
//deleting account
delButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    auth.currentUser.delete().then(function () {
        const modal = document.querySelector('#modal-ver');
        M.Modal.getInstance(modal).close();
        console.log('User deleted');
        window.alert('account deleted');
    }).catch(function (error) {
        window.alert(error.message);
    });
});

// let editButton = document.querySelectorAll('.editButton');

// document.querySelectorAll('.editButton').forEach(item => {
//     item.addEventListener('click', (event) => {
//         event.preventDefault();
//         // const id =item.bookId;
//         // console.log(id);
//         console.log('clicked');
//     }).catch(err => {
//         console.log(err.message);
//     });
// });

{/* <li>   
            <div class="container">
            <p>${name}</p>
            <div class="subheader"> ~ ${author}</div>
            </div>
        </li> */}