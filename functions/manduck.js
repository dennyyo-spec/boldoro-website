export async function onRequestGet(context) {
  const assetResponse = await context.env.ASSETS.fetch(
    new URL("/", context.request.url)
  );

  if (!assetResponse.ok) {
    return assetResponse;
  }

  let html = await assetResponse.text();

  const title =
    "볼도르 BOLDORO | 부산 만덕동 금거래소 · 금매입 · 골드바 · 주얼리";

  const description =
    "부산 북구 만덕동 BOLDORO 볼도르 주얼리 금거래소. 순금·18K·14K·골드바·치금·은 매입과 골드바 구매, 다이아몬드·주얼리 상담을 제공합니다.";

  const canonical = "https://boldoro.kr/manduck";

  // Make relative image/CSS/JS paths resolve from the site root
  // even when the visitor uses /manduck/.
  if (!/<base\s/i.test(html)) {
    html = html.replace(
      /<head(\s[^>]*)?>/i,
      (m) => `${m}\n<base href="/">`
    );
  }

  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${title}</title>`
  );

  html = html.replace(
    /(<meta\s+name=["']description["'][^>]*content=["'])[^"']*(["'][^>]*>)/i,
    `$1${description}$2`
  );

  html = html.replace(
    /(<meta\s+property=["']og:title["'][^>]*content=["'])[^"']*(["'][^>]*>)/i,
    `$1${title}$2`
  );

  html = html.replace(
    /(<meta\s+property=["']og:description["'][^>]*content=["'])[^"']*(["'][^>]*>)/i,
    `$1${description}$2`
  );

  html = html.replace(
    /(<meta\s+property=["']og:url["'][^>]*content=["'])[^"']*(["'][^>]*>)/i,
    `$1${canonical}$2`
  );

  html = html.replace(
    /(<link\s+rel=["']canonical["'][^>]*href=["'])[^"']*(["'][^>]*>)/i,
    `$1${canonical}$2`
  );

  const headers = new Headers(assetResponse.headers);
  headers.set("content-type", "text/html; charset=UTF-8");
  headers.set("cache-control", "public, max-age=0, must-revalidate");

  return new Response(html, {
    status: assetResponse.status,
    headers
  });
}
