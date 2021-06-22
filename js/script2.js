let new_task_name = document.querySelector("#add_task");
let new_task_btn = document.querySelector("#add_tsk_btn");
let filter_task = document.querySelector("#task_filter");
let task_list = document.querySelector("#output");
let form = document.querySelector("#form_tsk");
let clear_all = document.querySelector("#all_clear");

//UI eventlistener
form.addEventListener("submit",addData);
task_list.addEventListener("click",removeTask);
clear_all.addEventListener("click",removeAll);
filter_task.addEventListener("keyup",filterTask);
document.addEventListener("DOMContentLoaded",get_from_local_storage);

//define function
function addData(e){
    e.preventDefault();
    if(new_task_name.value=="")
    {
        alert("Add a Task")
    }else{
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(new_task_name.value + " "));
        let link = document.createElement("a");
        link.setAttribute("href","#");
        link.innerHTML="x"
        li.appendChild(link);
        task_list.appendChild(li);
        store_in_local_storage(new_task_name.value);
        new_task_name.value="";
        
    }
}

//Remove one task
function removeTask(e){
    if(e.target.hasAttribute("href")){
        if(confirm("are you sure?")){
            let ele = e.target.parentElement;
            remove_from_LS(ele);
            ele.remove();
            
        }
    }
}


//clear all 
function removeAll(e){
    if(confirm("all data will be romoved! Are you sure?")){
        let remove_list = document.querySelectorAll("li");
        Array.from(remove_list).forEach(function(el) {
            el.remove();
          });
        //console.log(remove_list);
        localStorage.clear();
    }
}

//filter Task
function filterTask(e){
   let text = e.target.value.toLowerCase();
   let alltask = document.querySelectorAll("li");
   alltask.forEach((item)=>{
       let task = item.firstChild.textContent;
       if(task.toLowerCase().indexOf(text)!=-1){
           item.style.display= "block";
       }else{
        item.style.display= "none";
       }
   })
}


// store task in local storage
function store_in_local_storage(task)
{
    let tasks;
    if(localStorage.getItem("tasks")==null)
    {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

//get tasks from local storage
function get_from_local_storage(e){
    let tasks;
    if(localStorage.getItem("tasks")==null)
    {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach((task)=>{
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement("a");
        link.setAttribute("href","#");
        link.innerHTML="x"
        li.appendChild(link);
        task_list.appendChild(li);
    });
}


//remove one item from local storage
function remove_from_LS(task)
{
    let tasks;
    if(localStorage.getItem("tasks")==null)
    {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    let li = task;
    li.removeChild(li.lastChild);
    tasks.forEach((item,index)=>{
        if(li.textContent.trim()===item)
        {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

