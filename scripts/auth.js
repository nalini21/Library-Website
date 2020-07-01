
//listen for auth changes
auth.onAuthStateChanged(user => {
    if (user) {
        //if (user.emailVerified) {
            console.log(user);
            db.collection('books').get().then(snapshot => {
                setupBooks(snapshot.docs);
            });
            setupUI(user);
            setupAccount(user);
        //}
        // else{
        //     setupUI();
        //     setupBooks([]);
        //     window.alert('verify your email to see the content');
        //     console.log(user);    
        // }
    }
    else {
        setupUI();
        setupBooks([]);
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
        send_verification();
        //close the modal
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })
});

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
            const modal = document.querySelector('#modal-add');
            M.Modal.getInstance(modal).close();
            addForm.reset();
        }).catch(error=>{
            console.log('you are not admin');
        });
        const modal = document.querySelector('#modal-add');
        M.Modal.getInstance(modal).close();
        addForm.reset();
})

function send_verification() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function () {
        window.alert('email verification sent');
    }).catch(function (error) {
        window.alert('error in sending email verificaion');
    });
}