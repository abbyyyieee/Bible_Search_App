const searchBtn = document.getElementById("searchBtn");
const passageInput = document.getElementById("passageInput");
const translationSelect = document.getElementById("translationSelect");
const referenceEl = document.getElementById("reference");
const verseTextEl = document.getElementById("verseText");

searchBtn.addEventListener("click", () => {
  const passage = passageInput.value.trim();
  const translation = translationSelect.value;

  if (!passage) {
    alert("Please enter a Bible passage");
    return;
  }

  const encoded = encodeURIComponent(passage);
  const url = `https://bible-api.com/${encoded}?translation=${translation}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Verse not found");
      }
      return response.json();
    })
    .then(data => {
      referenceEl.textContent = data.reference;
      verseTextEl.textContent = data.text;
    })
    .catch(error => {
      referenceEl.textContent = "";
      verseTextEl.textContent = "Error: " + error.message;
    });
});
