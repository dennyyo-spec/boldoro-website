(function(){
  async function exists(url){
    try{
      const r = await fetch(url, {method:"HEAD", cache:"no-store"});
      return r.ok;
    }catch(e){ return false; }
  }

  async function applyLocalImages(){
    const imgs = document.querySelectorAll("img[data-local]");
    for(const img of imgs){
      const local = img.getAttribute("data-local");
      if(!local) continue;

      // 원래 링크 이미지는 절대 먼저 지우지 않는다.
      const original = img.getAttribute("src") || "";

      if(await exists(local)){
        img.src = local;
        img.classList.add("is-local");
        const paper = img.closest(".qual-paper");
        if(paper) paper.classList.add("has-local-image");
      }else{
        // 로컬 이미지가 없으면 맨 처음 연결된 외부 이미지를 그대로 사용
        if(original) img.src = original;
      }
    }
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", applyLocalImages);
  }else{
    applyLocalImages();
  }
})();