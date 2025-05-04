const uploadBtn = document.querySelector("#upload-btn");
const inputUpload = document.querySelector("#imagem-upload");

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({url: leitor.result, nome: arquivo.name})
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

inputUpload.addEventListener("change", async (e) => {
    const arquivo = e.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch(erro) {
            console.error("Erro na leitura do arquivo")
        }
    }
})

// Inserção das tags

const inputTags = document.getElementById("tags");
const listaTags = document.querySelector(".lista-tags");

inputTags.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== ""){
            try {
                const tagExiste = await verificarTagsDisponiveis(tagTexto)
                if(tagExiste){
                    const novaTag = document.createElement("li");
                    novaTag.innerHTML = `<p>${tagTexto}</p> <img src="assets/close_black.svg" class="remove-tag">`
                    listaTags.appendChild(novaTag);
                    inputTags.value = "";
                } else {
                    alert("Essa tag não existe.")
                }
            } catch (error) {
                console.error("Erro ao verificar a existência da Tag!!!");
                alert("Erro ao verificar a existência da Tag")
            }
        }
    }
})

listaTags.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-tag")) {
        const tagRemover = e.target.parentElement;
        listaTags.removeChild(tagRemover)
    }
})

// Validação da Tag
const tagsDisponiveis = ["Front-end","Back-end","Programação","Data Science","Full-stack","Mobile","HTML","CSS","Javascript","PHP","Python","Java"]

async function verificarTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 200)
    })
}

// Validação dos campos do formulário
const form = document.getElementById('cadastro-form');
const nome = document.getElementById('nome');
const descricao = document.getElementById('descricao');
const erro = document.getElementsByClassName('erro');

form.addEventListener("submit", function(e) {
    e.preventDefault();
    if (nome.value.trim() === '' || descricao.value.trim() === '' || inputTags.value.trim() === '') {
        erro.innerHTML = 'Campo obrigatório';
        return;
    }
})
// -------------------------------------------------------------------

const botaoPublicar = document.querySelector(".botao-publicar");


async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsDoProjeto) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;


            if(deuCerto) {
                res("Projeto publicado com sucesso!")
            } else {
                rej("Erro na publicação do projeto")
            }
        }, 2000)
    })
}

botaoPublicar.addEventListener("click", async (e) => {
    e.preventDefault();

    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
    const tagsDoProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    try {
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsDoProjeto);
        console.log(resultado);
        alert("Deu tudo certo!")
    } catch (error) {
        console.log("Deu errado: ", error)
        alert("Erro ao publicar!!!")
    }
})

const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", (e) => {
    e.preventDefault();

    const formulario = document.querySelector("form");
    formulario.reset();
    imagemPrincipal.src = "./assets/code_editor.png";
    nomeDaImagem.textContent = "imagem_projeto.png";
    listaTags.innerHTML = "";
})