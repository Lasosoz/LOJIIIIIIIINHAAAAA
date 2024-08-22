
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
 


 const firebaseConfig = {
    apiKey: "AIzaSyC93CW-Ezwy49f6zULCmOf9JFwJuQWd5ds",
    authDomain: "lebriise1.firebaseapp.com",
    projectId: "lebriise1",
    storageBucket: "lebriise1.appspot.com",
    messagingSenderId: "266935706953",
    appId: "1:266935706953:web:d8b44538359f5d2d9c6698"
  };

 
 const app = initializeApp(firebaseConfig);
 <script type="module">
</script>


 import { getDatabase, ref, child, get, set, update, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";


 const db = getDatabase();


 let codigo = document.getElementById('codigo');
 let produto =document.getElementById('produto');
 let categoria =document.getElementById('categoria');
 let quantidade =document.getElementById('quantidade');
 let valor =document.getElementById('valor');


 let idProduto = document.getElementById('idProduto');


 let dadoProduto = document.getElementById('dadoProduto');
 let dadoCategoria = document.getElementById('dadoCategoria');
 let dadoQuantidade = document.getElementById('dadoQuantidade');
 let dadoValor = document.getElementById('dadoValor');


 let cadastrarProduto = document.getElementById('cadastrarProduto');
 let buscarProduto = document.getElementById('buscarProduto');
 let atualizarProduto = document.getElementById('atualizarProduto');
 let deletarProduto = document.getElementById('deletarProduto');


 function AddProduto(){
    set(ref(db,'Produto/'+codigo.value),{
        codigo: codigo.value,
        produto: produto.value,
        categoria: categoria.value,
        quantidade: quantidade.value,
        valor: valor.value
    }).then(()=>{
        codigo.value = ''
        produto.value=''
        categoria.value=''
        quantidade.value=''
        valor.value=''
        alert("Produto Cadastrado!");
    }).catch((error)=>{
        console.log(error);
        alert('Produto Não Cadastrado!');
    })

 }

 
 function PesquisarProduto(){
    const dbRef = ref(db);
    get(child(dbRef,'Produto/'+idProduto.value)).then((snapshot)=>{
        if(snapshot.exists()){
            dadoProduto.value = snapshot.val().produto;
            dadoCategoria.value = snapshot.val().categoria;
            dadoQuantidade.value = snapshot.val().quantidade;
            dadoValor.value = ('R$ ')+parseFloat (snapshot.val().valor).toFixed(2);
            alert('Produto Localizado!')
        }else{
            alert("O produto não existe");
        }
    }).then(()=>{
        alert('Leitura Realizada!')
    }).catch((e)=>{
        alert('Algo deu errado!')
        console.log(e)
    })
 }

function AtualizarProdutos(){
    update(ref(db,'Produto/'+idProduto.value),{
        produto:dadoProduto.value,
        categoria:dadoCategoria.value,
        quantidade:dadoQuantidade.value,
        valor:dadoValor.value
    }).then(()=>{
        alert('Produto Atualizado!');
    }).catch((e)=>{
        alert('Algo deu errado!')
        console.log(e)
    })
}

function DeletarProdutos(){
    remove(ref(db,'Produto/'+idProduto.value)).
    then(()=>{
        idProduto.value=''
        dadoProduto.value=''
        dadoCategoria.value=''
        dadoQuantidade.value=''
        dadoValor.value=''
        alert('Produto Deletado!')
    })
}

buscarProduto.addEventListener('click',PesquisarProduto);
atualizarProduto.addEventListener('click',AtualizarProdutos);
deletarProduto.addEventListener('click',DeletarProdutos);