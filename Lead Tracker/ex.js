let myLeads = [];

const inputEl = document.getElementById('text-el');
const saveBtn = document.getElementById('save-btn');
const delEl = document.getElementById('delete-btn');
const ulEl = document.getElementById('ul-el');
const tabEl = document.getElementById('tab-btn');



let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    renderItems();
}


saveBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value);  
    inputEl.value = "";

    localStorage.setItem("myLeads",JSON.stringify(myLeads));

    renderItems();
})


tabEl.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        renderItems();
    });
    
})

delEl.addEventListener("click",function(){
    localStorage.clear();
    myLeads = [];
    renderItems();
})

function renderItems(){
let listItems = ""
for(let i=0;i<myLeads.length;i++){
    listItems += `<li> 
                    <a href='${myLeads[i]}' target='_blank'>  ${myLeads[i]}  </a> 
                  </li>
    `;
}
ulEl.innerHTML = listItems;
}