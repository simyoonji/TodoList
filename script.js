let taskInput = document.getElementById('task-input');
let taskBtn = document.getElementById('task-button');
let tabs = document.querySelectorAll('#tabs > div');
let todoList = [];
let filterList = [];
let mode = 'all';


taskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown',(e)=>{
    if(e.keyCode == 13){
        addTask();
    }
})
taskInput.addEventListener('submit',(e)=>{
    e.preventDefault();
});

for(i=0; i < tabs.length; i++){
    tabs[i].addEventListener('click',(e)=>{
        filter(e);
    });
}

//Input값 담는 변수
function addTask(){
   // input값을 넣을 변수를 하나 만들어준다.
   let taskValue = taskInput.value;

   // 정보를 하나로 깔끔하게 정리 할 수 있게 object를 하나 만들어준다.
   let task = {
    textContent :taskValue,
    id : randomNum(),
    isComplete: false,
   }

   todoList.push(task);
   console.log(todoList);
   render();
}

// 받은 Input값을 그려주기
function render(){
    let result = '';
    let list = [];
    //새로운 배열을 만든다
    // mode가 all이면 list에 todoList를 넣고, mode가 ongoing || done 이면 list에 filterList를 넣는다.

    if(mode === 'all'){
        list = todoList;
    }else if(mode === 'ongoin' || mode === 'done'){
        list = filterList;
    }

    for(i=0; i < list.length; i++){
        if(list[i].isComplete === true){
            result += 
                    `<div> 
                        <span class="line"> ${list[i].textContent} </span>

                        <div>
                            <button onclick = "toggleBtn('${list[i].id}')"> Check! </button>            
                            <button onclick = "DeleteBtn('${list[i].id}')"> Delete</button>            
                        </div>
                    </div>`
        }else {
            result += 
                    `<div> 
                        <span> ${list[i].textContent} </span>

                        <div>
                            <button onclick = "toggleBtn('${list[i].id}')"> Check! </button>            
                            <button onclick = "DeleteBtn('${list[i].id}')"> Delete</button>            
                        </div>
                    </div>`
        }
    }
    document.getElementById('todoBox').innerHTML = result;
}

//tabs 만들기 
function filter(e){
    if(e){
        mode = e.target.id;
    }
    filterList = [];

    if(mode === 'all'){
        render(); //todoList에 담겨져있는 모든 배열을 보여주면 된다. 

    }else if(mode === 'ongoing'){
        //진행중이다? false라는 뜻, true는 담겨있을 수 없다!
        //isComplete가 false인걸 filterList에 담아주면 된다.
        for(i=0; i < todoList.length; i++){
            if(todoList[i].isComplete === false){
                filterList.push(todoList[i]);
            }
        }

    }else if(mode === 'done'){
        //완료됐다? true라는 뜻, false는 담겨있을 수 없다!
        //isComplete가 true인걸 filterList에 담아주면 된다.
        for(i=0; i < todoList.length; i++){
            if(todoList[i].isComplete === true){
                filterList.push(todoList[i]);
            }
        }
    }
    render();
}


//Check toggle 버튼 만들기
function toggleBtn(id){
    //for문을 통해서 돌면서,  onclick을 이용하여 이벤트리스너를 연결 해 준다.
    //버튼을 눌러서 todoList의 id값을 가져오고, 내가 누른 버튼과 id가 일치하면 isComplete 를 true로 바꿔준다. 
    //다시 버튼을 누르면 false로 변한다. 
    for(i=0; i < todoList.length; i++){
        if(todoList[i].id === id){
            todoList[i].isComplete = !todoList[i].isComplete;
        }
    }
    render();
}

//Delete 버튼 만들기
function DeleteBtn(id){
    for(i=0; i < todoList.length; i++){
        //id가 id랑 같다면, 배열에서 삭제하는 법은 splice이다. 이걸 이용해서 삭제할 것이다.
        if(todoList[i].id === id){
            todoList.splice(i,1);
        } 
    }
    render();
}

//랜덤번호 추출
function randomNum(){
    return '_' + Math.random().toString(36).substr(2,9);
}

