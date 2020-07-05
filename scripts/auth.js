//listen for auth changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log(user);
        db.collection('books').onSnapshot(snapshot => {
            setupBooks(snapshot.docs);
            document.querySelectorAll('.editButton').forEach(item => {
                item.addEventListener('click', (event) => {
                    event.preventDefault();
                    console.log('clicked edit button');
                    const id = item.getAttribute('bookId'); 
                    document.querySelector('.editSubmit').setAttribute('id',id);                 
                });
            });
            document.querySelectorAll('.editSubmit').forEach(item => {
                item.addEventListener('click', (event) => {
                    event.preventDefault();
                     let id=event.target.getAttribute('id');
                    const editForm = document.querySelector('#edit-form');
                    db.collection('books').doc(id).update({
                        status: editForm['issuestatus'].value,
                        issuedBy: editForm['issuedby'].value,
                        issueDate: editForm['issuedate'].value,
                        phone: editForm['contact'].value,
                    }); 
                    const modal = document.querySelector('#modal-edit');
                    M.Modal.getInstance(modal).close();
                    editForm.reset();
                    //console.log(id);              
                });
            });
            document.querySelectorAll('.saveButton').forEach(item => {

                db.collection('users').doc(user.uid).collection('favorites').onSnapshot(snapshot => {
                    snapshot.docs.forEach(doc => {
                        if (item.id === doc.id) {
                            item.setAttribute("class", "material-icons saveButton clicked");
                        }
                    });
                });
                item.addEventListener('click', (event) => {
                    event.preventDefault();
                    item.setAttribute("class", "material-icons saveButton clicked");
                    console.log('clicked save button');
                    let id = item.id;
                    var user = auth.currentUser;
                    db.collection('users').doc(user.uid).collection('favorites').doc(id).set({
                    }).then(() => {
                        console.log('users collection updated')
                    }).catch(error => {
                        console.log(error.message);
                    });
                });
            });

        }, err => {
            console.log(err.message);
        });

        db.collection('users').doc(user.uid).collection('favorites').onSnapshot(snapshot => {
            setupFav(snapshot.docs, user);
        }, err => {
            console.log(err.message);
        });
        setupUI(user);
    }
    else {
        setupUI();
        setupBooks();
        console.log('user is logged out');
    }
});

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
//logging out
const logout = document.querySelector('#logout');
logout.addEventListener('click', (evt) => {
    evt.preventDefault();
    auth.signOut().then(() => {
    });
})
//login
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
//adding book
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

// const addfavForm = document.querySelector("#addFav-form");
// addfavForm.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     var user = auth.currentUser;
//     db.collection('users').doc(user.uid).collection('favorites').add({
//         bookId: addfavForm['bookId'].value,
//     }).then(() => {
//         console.log('users collection updated')
//     }).catch(error => {
//         console.log(error.message);
//     });
//     const modal = document.querySelector('#modal-addFav');
//     M.Modal.getInstance(modal).close();
//     addfavForm.reset();
// })

