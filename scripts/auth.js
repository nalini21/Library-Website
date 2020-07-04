//listen for auth changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log(user);
        db.collection('books').onSnapshot(snapshot => {
            setupBooks(snapshot.docs);
            document.querySelectorAll('.editButton').forEach(item => {
                item.addEventListener('click', (event) => {
                    event.preventDefault();
                    const id =item.getAttribute('bookId');
                    console.log(id);
                    console.log('clicked');
                });
            });

            
        }, err => {
            console.log(err.message);
        });
        setupUI(user);
    }
    else {
        setupUI();
        setupBooks([]);
        console.log('user is logged out');
    }
});

// const signupForm = document.querySelector('#signup-form');
// signupForm.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     //user info
//     const email = signupForm['signup-email'].value;
//     const password = signupForm['signup-password'].value; 
//     //sign up user
//     auth.createUserWithEmailAndPassword(email, password).then(cred => {
//         db.collection('users').doc(cred.user.uid).set({
//             name: signupForm['signup-name'].value,
//         });
//     }).then(() => {
//         console.log('username added');                             
//     }).catch(error => {
//         console.log(error.message);
//     });;
//     //close the modal
//     const modal = document.querySelector('#modal-signup');
//     M.Modal.getInstance(modal).close();
//     signupForm.reset();
// });


const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    //user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    //sign up user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    }).catch(error => {
        console.log(error.message);
    });
});

// db.collection('users').add({
//     bio: signupForm['signup-name'].value,
//     id: cred.user.uid        }).then(() => {

// });

const logout = document.querySelector('#logout');
logout.addEventListener('click', (evt) => {
    evt.preventDefault();
    auth.signOut().then(() => {
    });
})

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    //user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
});

const addForm = document.querySelector("#add-form");
addForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    var user = firebase.auth().currentUser;
    db.collection('books').add({
        name: addForm['title'].value,
        author: addForm['author'].value,
        status: "false",
        issueDate: "",
        issuedBy: "",
        phone: ""
    }).then(() => {
    }).catch(error => {
        console.log('you are not admin');
    });
    const modal = document.querySelector('#modal-add');
    M.Modal.getInstance(modal).close();
    addForm.reset();
});

const addfavForm = document.querySelector("#addFav-form");
addfavForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    var user = auth.currentUser;
    db.collection('users').doc(user.uid).collection('favorites').add({
        bookId: addfavForm['bookId'].value,
    }).then(() => {
        console.log('users collection updated')
    }).catch(error => {
        console.log(error.message);
    });
    const modal = document.querySelector('#modal-addFav');
    M.Modal.getInstance(modal).close();
    addfavForm.reset();
})

