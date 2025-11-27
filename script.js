// باز و بسته شدن منوی موبایل
document.getElementById("menuToggle")?.addEventListener("click", function () {
    const menu = document.getElementById("mobileMenu");
    if (menu) menu.classList.toggle("open");
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
    if (form) {
        form.style.display = (form.style.display === "block") ? "none" : "block";
    }
}

// ذخیره‌سازی داستان جدید
function saveStory() {
    let title = document.getElementById("storyTitle")?.value.trim() || "";
    let text = document.getElementById("storyText")?.value.trim() || "";

    if (title === "" || text === "") {
        alert("لطفاً عنوان و متن داستان را کامل وارد کنید.");
        return;
    }

    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    stories.push({ title, text });
    localStorage.setItem("stories", JSON.stringify(stories));

    alert("داستان با موفقیت ذخیره شد!");

    if (document.getElementById("storyTitle")) document.getElementById("storyTitle").value = "";
    if (document.getElementById("storyText")) document.getElementById("storyText").value = "";
}

// نمایش لیست داستان‌ها
function loadStories() {
    const list = document.getElementById("storiesList");
    if (!list) return;

    let stories = JSON.parse(localStorage.getItem("stories")) || [];

    list.innerHTML = "";

    stories.forEach((story, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<a href="story.html?id=${index}">${story.title}</a>`;
        list.appendChild(li);
    });
}

// نمایش یک داستان
function loadStory() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id === null) return;

    const stories = JSON.parse(localStorage.getItem("stories")) || [];
    const story = stories[id];

    if (!story) return;

    const titleEl = document.getElementById("storyTitleDisplay");
    const textEl = document.getElementById("storyTextDisplay");

    if (titleEl) titleEl.innerText = story.title;
    if (textEl) textEl.innerText = story.text;
}
