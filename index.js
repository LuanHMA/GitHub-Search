const profile = document.querySelector("#profile-img");
const nameUser = document.querySelector(".name-user");
const bio = document.querySelector(".bio-user");
const dateCreate = document.querySelector(".date-create");
const description = document.querySelector(".description");
const following = document.querySelector("#following");
const followers = document.querySelector("#followers");
const repositorios = document.querySelector("#repos");
const githubUser = document.querySelector("#github-user");
const twitterUser = document.querySelector("#twiter-user");
const locationUser = document.querySelector("#location");
const site = document.querySelector("#site");

async function dataFind(){

    try{
        const user = document.querySelector("input[type='text']").value;
       
        //Validação
        if(user == '' || undefined){
            alert("Digite um nome")
        }
        
        //Requisição
        else{
            const req = await fetch(`https://api.github.com/users/${user}`)
            const response = await req.json();

            //Requisição Fail
            if(response.message == 'Not Found'){
                alert("Usuário não encontrado");
                return false;
            }
            //Requisição Success
            else{
                loadUser(response)
            }
        }
        
    }
    catch(e){
        console.log('ERRO: '+ e)
    }
}
function loadUser(response){
    let dateBase = response.created_at;
    let date = new Date(dateBase).toLocaleDateString('pt-BR');
    console.log(response);

    profile.src = response.avatar_url; 
    nameUser.textContent = response.name || response.login ||'Usuário sem nome';

    bio.textContent = `@${response.login}`;
    dateCreate.textContent = `Criado em ${date}` || 'Não informado';
    description.textContent = response.bio || 'Esse usuário não tem uma descrição :/';


    following.textContent = response.following || 0;
    followers.textContent = response.followers || 0;
    repositorios.textContent = response.public_repos || 0;

    if(response.html_url === null)  githubUser.classList.add("notAvailable");
    if(response.twitter_username === null)  twitterUser.classList.add("notAvailable");
    if(response.location === null) locationUser.classList.add("notAvailable");
    if(response.blog === "") site.classList.add("notAvailable");

    githubUser.href = response.html_url;
    githubUser.textContent = response.html_url || 'Não informado';

    twitterUser.innerText = response.twitter_username === null ? 'Não informado' : `@${response.twitter_username}`;
    locationUser.innerText = response.location || 'Não informado';

    site.innerText = response.blog || 'Não informado';
    site.href = response.blog;


}
const inputSearch = document.querySelector("#search-input");
inputSearch.focus();

document.addEventListener("keypress", e =>{
    if(e.key == 'Enter'){
        dataFind() 
        inputSearch.value = '';
    }
})

document.querySelector("#search").addEventListener("click", e=> {
    dataFind() 
    inputSearch.focus();
    inputSearch.value = '';
})
