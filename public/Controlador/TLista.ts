import { Heroes } from "../Entidades/Heroe";
export { ListaHeroes }

let ListaHeroes: Heroes[] = [
    {
        Codigo: 1,
        Nombre: "Batman",
        Edad: 40,
        Ciudad: "Gotica",
        Imagen: "https://static.vecteezy.com/system/resources/thumbnails/024/163/657/small_2x/superhero-black-and-white-illustration-vector.jpg"
    },
    {
        Codigo: 2,
        Nombre: "Spiderman",
        Edad: 20,
        Ciudad: "New York",
        Imagen: "https://media.gq.com.mx/photos/64d90211fb852355e0322970/16:9/w_2560%2Cc_limit/Spider-Man%2520Lotus%2520(1).jpg"
    },
    {
        Codigo: 3,
        Nombre: "Superman",
        Edad: 35,
        Ciudad: "Metropolis",
        Imagen: "https://www.infobae.com/resizer/v2/AMZVGO3IIJEWBI4JRKF32SRI5U.jfif?auth=965d71ec8cf8eab2ebefeae19f6324bf5ea2f6f6607721b2dfcf2f84eac04df4&smart=true&width=350&height=197&quality=85"
    }
]

const obtenerPagina = window.location.pathname;

// Funcion insertar heroes
export function Insertar() {

    let ListHeroe: Heroes[] = JSON.parse(localStorage.getItem("ListaHeroes") || "[]");

    let cod = Number((<HTMLInputElement>document.getElementById("codigo")).value.toString());
    let nom = (<HTMLInputElement>document.getElementById("nombre")).value.toString();
    let eda = Number((<HTMLInputElement>document.getElementById("edad")).value.toString());
    let ciu = (<HTMLInputElement>document.getElementById("ciudad")).value.toString();
    let img = (<HTMLInputElement>document.getElementById("imagen")).value.toString();

    const op = new Heroes(cod, nom, eda, ciu, img);
    ListHeroe.push(op);
    localStorage.setItem("ListaHeroes", JSON.stringify(ListHeroe));
    Listar();
}

//Funcion Editar
export function Editar(codigo: number) {

    let ListHeroe: Heroes[] = JSON.parse(localStorage.getItem("ListaHeroes") || "[]");

    let cod = Number((<HTMLInputElement>document.getElementById("codigo")).value.toString());
    let nom = (<HTMLInputElement>document.getElementById("nombre")).value.toString();
    let eda = Number((<HTMLInputElement>document.getElementById("edad")).value.toString());
    let ciu = (<HTMLInputElement>document.getElementById("ciudad")).value.toString();
    let img = (<HTMLInputElement>document.getElementById("imagen")).value.toString();
    let index = ListHeroe.findIndex(heroe => heroe.Codigo === codigo);
    if (index !== -1) {
        ListHeroe[index] = new Heroes(cod, nom, eda, ciu, img);
    }

    localStorage.setItem("ListaHeroes", JSON.stringify(ListHeroe));
    localStorage.removeItem("editar");

    window.location.href = '../index.html';
    
    Listar();
}

//Funcion Eliminar
export function Eliminar(codigo: number) {
    let ListHeroe: Heroes[] = JSON.parse(localStorage.getItem("ListaHeroes") || "[]");
    const index = ListHeroe.findIndex(op => op.Codigo === codigo);
    if (index >= 0) {
        ListHeroe.splice(index, 1);
    }
    localStorage.setItem("ListaHeroes", JSON.stringify(ListHeroe));
    Listar();
}

// Funcion listar heroes
export function Listar() {
    if (obtenerPagina.endsWith("Insertar.html") == false) {
        let lis = "";
        if (localStorage.getItem("ListaHeroes")?.length == null) {
            localStorage.setItem("ListaHeroes", JSON.stringify(ListaHeroes));
        }
        let lista = <HTMLElement>document.getElementById("lista-h");
        let ListHeroe: Heroes[] = JSON.parse(localStorage.getItem("ListaHeroes") || "[]");
        for (let i = 0; i < ListHeroe.length; i++) {
            lis = "<tr>" + lis + "<td>" + ListHeroe[i].Codigo + "</td>" +
                "<td>" + ListHeroe[i].Nombre + "</td>" +
                "<td>" + ListHeroe[i].Edad + "</td>" +
                "<td>" + ListHeroe[i].Ciudad + "</td>" +
                "<td> <img src = " + ListHeroe[i].Imagen + "> </td>" +
                `<td><button class="editar btn btn-warning" style="background-color: orange; color: black;">Editar</button> <button class="eliminar btn btn-danger" style="background-color: red;">Eliminar</button></td>` + "</tr>";
        }
        lista.innerHTML = lis;
    }
}
