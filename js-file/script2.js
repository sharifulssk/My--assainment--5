// console.log("bismilla")
const container = document.getElementById("card-container");
const tabs = document.querySelectorAll(".category-btn")

function openModal(issue){

document.getElementById("issueModal").classList.remove("hidden");

document.getElementById("modalTitle").innerText = issue.title;
document.getElementById("modalDesc").innerText = issue.description;
document.getElementById("modalPriority").innerText = issue.priority.toUpperCase();
document.getElementById("modalAuthor").innerText = issue.author;
document.getElementById("modalDate").innerText = issue.createdAt;
document.getElementById("modalAssignee").innerText = issue.assignee;

}

async function loadcards() {

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
const data = await res.json();

displayCards(data.data);

}
loadcards();



function displayCards(issues){

container.innerHTML = "";
issues.forEach((issue) => {

let borderColor =
issue.status === "open"
? "border-t-4 rounded-sm border-green-500"
: "border-t-4 border-purple-500";

const card = document.createElement("div");

card.innerHTML = 
`
<div class="bg-white p-5 shadow ${borderColor}">
<div class="w-full h-full bg-white rounded-sm p-[20px] border-gray-400 shadow-sm cursor-pointer">

<div class="flex justify-between items-center">
<div class="">  <img src="./assets/Open-Status.png" alt="" class="w-full h-full"></div>
<div class="bg-[#f8d7da] text-[#c0392b] py-2 px-5 rounded-[20px] font-bold">${issue.priority.toUpperCase()}</div>
</div>

<h2 class="mt-[15px] font-bold pb-4">${issue.title}</h2>

<p class="text-gray-500 line-clamp-2">${issue.description}</p>

<div class="mt-4 flex gap-2 mb-3">
<span class="bg-[#f8d7da] text-[#c0392b] h-[24px] w-[56px] text-center rounded-[10px] font-bold">BUG</span>
<span class="bg-[#FDE68A] text-[#D97706] w-[112px] h-[24px] text-center rounded-[20px]">HELP WANTED</span>
</div>
<hr>
<div class="text-gray-400 mt-2 mb-1">
<p>#1 by ${issue.assignee}</p>
<p>${issue.updatedAt}</p>
</div>

`;

// Modal added js code--------------------------------
card.addEventListener("click", function(){
openModal(issue);
});

container.appendChild(card);

});

};
function closeModal(){
document.getElementById("issueModal").classList.add("hidden");
}

// -------------------------------------------------
tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        if(tab.id === "btn-all") displayCards(data);
        else if(tab.id === "btn-open") displayCards(data.filter(issue => issue.status === "open"));
        else if(tab.id === "btn-closed") displayCards(data.filter(issue => issue.status === "closed"));
      });
    });