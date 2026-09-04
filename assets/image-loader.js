(function () {
  function imageExists(url) {
    return new Promise((resolve) => {
      const test = new Image();
      test.onload = function () {
        resolve(test.naturalWidth > 0 && test.naturalHeight > 0);
      };
      test.onerror = function () {
        resolve(false);
      };
      test.src = url + (url.includes("?") ? "&" : "?") + "_check=" + Date.now();
    });
  }

  async function applyLocalImages() {
    // 일반 이미지:
    // 로컬 파일이 실제 이미지로 정상 로드될 때만 교체합니다.
    // 없거나 HTML/404 응답이면 기존 외부 링크 이미지를 그대로 유지합니다.
    const imgs = document.querySelectorAll("img[data-local]");

    for (const img of imgs) {
      const local = img.getAttribute("data-local");
      if (!local) continue;

      const ok = await imageExists(local);
      if (ok) {
        img.src = local;
        img.classList.add("is-local");

        const paper = img.closest(".qual-paper");
        if (paper) paper.classList.add("has-local-image");
      }
    }

    // CSS 배경 이미지도 같은 방식으로 실제 이미지가 있을 때만 교체합니다.
    const bgs = document.querySelectorAll("[data-bg-local][data-bg-var]");

    for (const el of bgs) {
      const local = el.getAttribute("data-bg-local");
      const cssVar = el.getAttribute("data-bg-var");
      if (!local || !cssVar) continue;

      const ok = await imageExists(local);
      if (ok) {
        el.style.setProperty(cssVar, 'url("' + local + '")');
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyLocalImages);
  } else {
    applyLocalImages();
  }
})();