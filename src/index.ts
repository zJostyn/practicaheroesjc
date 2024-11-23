import { ListaHeroes } from "../src/Controlador/TLista"
import { Listar, Insertar, Editar, Eliminar } from "../src/Controlador/TLista"

document.addEventListener("DOMContentLoaded", () => {
    Listar();
});

console.log(ListaHeroes);
//Declaracion de variables
const tabla = document.getElementById("tabla-H") as HTMLTableElement;
const modal = document.getElementById("container-form");
let button = document.getElementById("btn") as HTMLButtonElement;
let buttonRS = document.getElementById("btn-rs") as HTMLButtonElement;
let buttonRG = document.getElementById("btn-rg") as HTMLButtonElement;
let buttonIT = document.getElementById("btn-insert") as HTMLButtonElement;

let primerValor = 0;
let opcion = '';
const obtenerPagina = window.location.pathname;

document.addEventListener("DOMContentLoaded", () => {
    if (button) button.addEventListener("click", save);
    else console.log("Elemento btn no encontrado.");

    if (buttonRS) buttonRS.addEventListener("click", reiniciarLista);
    else console.log("Elemento btn-rs no encontrado.");

    if (buttonRG) buttonRG.addEventListener("click", regresarInicio);
    else console.log("Elemento btn-rg no encontrado.");

    if (buttonIT) buttonIT.addEventListener("click", eliminarEditar);
    else console.log("Elemento btn-rg no encontrado.");
});

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("editar") != null && obtenerPagina.endsWith("Insertar.html")) {
        console.log("Esta entrando a editar")
        const heroeEditado = JSON.parse(localStorage.getItem("editar") || "[]");
        opcion = 'editar';
        primerValor = heroeEditado.Codigo;
        (<HTMLHeadingElement>document.getElementById("hero-titulo")).innerText = 'Editar Héroe';
        (<HTMLButtonElement>document.getElementById("btn")).innerText = 'Modificar';
        (<HTMLInputElement>document.getElementById("codigo")).value = heroeEditado.Codigo;
        (<HTMLInputElement>document.getElementById("nombre")).value = heroeEditado.Nombre;
        (<HTMLInputElement>document.getElementById("edad")).value = heroeEditado.Edad;
        (<HTMLInputElement>document.getElementById("ciudad")).value = heroeEditado.Ciudad;
        (<HTMLInputElement>document.getElementById("imagen")).value = heroeEditado.Imagen;
    } else {
        console.log("No esta para editar");
    }
});

function reiniciarLista() {
    localStorage.setItem("ListaHeroes", JSON.stringify(ListaHeroes));
    Listar();
}

function regresarInicio() {
    window.location.href = './index.html';
}

function eliminarEditar() {
    localStorage.removeItem("editar");
}

//funcion limpiar campos
function limpiar() {
    (<HTMLInputElement>document.getElementById("codigo")).value = '';
    (<HTMLInputElement>document.getElementById("nombre")).value = '';
    (<HTMLInputElement>document.getElementById("edad")).value = '';
    (<HTMLInputElement>document.getElementById("ciudad")).value = '';
    (<HTMLInputElement>document.getElementById("imagen")).value = '';
}

//Se llama a la funcion Insertar, Editar
function save(e: Event): void {
    e.preventDefault();
    if (opcion == "editar") {
        Editar(primerValor);
        primerValor = 0;
        limpiar();
        opcion = "";
    } else {
        Insertar();
        primerValor = 0;
        limpiar();
    }
    modal?.classList.remove("active");
}

//Se obtiene el codigo
if (obtenerPagina.endsWith("index.html")) {
    tabla.addEventListener('click', (event) => {
        const target = event.target as HTMLButtonElement;
        let parent = (<HTMLElement>(<HTMLElement>event.target).parentNode?.parentNode);
        if (target.classList.contains("editar")) {
            const fila = parent;
            primerValor = Number(fila.children[0].innerHTML);
            opcion = "editar";
            const heroe = {
                Codigo: Number(fila.children[0].innerHTML),
                Nombre: fila.children[1].innerHTML,
                Edad: Number(fila.children[2].innerHTML),
                Ciudad: fila.children[3].innerHTML,
                Imagen: fila.children[4].querySelector('img')?.src ?? ''
            }

            localStorage.setItem("editar", JSON.stringify(heroe));

            window.location.href = './Insertar.html';
        }
    });
}

//Funcion Eliminar
if(obtenerPagina.endsWith("index.html")) {
    tabla.addEventListener('click', (event) => {
        const target = event.target as HTMLButtonElement;
        let parent = (<HTMLElement>(<HTMLElement>event.target).parentNode?.parentNode);
        if (target.classList.contains("eliminar")) {
            const fila = parent;
            primerValor = Number(fila.children[0].innerHTML);
            Eliminar(primerValor);
            console.log("Eliminado");
            primerValor = 0;
        }
    });
}
