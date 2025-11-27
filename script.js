// باز و بسته شدن منوی موبایل
document.getElementById("menuToggle").addEventListener("click", function () {
    document.getElementById("mobileMenu").classList.toggle("open");
});

// اسکرول نرم برای لینک‌های داخلی
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
    link.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 60,
                behavior: "smooth"
            });
        }
    });
});

// نمایش / مخفی شدن بخش افزودن داستان
function toggleAddForm() {
    const form = document.getElementById("addForm");
    form.style.display = (form.style.display === "block") ? "none" : "block";
}

// ذخیره‌سازی داستان جدید در LocalStorage
function saveStory() {
    let title = document.getElementById("storyTitle").value.trim();
    let text = document.getElementById("storyText").value.trim();

    if (title === "" || text === "") {
        alert("لطفاً عنوان و متن داستان را کامل وارد کنید.");
        return;
    }

    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    stories.push({ title, text });
    localStorage.setItem("stories", JSON.stringify(stories));

    alert("داستان با موفقیت ذخیره شد!");
    document.getElementById("storyTitle").value = "";
    document.getElementById("storyText").value = "";
}

// نمایش لیست داستان‌ها در صفحه stories.html
function loadStories() {
    let list = document.getElementById("storiesList");
    if (!list) return;

    let stories = JSON.parse(localStorage.getItem("stories")) || [];

    list.innerHTML = "";

    stories.forEach((story, index) => {
        let item = document.createElement("li");
        item.innerHTML = `<a href="story.html?id=${index}">${story.title}</a>`;
        list.appendChild(item);
    });
}

// نمایش یک داستان در صفحه story.html
function loadStory() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");

    if (id === null) return;

    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    let story = stories[id];

    if (!story) return;

    document.getElementById("storyTitleDisplay").innerText = story.title;
    document.getElementById("storyTextDisplay").innerText = story.text;
}
