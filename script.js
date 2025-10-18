// === Ý TƯỞNG 1: LOADER "ĐANG TẢI TÌNH YÊU" ===
const loader = document.getElementById("loader");
const passwordGate = document.getElementById("password-gate");
const mainScene = document.getElementById("main-scene");

// Bắt đầu với Loader
window.addEventListener("load", () => {
  // Giả lập thời gian tải (2.5 giây)
  setTimeout(() => {
    loader.classList.add("fade-out");
    setTimeout(() => {
      loader.style.display = "none";
      // Hiện Cổng Mật Khẩu
      passwordGate.classList.remove("hidden");
      passwordGate.style.opacity = 1;
    }, 800); // Khớp với 0.8s của fade-out
  }, 2500); // 2.5 giây
});

// === LOGIC MẬT KHẨU ===
const passwordInput = document.getElementById("password-input");
const passwordButton = document.getElementById("password-button");

const SECRET_PASSWORD = "mybluemango"; // (Mật khẩu của bạn)

passwordButton.addEventListener("click", () => {
  if (passwordInput.value.toLowerCase() === SECRET_PASSWORD) {
    // ĐÚNG MẬT KHẨU
    passwordGate.classList.add("fade-out");
    setTimeout(() => {
      passwordGate.style.display = "none";
      mainScene.classList.remove("hidden");
      mainScene.classList.add("show");
    }, 800);
  } else {
    // SAI MẬT KHẨU
    passwordInput.classList.add("shake");
    passwordInput.value = "";
    passwordInput.placeholder = "Sai rồi! Thử lại đi Dâu 🍓";
    setTimeout(() => {
      passwordInput.classList.remove("shake");
    }, 500);
  }
});

// === CODE CŨ BẮT ĐẦU TỪ ĐÂY ===

const giftBox = document.querySelector(".gift-box");
const glow = document.querySelector(".glow");
const envelopeScene = document.getElementById("envelope-scene");

// === SỰ KIỆN CLICK HỘP QUÀ ===
giftBox.addEventListener(
  "click",
  () => {
    const music = document.getElementById("background-music");
    music.volume = 0.5;
    music.play();
    giftBox.classList.add("open");
    glow.classList.add("open");
    setTimeout(() => giftBox.classList.add("fade-out"), 1500);
    setTimeout(() => {
      giftBox.style.display = "none";
      glow.style.display = "none";
      envelopeScene.classList.remove("hidden");
      envelopeScene.style.opacity = 1; // Animation "fly-in" (Ý tưởng 2) sẽ tự kích hoạt
    }, 2200);
  },
  { once: true }
);

// === LOGIC VALIDATE PHONG BÌ ===
const allWrappers = document.querySelectorAll(".envelope-wrapper");
let openedImageLetters = 0;

const totalImageLetters = Array.from(allWrappers).filter((wrapper) => {
  const content = wrapper.querySelector(".letter-content");
  return content && !content.classList.contains("letter-wish");
}).length;

allWrappers.forEach((wrapper) => {
  const envelope = wrapper.querySelector(".envelope");
  const letterContent = wrapper.querySelector(".letter-content");
  if (!envelope || !letterContent) return;

  const isFinalLetter = letterContent.classList.contains("letter-wish");

  if (isFinalLetter) {
    envelope.addEventListener("click", () => {
      if (openedImageLetters === totalImageLetters) {
        openEnvelope(envelope, letterContent);
      } else {
        envelope.classList.add("shake");
        setTimeout(() => envelope.classList.remove("shake"), 500);
      }
    });
  } else {
    envelope.addEventListener(
      "click",
      () => {
        openEnvelope(envelope, letterContent);
        openedImageLetters++;
      },
      { once: true }
    );
  }
});

/**
 * Hàm trợ giúp để mở một phong bì
 */
function openEnvelope(envelope, letterContent) {
  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

  const clickText = envelope.querySelector(".click-me-text");
  if (clickText) clickText.classList.add("fade-out");

  envelope.classList.add("open");
  setTimeout(() => envelope.classList.add("fade-out"), 600);
  setTimeout(() => {
    envelope.style.display = "none";
    letterContent.classList.remove("hidden");
    letterContent.classList.add("show");

    if (letterContent.classList.contains("letter-wish")) {
      letterContent.style.cursor = "pointer";
      letterContent.addEventListener(
        "click",
        () => {
          envelopeScene.classList.add("fade-out");
          setTimeout(() => {
            const finalScene = document.getElementById("final-scene");
            const finalTitle = document.getElementById("final-title");
            const finalSubtitle = document.getElementById("final-subtitle");

            finalScene.classList.remove("hidden");
            finalScene.style.opacity = 1;

            typeWriter(finalTitle, "  🥰Your Blue Mango💖", 150, () => {
              typeWriter(finalSubtitle, "Cảm ơn Pé đã xem hết!", 75);
            });
          }, 800);
        },
        { once: true }
      );
    }
  }, 1200);
}

// === HIỆU ỨNG DÂU RƠI ===
function createStrawberryRain() {
  const strawberry = document.createElement("img");
  strawberry.src = "https://cdn-icons-png.flaticon.com/512/590/590685.png";
  strawberry.classList.add("strawberry-fall");
  const size = Math.random() * 20 + 20;
  strawberry.style.width = `${size}px`;
  strawberry.style.left = `${Math.random() * 100}%`;
  strawberry.style.animationDuration = `${Math.random() * 3 + 4}s`;
  strawberry.style.animationDelay = `${Math.random() * 2}s`;
  strawberry.style.filter = `drop-shadow(0 3px 4px rgba(255, 80, 120, 0.3))`;
  document.body.appendChild(strawberry);
  setTimeout(() => strawberry.remove(), 7000);
}
setInterval(createStrawberryRain, 600);

// === HÀM GÕ CHỮ ===
function typeWriter(element, text, delay, callback) {
  let i = 0;
  element.innerHTML = "";
  element.style.width = "auto";
  element.style.display = "inline-block";
  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, delay);
    } else {
      element.style.borderRight = "none";
      if (callback) callback();
    }
  }
  typing();
}

// === Ý TƯỞNG 3: HIỆU ỨNG 3D TILT ===
const tiltElements = document.querySelectorAll(".tilt-effect");

tiltElements.forEach((element) => {
  element.addEventListener("mousemove", (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateY = (x / (rect.width / 2)) * 10; // Nghiêng 10 độ
    const rotateX = (-y / (rect.height / 2)) * 10; // Nghiêng 10 độ

    element.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
  });

  element.addEventListener("mouseleave", () => {
    // Reset về trạng thái cũ
    element.style.transform =
      "perspective(1000px) rotateY(0) rotateX(0) scale(1)";
  });
});
