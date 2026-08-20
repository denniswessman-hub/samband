import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished learning platform", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Sambandslabbet/i);
  assert.match(html, /Från terminal till/);
  assert.match(html, /<b>10<\/b> moduler/);
  assert.match(html, /Övningslabb/);
  assert.match(html, /källmaterial/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("ships the complete course structure without publishing source files", async () => {
  const [content, page, talkgroupLab, imageSupport, layout, sourceNames, publicNames, sourceImageNames, builtImageNames, builtNames, socialImage] = await Promise.all([
    readFile(new URL("../app/content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/talkgroup-lab.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/image-support.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readdir(new URL("../källmaterial/", import.meta.url)),
    readdir(new URL("../public/", import.meta.url)),
    readdir(new URL("../public/source-images/", import.meta.url)),
    readdir(new URL("../docs/source-images/", import.meta.url)),
    readdir(new URL("../docs/", import.meta.url)),
    stat(new URL("../public/og.png", import.meta.url)),
  ]);

  assert.equal((content.match(/number: "\d{2}"/g) ?? []).length, 10);
  assert.equal((content.match(/question: "/g) ?? []).length, 30);
  assert.match(page, /localStorage/);
  assert.match(page, /PracticeLab/);
  assert.match(page, /TalkgroupLab/);
  assert.match(page, /ImageSupportLibrary/);
  assert.match(page, /SourceLibrary/);
  assert.equal((talkgroupLab.match(/sourceNote: "/g) ?? []).length, 5);
  assert.match(talkgroupLab, /Navigering talgrupper, sida 6/);
  assert.match(talkgroupLab, /Mappar och talgruppsträd HT2025/);
  assert.equal((imageSupport.match(/number: "0[1-4]"/g) ?? []).length, 4);
  assert.match(imageSupport, /knappologi och display-1\.pdf/);
  assert.match(imageSupport, /Polman\.pdf/);
  assert.match(imageSupport, /Navigering talgrupper\.pdf/);
  assert.match(layout, /openGraph/);
  assert.equal(sourceNames.length, 63);
  assert.equal(sourceNames.filter((name) => name.toLowerCase().endsWith(".pdf")).length, 61);
  assert.equal(sourceNames.filter((name) => name.toLowerCase().endsWith(".pptx")).length, 2);
  assert.ok(!publicNames.some((name) => /\.pdf$|\.pptx$/i.test(name)));
  assert.equal(sourceImageNames.length, 6);
  assert.deepEqual(builtImageNames.sort(), sourceImageNames.sort());
  assert.ok(!builtNames.some((name) => /\.pdf$|\.pptx$/i.test(name)));
  assert.ok(socialImage.size > 500_000);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
});
