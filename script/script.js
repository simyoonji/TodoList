// 유저값을 받아와서 task에 추가한다.
// + 버튼과 엔터를 눌러서 추가할 수 있게한다.
// check 버튼을 누르면 밑줄이 그려지고, completed 된다.
// Delete 버튼을 누르면 해당하는 내용이 삭제된다.
// 만약 input창이 비어있다면 추가되지 않도록 한다.

let TaskForm = document.querySelector('form');
let TaskInput = document.querySelector('input');
let plusBtn = TaskForm.querySelector('button');
let tabs = document.querySelectorAll('.tabs > div');
let TaskLog = [];
let filterList = [];
let mode = 'all';

let tabLine = document.querySelectorAll('.tabs > div');

tabLine.forEach((menu) => {
    menu.addEventListener('click', (e) => moveTab(e));
});

function moveTab(e) {
    const selectedTab = document.querySelector('.selected');

    if (selectedTab) {
        selectedTab.classList.remove('selected');
    }

    underLine.style.left = e.currentTarget.offsetLeft + "px"
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight -4 + "px"
    underLine.style.width = e.currentTarget.offsetWidth + "px"

    e.currentTarget.classList.add('selected');
}


// event
TaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
});
//
PlusBtnToggle();
TaskInput.addEventListener("input", PlusBtnToggle)
//
plusBtn.addEventListener('click', SaveValue);
// tabs
for(let i =0; i < tabs.length; i++){
    tabs[i].addEventListener('click', (e) => {
        filter(e)
    });
}
function PlusBtnToggle(){
        if (TaskInput.value.trim() === '') {
            plusBtn.disabled = true; 
        } else {
            plusBtn.disabled = false; 
        }
}

// value 저장
function SaveValue(){

    let user = {
        InputValue : TaskInput.value,
        id : Date.now(),
        isComplete : false,
    }

    TaskLog.push(user);
    MakeTodo();
    TaskInput.value = '';
}

// 그리기
function MakeTodo(){
    let result = '';
    let list = [];

    if(mode === 'all'){
        list = TaskLog;
    }else if(mode === 'ongoing' || mode === 'done'){
        list = filterList;
    }

    for(let i = 0; i < list.length; i++){
        if(list[i].isComplete === true){
            result += 
            `<div>
                <span class="line">${list[i].InputValue}</span>
                <div>
                    <button onclick = "MakeComplete(${list[i].id})">check</button>
                    <button onclick = "DeleteBtn(${list[i].id})">Delete</button>
                </div>
            </div>`
        }else {
            result += 
        `<div>
            <span>${list[i].InputValue}</span>

            <div>
                <button onclick = "MakeComplete(${list[i].id})">check</button>
                <button onclick = "DeleteBtn(${list[i].id})">Delete</button>
            </div>
        </div>`
        }
    }
    document.querySelector('.task').innerHTML = result;
}


function filter(e){
    if(e){
        mode = e.target.id;
    }
    console.log(mode);
    filterList = [];

    if(mode === 'all'){
        MakeTodo();

    }else if(mode == 'ongoing'){
        for(i=0; i < TaskLog.length; i++){
            if(TaskLog[i].isComplete === false){
                filterList.push(TaskLog[i]);
            }
        }
    }else if(mode == 'done'){
        for(i=0; i < TaskLog.length; i++){
            if(TaskLog[i].isComplete === true){
                filterList.push(TaskLog[i]);
            }
        }
    }
    MakeTodo();
}



// button에 기능 넣기!
//Delete 버튼 만들기
function DeleteBtn(id){
    for(i=0; i < TaskLog.length; i++){
        //id가 id랑 같다면, 배열에서 삭제하는 법은 splice이다. 이걸 이용해서 삭제할 것이다.
        if(TaskLog[i].id === id){
            TaskLog.splice(i,1);
            break;
        } 
    }
    filter();
}
// complete 버튼 만들기
function MakeComplete(id){
    for(i=0; i < TaskLog.length; i++){
        if(TaskLog[i].id === id){
            // ! 을 이용해서 toggle을 만듬
            TaskLog[i].isComplete = !TaskLog[i].isComplete;
            break;
        }
    }
    filter();
}
