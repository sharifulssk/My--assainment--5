// console.log("bismilla")
 // DOM elements
    const container = document.getElementById("card-container");
    const issueCount = document.getElementById("issueCount");
    const tabs = document.querySelectorAll(".category-btn");
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
 
    let allIssues = [];

    // Modal functions
    function openModal(issue) {
      document.getElementById("issueModal").classList.remove("hidden");
      document.getElementById("modalTitle").innerText = issue.title;
      document.getElementById("modalDesc").innerText = issue.description;
      document.getElementById("modalPriority").innerText = issue.priority.toUpperCase();
      document.getElementById("modalAuthor").innerText = issue.author;
      document.getElementById("modalDate").innerText = issue.createdAt;
      document.getElementById("modalAssignee").innerText = issue.assignee;
      const statusEl = document.getElementById("modalStatus");
      statusEl.innerText = issue.status.toUpperCase();
      statusEl.className = `px-3 py-1 rounded-full text-xs ${issue.status === 'open' ? 'bg-green-500 text-white' : 'bg-purple-500 text-white'}`;

      // Labels
      const modalLabels = document.getElementById("modalLabels");
      modalLabels.innerHTML = "";
      issue.labels.forEach(label => {
        const span = document.createElement("span");
        span.innerText = label;
        span.className = `px-3 py-1 rounded-full text-xs ${label.toLowerCase() === 'bug' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`;
        modalLabels.appendChild(span);
      });
    }

    function closeModal() {
      document.getElementById("issueModal").classList.add("hidden");
    }

    // Fetch issues
    async function loadCards() {
      container.innerHTML = "<p class='text-center col-span-4'>Loading...</p>";
      try {
        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const data = await res.json();
        console.log(data);
        allIssues = data.data;
        displayCards(allIssues);
      } catch (err) {
        container.innerHTML = "<p class='text-center col-span-4 text-red-500'>Failed to load data</p>";
      }
    }
    loadCards();

    // Display cards
    function displayCards(issues) {
      container.innerHTML = "";
      issueCount.innerText = `${issues.length} Issues`;

      issues.forEach(issue => {
        const borderColor = issue.status === "open" ? "border-t-4 border-green-500" : "border-t-4 border-purple-500";

        const card = document.createElement("div");
        card.className = `bg-white p-5 shadow ${borderColor} cursor-pointer`;

        card.innerHTML = `
          <div class="w-full h-full bg-white rounded-sm p-[20px] border-gray-400 shadow-sm">
            <div class="flex justify-between items-center">
              <div class="">  <img src="./assets/Open-Status.png" alt="" class="w-6 h-6"></div>
              <div class="bg-[#f8d7da] text-[#c0392b] py-2 px-5 rounded-[20px] font-bold">${issue.priority.toUpperCase()}</div>
            </div>
            <h2 class="mt-[15px] font-bold pb-4">${issue.title}</h2>
            <p class="text-gray-500 line-clamp-2">${issue.description}</p>
            <div class="mt-4 flex gap-2 mb-3">
              ${issue.labels.map(label => `<span class="px-3 py-1 rounded-[10px] font-bold ${label.toLowerCase() === 'bug' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}">${label}</span>`).join('')}
            </div>
            <hr>
            <div class="text-gray-400 mt-2 mb-1">
              <p>#1 by ${issue.assignee}</p>
              <p>${issue.updatedAt}</p>
            </div>
          </div>
        `;

        card.addEventListener("click", () => openModal(issue));
        container.appendChild(card);
      });
    }

    // Tab filtering
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        if(tab.id === "btn-all") displayCards(allIssues);
        else if(tab.id === "btn-open") displayCards(allIssues.filter(issue => issue.status === "open"));
        else if(tab.id === "btn-closed") displayCards(allIssues.filter(issue => issue.status === "closed"));
      });
    });

    // Search functionality
    searchBtn.addEventListener("click", async () => {
      const query = searchInput.value.trim();
      if(!query) return loadCards();
      container.innerHTML = "<p class='text-center col-span-4'>Searching...</p>";
      try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`);
        const data = await res.json();
        displayCards(data.data);
      } catch(err) {
        container.innerHTML = "<p class='text-center col-span-4 text-red-500'>Search failed</p>";
      }
    });
