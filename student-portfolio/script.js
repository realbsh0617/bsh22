// ===== 내비게이션 메뉴 클릭 시 부드러운 이동 =====
// (CSS의 scroll-behavior: smooth와 함께 동작하며, 고정 헤더 높이를 보정)
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll('.nav-menu a, a[href^="#"]');
  // 플로팅 내비게이션(top 18px + 높이 64px)에 맞춘 오프셋
  const headerHeight = 96;

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");

      // 페이지 내 앵커(#으로 시작)만 처리
      if (!targetId || targetId.charAt(0) !== "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();

      const elementPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });

  // ===== 스크롤 시 현재 섹션 메뉴 활성화 =====
  const sections = document.querySelectorAll("section[id]");
  const menuLinks = document.querySelectorAll(".nav-menu a");

  function highlightActiveMenu() {
    let currentSectionId = "";
    const scrollPosition = window.pageYOffset + headerHeight + 10;

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPosition) {
        currentSectionId = section.getAttribute("id");
      }
    });

    menuLinks.forEach(function (link) {
      link.style.color = "";
      link.style.background = "";
      if (link.getAttribute("href") === "#" + currentSectionId) {
        link.style.color = "#a83232";
        link.style.background = "rgba(240, 138, 114, 0.18)";
      }
    });
  }

  window.addEventListener("scroll", highlightActiveMenu);
  highlightActiveMenu();

  // ===== Contact 폼 제출 처리 (예시) =====
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        formMessage.style.color = "#c0392b";
        formMessage.textContent = "모든 항목을 입력해 주세요.";
        return;
      }

      formMessage.style.color = "#a83232";
      formMessage.textContent =
        "감사합니다, " + name + "님! 메시지가 전송되었습니다. (예시)";

      contactForm.reset();
    });
  }
});