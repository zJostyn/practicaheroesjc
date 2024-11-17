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
let buttonAdd = document.getElementById("btn-add") as HTMLButtonElement;
let primerValor = 0;
let opcion = '';

document.addEventListener("DOMContentLoaded", () => {
    button = document.getElementById("btn") as HTMLButtonElement;
    buttonAdd = document.getElementById("btn-add") as HTMLButtonElement;

    if (button) button.addEventListener("click", save);
    else console.error("Elemento btn no encontrado.");

    if (buttonAdd) buttonAdd.addEventListener("click", openModal);
    else console.error("Elemento btn-add no encontrado.");
});


function openModal() {
    if (modal) {
        modal.classList.add('active');
        console.log("Abrir modal");
        modal.onclick = (event: Event) => {
            const target = event.target as HTMLDivElement;
            if (target.className.indexOf("container-form") !== -1) {
                modal.classList.remove("active");
                primerValor = 0;
                limpiar();
                opcion = "";
            }
        };
    }
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
tabla.addEventListener('click', (event) => {
    const target = event.target as HTMLButtonElement;
    let parent = (<HTMLElement>(<HTMLElement>event.target).parentNode?.parentNode);
    if (target.classList.contains("editar")) {
        openModal();
        const fila = parent;
        primerValor = Number(fila.children[0].innerHTML);
        opcion = "editar";
        (<HTMLHeadingElement>document.getElementById("hero-titulo")).innerText = 'Editar Héroe';
        (<HTMLButtonElement>document.getElementById("btn")).innerText = 'Modificar';
        (<HTMLInputElement>document.getElementById("codigo")).value = (fila.children[0].innerHTML);
        (<HTMLInputElement>document.getElementById("nombre")).value = (fila.children[1].innerHTML);
        (<HTMLInputElement>document.getElementById("edad")).value = (fila.children[2].innerHTML);
        (<HTMLInputElement>document.getElementById("ciudad")).value = (fila.children[3].innerHTML);
        const imagen = fila.children[4].querySelector('img') as HTMLImageElement;
        if (imagen) {
            (<HTMLInputElement>document.getElementById("imagen")).value = imagen.src;
        }
        console.log("Editando");

    }

});

//Funcion Eliminar
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
