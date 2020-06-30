const bookList = document.querySelector('.books');
//setup books
const setupBooks = (data) => {
    let html = '';
    data.forEach(doc =>{
        const book = doc.data();
        let cls='';
        var st= book.status;
        if(!st){
            cls="available";
        }
        else{
            cls="issued"
        }
        console.log(cls);     
        console.log(st);
        const li = `
        <li>
            <div class="collapsible-header grey-lighten-4 ${cls}">${book.name}</div>
            <div class="collapsible-body white">
                <p>${book.author}</p>
                <p>${book.issuedBy}</p>
                <p>${book.issueDate}</p>
                <p>${book.phone}</p>
            </div>         
        </li>`;
        html += li; 
    });
    bookList.innerHTML = html;
}


//setting materialize
document.addEventListener('DOMContentLoaded',function(){
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});