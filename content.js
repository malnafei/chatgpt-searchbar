let lastUrl = window.location.href;

function clearSearch() {
  const existingSearchInput = document.getElementById("searchInput");
  if (existingSearchInput) {
    existingSearchInput.remove();
  }
}

function performSearch(query) {
  const chatItems = document.querySelectorAll("ol li");

  chatItems.forEach(item => {
    const chatName = item.querySelector(".text-ellipsis").textContent.toLowerCase();
    if (chatName.includes(query)) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });
}

function initializeSearch() {
  clearSearch();

  // Create and insert the search input element
  const searchInput = document.createElement("input");
  searchInput.id = "searchInput";
  searchInput.type = "text";
  searchInput.placeholder = "Search";
  searchInput.classList.add("search-input");
  searchInput.style.cssText = "background: #40414f; color: white;border-color: #292828;border-radius: 5px;margin-top: 10px;";
  const nav = document.querySelector("nav");
  nav.insertBefore(searchInput, nav.childNodes[2]);

  // Add the event listener for filtering functionality
  searchInput.addEventListener("keyup", function(event) {
    const query = event.target.value.toLowerCase();

    // Click the "Load More" button if it exists
    const loadMoreButton = document.querySelector("button.btn.relative.btn-dark.btn-small.m-auto.mb-2");
    if (loadMoreButton) {
      loadMoreButton.click();
    }

    performSearch(query);
  });

}

function checkUrlChange() {
  if (lastUrl !== window.location.href) {
    lastUrl = window.location.href;
    initializeSearch();
  }
}

// Initialize search for the first time
initializeSearch();

// Set up a MutationObserver to watch for changes to the DOM
const observer = new MutationObserver(checkUrlChange);

// Start observing the entire document
observer.observe(document, { childList: true, subtree: true });
