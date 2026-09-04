(function(){
  async function exists(url){
    try{
      const r = await fetch(url, {method:"HEAD", cache:"no-store"});
      return r.ok;
    }catch(e){ return false; }
  }

  async function loadLocalImages(){
    const imgs = document.querySelectorAll("img[data-local]");
    for(const img of imgs){
      const local = img.getAttribute("data-local");
      if(local && await exists(local)) img.src = local;
    }

    const bgs = document.querySelectorAll("[data-bg-local][data-bg-var]");
    for(const el of bgs){
      const local = el.getAttribute("data-bg-local");
      const cssVar = el.getAttribute("data-bg-var");
      if(local && cssVar && await exists(local)){
        el.style.setProperty(cssVar, 'url("' + local + '")');
      }
    }
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", loadLocalImages);
  }else{
    loadLocalImages();
  }
})();