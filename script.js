const giftBox = document.querySelector(".gift-box");
const envelope = document.querySelector(".envelope");
const letter = document.querySelector(".letter");
const glow = document.querySelector(".glow");

giftBox.addEventListener("click", () => {
  giftBox.classList.add("open");
  glow.style.opacity = 1;

  // Sau 1.5s hộp biến mất & phong bì xuất hiện
  setTimeout(() => {
    giftBox.classList.add("fade-out");
  }, 1500);

  setTimeout(() => {
    giftBox.style.display = "none";
    envelope.classList.remove("hidden");
    envelope.classList.add("show");
  }, 2200);
});

// Bấm phong bì → mở flap → hiện thư
envelope.addEventListener("click", () => {
  envelope.classList.add("open");
  setTimeout(() => {
    envelope.classList.add("fade-out");
  }, 1000);
  setTimeout(() => {
    envelope.style.display = "none";
    letter.classList.remove("hidden");
    letter.classList.add("show");
  }, 1600);
});

// 🍓 Hiệu ứng dâu rơi
function createStrawberryRain() {
  const strawberry = document.createElement("img");
  strawberry.src = "https://cdn-icons-png.flaticon.com/512/590/590685.png"; // hình dâu PNG
  strawberry.classList.add("strawberry-fall");

  // Tạo kích thước và vị trí ngẫu nhiên
  const size = Math.random() * 20 + 20; // 20 - 40px
  strawberry.style.width = `${size}px`;
  strawberry.style.left = `${Math.random() * 100}%`;
  strawberry.style.animationDuration = `${Math.random() * 3 + 4}s`; // 4 - 7s
  strawberry.style.animationDelay = `${Math.random() * 2}s`;
  strawberry.style.filter = `drop-shadow(0 3px 4px rgba(255, 80, 120, 0.3))`;

  document.body.appendChild(strawberry);

  // Xóa khi kết thúc
  setTimeout(() => {
    strawberry.remove();
  }, 7000);
}

// Liên tục tạo dâu rơi
setInterval(createStrawberryRain, 600);
