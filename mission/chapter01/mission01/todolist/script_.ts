const todoinput = document.getElementById('todo-input') as HTMLInputElement
const todoform = document.getElementById('todo-form') as HTMLFormElement
const todolist = document.getElementById('todo-list') as HTMLUListElement
const donlist = document.getElementById('don-list') as HTMLUListElement

type todo = {
    id:number;
    text :string;
};

let todos : todo[]=[];
let dontasks : todo[]= [];

const rendertask = (): void =>{
    todolist.innerHTML='';
    donlist.innerHTML='';
};

