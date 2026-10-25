// ==========================================================================
// Contact Form Logic (Handling the Bootstrap Modal Form)
// ==========================================================================

let contactForm = document.getElementById("contact-form");
let formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        let visitorName = document.getElementById("visitor-name").value;
        
        formStatus.innerHTML = "Thank you, " + visitorName + "! My system has successfully recorded your message.";
        formStatus.classList.add("text-success", "fw-bold"); // Using Bootstrap text color class
        
        contactForm.reset();
        
        // Note: Bootstrap modals usually stay open until the user clicks close, 
        // so we don't need the custom setTimeout closing function anymore.
    });
}

// ==========================================================================
// API Logic (Daily Quote Generator via FreeAPI)
// ==========================================================================

let quoteText = document.getElementById("quote-text");
let quoteAuthor = document.getElementById("quote-author");
let newQuoteBtn = document.getElementById("new-quote-btn");

function fetchQuote() {
    quoteText.innerHTML = "Fetching a new quote...";
    quoteAuthor.innerHTML = "";

    fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random")
        .then(function(response) {
            return response.json(); 
        })
        .then(function(quoteData) {
            console.log("API Response received:", quoteData);
            
            let fetchedQuote = quoteData.data.content;
            let fetchedAuthor = quoteData.data.author;
            
            quoteText.innerHTML = '"' + fetchedQuote + '"';
            quoteAuthor.innerHTML = "- " + fetchedAuthor;
        })
        .catch(function(error) {
            console.error("Error fetching quote:", error);
            quoteText.innerHTML = "Oops! I couldn't fetch a quote right now.";
        });
}

fetchQuote();

if (newQuoteBtn) {
    newQuoteBtn.addEventListener("click", fetchQuote);
}
