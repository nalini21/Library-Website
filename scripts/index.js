const bookList = document.querySelector('.books');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const about = document.getElementById("aboutData");
const verification = document.querySelectorAll('.ver');
const addBook = document.querySelectorAll('.add');
const verButton = document.querySelector('#send');
const setupUI = (user) =>{
    if(user){
        loggedInLinks.forEach(item => {
            item.style.display="block";
            item.style.color ="grey";
            item.style.fontWeight="bold";
        });
        loggedOutLinks.forEach(item => item.style.display="none");
        if(!user.emailVerified){
            verification.forEach(item => {
                item.style.display="block";
                item.style.color ="grey";
                item.style.fontWeight="bold";
            });
            addBook.forEach(item=>{
                item.style.display="none";
            });
        const html= `<li><div class="container center green-text" >
                        <h4>Verify your email to see the content</h4>
                        </div>
                     </li>`;
            bookList.innerHTML = html;
        }
        else{
            verification.forEach(item => {
                item.style.display="none";
            });
            addBook.forEach(item=>{
                item.style.display="block";
                item.style.color ="grey";
                item.style.fontWeight="bold";
            });
        }
    }
    else{
        loggedInLinks.forEach(item => item.style.display="none");
        loggedOutLinks.forEach(item => {
            item.style.display="block";
            item.style.color ="grey";
            item.style.fontWeight="bold";
        });
    }
}

//setup books
const setupBooks = (data) => {
    let html = '';
    if(data.length){  
    data.forEach(doc =>{
        const book = doc.data();
        let cls='';
        if(book.status==="false"){
            cls="available";
        }
        else{
            cls="issued"
        }
        const li = `
        <li>
            <div class="collapsible-header grey-lighten-4 ${cls}">
            <a href="#" class="btn-small btn-floating grey pulse">  
            <i class="material-icons fav">favorite</i>
            </a>
                <div class="container">
                <p>${book.name}</p>
                <div class="subheader"> ~ ${book.author}</div>
                </div>
            </div>
            <div class="collapsible-body white">
            <div class="container">            
                <p>${book.issuedBy}</p>
                <p>${book.issueDate}</p>
                <p>${book.phone}</p>
            </div>    
            </div>
        </li>`;
        html += li;
    });
    }
    else{
          html= `<li><div class="container center red-text" >
          <h4>Register or Login to see the content</h4>
          </div></li>`
    }
    bookList.innerHTML = html;
}
const setupAccount = (user)=>{
    let html ='';
    const userData = `
    <p class="green-text show" > signed in as: ${user.email}</p>
    `;
    html+= userData;
    about.innerHTML = html;

}

//setting materialize
document.addEventListener('DOMContentLoaded',function(){
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});

verButton.addEventListener('click',(evt) => {
    evt.preventDefault();
    send_verification();
    const modal = document.querySelector('#modal-ver');
    M.Modal.getInstance(modal).close(); 
}
    );

function send_verification() {
    var user = auth.currentUser;
    user.sendEmailVerification().then(function () {
        window.alert('email verification link sent to your email id');
    }).catch(function (error) {
        window.alert(error.message);
    });
}