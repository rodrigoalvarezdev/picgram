const btnComments = document.getElementById('btn-comments');
const cardComments = document.getElementById('card-comments'); 
const btnlike = document.getElementById('btn-like');
const likesCount = document.querySelector('.likes-count');

btnComments.addEventListener('click', e=>{
    cardComments.classList.toggle('active');
});

btnlike.addEventListener('click', async e =>{
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({likes:0})
        };

        let res = await fetch(`http://localhost:3000/photo/like/${btnlike.dataset.id}`, options);
        let json = await res.json();

        likesCount.textContent = json.likes;

        if(!res.ok) throw {status: res.status, statusText: res.statusText};
    } catch (err) {
        let mje = err.statusText || "ocurrio un error";
        console.log(`${err.status} : ${mje} `)
    }
});

