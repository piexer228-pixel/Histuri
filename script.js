function toggleMenu() {
    let menu = document.getElementById("menu");
    if (menu.style.right === "0px") {
        menu.style.right = "-220px";
    } else {
        menu.style.right = "0px";
    }
}

// ---------------------------
// ذخیره مقاله
// ---------------------------
function saveStory() {
    let title = document.getElementById("title").value;
    let cat = document.getElementById("category").value;
    let content = document.getElementById("content").value;
    let imgFile = document.getElementById("image").files[0];

    let reader = new FileReader();
    reader.onload = function () {
        let story = {
            title,
            cat,
            content,
            img: reader.result
        };

        let stories = JSON.parse(localStorage.getItem("stories") || "[]");
        stories.push(story);
        localStorage.setItem("stories", JSON.stringify(stories));

        alert("مقاله ذخیره شد!");
        location.href = "stories.html";
    };

    reader.readAsDataURL(imgFile);
}

// ---------------------------
// نمایش لیست داستان‌ها
// ---------------------------
if (location.pathname.includes("stories.html")) {
    let stories = JSON.parse(localStorage.getItem("stories") || "[]");
    let target = document.getElementById("story-list");

    stories.forEach((s, i) => {
        target.innerHTML += `
            <div class="story-box">
                <h3>${s.title}</h3>
                <button onclick="openStory(${i})">نمایش</button>
            </div>
        `;
    });
}

// ---------------------------
// باز شدن ادامه مطلب
// ---------------------------
function openStory(id) {
    localStorage.setItem("openStory", id);
    location.href = "story.html";
}

// ---------------------------
// نمایش متن در صفحه story.html
// ---------------------------
if (location.pathname.includes("story.html")) {
    let id = localStorage.getItem("openStory");
    let s = JSON.parse(localStorage.getItem("stories"))[id];

    document.getElementById("story-img").src = s.img;
    document.getElementById("story-title").innerHTML = s.title;
    document.getElementById("story-text").innerHTML = s.content;
}

// -----------------
// EDITOR BUTTONS
// -----------------
function makeBold() {
    document.getElementById("content").value += " <b>متن بولد</b> ";
}
function makeItalic() {
    document.getElementById("content").value += " <i>متن کج</i> ";
}
function makeBig() {
    document.getElementById("content").value += " <span style='font-size:22px'>متن بزرگ</span> ";
}
