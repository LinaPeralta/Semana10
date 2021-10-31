//alert("HOLA");


import { initializeApp} from "firebase/app";
import {DataSnapshot, getDatabase, onValue, ref, set, push} from "firebase/database";
import {getFirebaseConfig} from "./firebase-config";


const nombre = document.getElementById("nombre");
const id_usuario = document.getElementById("id_usuario");
const id_candidato = document.getElementById("id_candidato");
const registrarBtn = document.getElementById("registrarBtn");
const votarBtn = document.getElementById("votarBtn");
const candidatosBtn = document.getElementById("candidatosBtn");
const votacionesBtn = document.getElementById("votacionesBtn");
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);
const db = getDatabase();
let recorrido=false;


//console.log(nombre);


function registroCandidato (e,event){
    let n = nombre.value;
    let id= id_usuario.value;

    if(n==="" || id===""){
        alert("Por favor complete los campos de texto");
        return;
    } else {

        let candidato = {
         ID: id,
         Name: n
        };

        let voto ={
            cantidad: 0,
            ID: id
        };

        const  jsonObject = JSON.stringify(candidato);
    
        set(ref(db,"Candidatos/"+candidato.ID),candidato);
        set(ref(db,"Votos/"+candidato.ID),voto);
        verCantidatos();
    }

}

function votar (e,event){

    let id= id_candidato.value;

    if(id===""){
        alert("Por favor complete el campo de texto");
        return;
    } else {

       
        onValue(ref(db,"Votos"),(snapshot)=>{
            const data =  snapshot.val();
            let voto = null;
            let userId = null;
 
      
            Object.keys(data).forEach((k,index)=>{

                if (!recorrido){
                 
                 userId =  data[k].ID;
                 //let userId = user.ID;
 
 
                 if(id === userId){
                       data[k].cantidad= data[k].cantidad+1;
 
                      voto ={
                         cantidad:data[k].cantidad,
                         ID: id
                     };
                     
                     registrarVotos(voto,id);
                     recorrido = true;
                     console.log(recorrido);
                     return;
 
                 } else {
                      alert("El candidato es inexistente");
                     return;
                 }
                }
                return;
            });
 
        });
       }
      return;

       

    
    return;
}

function registrarVotos (voto,id){

    set(ref(db,"Votos/"+id),voto);
    

}

function verCantidatos (){

    let n = nombre.value;
    let id= id_usuario.value;

    alert(n+":"+id);
    //set(ref(db,"Candidatos/"+candidato.ID),candidato);
}

registrarBtn.addEventListener("click",registroCandidato);
votarBtn.addEventListener("click",votar);
candidatosBtn.addEventListener("click",verCantidatos)

