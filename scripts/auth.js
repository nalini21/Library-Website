db.collection('books').get().then(snapshot =>{
    setupBooks(snapshot.docs);
});

//listen for auth changes
auth.onAuthStateChanged(user=>{
    if(user){
        console.log('user is logged in');
        console.log(user);    
    }
    else{
        console.log('user is logged out');
    }
    
});

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',(evt)=>{

    evt.preventDefault();
    //user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    //sign up user
    auth.createUserWithEmailAndPassword(email, password).then(cred =>{
        //close the modal
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })
});

const logout = document.querySelector('#logout');
logout.addEventListener('click',(evt)=>{
    evt.preventDefault();
    auth.signOut().then(()=>   {
    });
})

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    //user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email,password).then(cred=>{
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
});