let taskInput = document.getElementById('task-input');
let taskBtn = document.getElementById('task-button');
let tabs = document.querySelectorAll('#tabs > div');
let todoList = [];



taskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown',(e)=>{
    if(e.keyCode == 13){
        addTask();
    }
})
taskInput.addEventListener('submit',(e)=>{
    e.preventDefault();
});

//Input값 담는 변수
function addTask(){
   let taskContent = taskInput.value;
   todoList.push(taskContent);
   console.log(todoList);
   render();
   taskInput.value = '';
}

// 받은 Input값을 그려주기
function render(){
    let result = '';
    for(i=0; i < todoList.length; i++){
            result += 
                    `<div> 
                        <span> ${todoList[i]} </span>

                        <div>
                            <button> Check! </button>            
                            <button> Delete </button>            
                        </div>
                    </div>`
    }
    document.getElementById('todoBox').innerHTML = result;
}


