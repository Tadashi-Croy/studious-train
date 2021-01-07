let inputItem = document.querySelector("#inputItem")
let addBtn = document.querySelector("#addBtn")
let addedItems = document.querySelector("#addedItems")
let completedItems = document.querySelector("#completedItems")
let clearList = document.querySelector("#clearList")
let removeAll = document.querySelector("#removeAll")
let removeDone = document.querySelector("#removeDone")

for (let x of Object.keys(window.sessionStorage)){
    let y = window.sessionStorage.getItem(x)    
    if (x.endsWith('done')){
        
        let complete = y
        let liComp = document.createElement('li')
        liComp.innerHTML = `<strike> ${complete} </strike>`
        completedItems.appendChild(liComp)

        console.log(x, y)
        continue
    }
    
    listNode(y)
}


function listNode(value){
    let listNode = document.createElement("li")
    let toAdd = document.createElement("button")
    listNode.classList.add("doList")

    toAdd.innerHTML = "<span>&#10003;</span>"
    toAdd.classList.add('doneBtn')

    toAdd.addEventListener('click', function(){

        this.innerText = ''
        let complete = this.parentNode.innerText
        let liComp = document.createElement('li')
        liComp.innerHTML = `<strike> ${complete} </strike>`
        completedItems.appendChild(liComp)
        this.parentElement.remove()
        window.sessionStorage.removeItem(complete)
        window.sessionStorage.setItem( complete + 'done', complete )


    })

    listNode.innerText= `${value}`
    
    listNode.addEventListener('dblclick', function(){ 
        console.log(this)
        this.remove()
    }) 

    listNode.appendChild(toAdd)
    addedItems.appendChild(listNode)

} 


const addItems = function(event){
    if (inputItem.value.trim() == ""){
        console.log(inputItem.value)
        return
    }
    
    window.sessionStorage.setItem( inputItem.value , inputItem.value )

    listNode(inputItem.value)

    
    

    inputItem.value = ""
    inputItem.focus()


}


addBtn.addEventListener("click",addItems)

inputItem.addEventListener("keyup", function(event){
    if (event.key === 'Enter'){
        addItems()
    } 
})
clearList.addEventListener('click', function (){
    for (x of [...completedItems.children]){
        x.remove()
    }
    for (x of [...addedItems.children]){
        x.remove()
    }
    window.sessionStorage.clear()
})

removeDone.addEventListener('click', function(){
     for (x of [...completedItems.children]){
        window.sessionStorage.removeItem(x.innerText + 'done')
        x.remove()
    }

})



removeAll.addEventListener('click', function(){
    for (x of [...addedItems.children]){
        x.remove()
    }


})
