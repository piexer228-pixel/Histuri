/* -----------------------------------
   کنترل منوی سه‌خط (تمام صفحات)
------------------------------------ */
function openMenu() {
    let menu = document.getElementById("sideMenu");
    if (menu) menu.style.right = "0";
}

function closeMenu() {
    let menu = document.getElementById("sideMenu");
    if (menu) menu.style.right = "-270px";
}

/* -----------------------------------
   ابزارهای ویرایش متن (صفحه add.html)
------------------------------------ */
function formatText(type) {
    let textarea = document.getElementById("editor");
    if (!textarea) return;

    if (type === "bold") {
        textarea.value += "<b>متن بولد</b>";
    }

    else if (type === "italic") {
        textarea.value += "<i>متن کج</i>";
    }

    else if (type === "increase") {
        textarea.value += "<span style='font-size:20px;'>فونت بزرگ</span>";
    }

    else if (type === "decrease") {
        textarea.value += "<span style='font-size:12px;'>فونت کوچک</span>";
    }
}

/* -----------------------------------
   ثبت مقاله (نسخه اولیه و ساده)
------------------------------------ */
function savePost() {
    let title = document.getElementById("title");
    let category = document.getElementById("category");
    let text = document.getElementById("editor");

    if (!title || !category || !text) return;

    if (title.value.trim() === "" || text.value.trim() === "") {
        alert("لطفاً عنوان و متن را وارد کنید.");
        return;
    }

    // در آینده ذخیره واقعی اضافه می‌کنیم
    alert("مطلب با موفقیت ذخیره شد! (نسخه اولیه)");
}

/* -----------------------------------
   جلوگیری از خطا در صفحات بدون منو
------------------------------------ */
document.addEventListener("DOMContentLoaded", function () {
    let m1 = document.querySelector(".menu-icon");
    let m2 = document.querySelector(".close-btn");

    if (m1) m1.addEventListener("click", openMenu);
    if (m2) m2.addEventListener("click", closeMenu);
});
