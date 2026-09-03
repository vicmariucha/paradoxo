#!/usr/bin/env node
/**
 * One-time migration script — NOT part of the deployed site.
 *
 * This project was built in Lovable.dev. Every image (and the custom "Rosnoc"
 * display font) currently lives on Lovable's own asset CDN. The project used
 * to reference them only through small `*.asset.json` pointer files under
 * `src/assets/` (deleted from this cleaned-up copy — they only pointed at
 * Lovable's internal `/__l5e/assets-v1/...` proxy path, which 404s on any
 * host other than Lovable, including HostGator). The list of files below was
 * extracted from those manifests before they were removed.
 *
 * Run this ONCE, on a machine with normal internet access (Lovable's preview
 * host may not be reachable from every network), BEFORE building the site
 * for real deployment:
 *
 *   node scripts/download-lovable-assets.mjs
 *
 * It downloads the real file for each entry below straight into
 * `src/assets/<filename>` — exactly the filenames the app's source code
 * already imports directly (no more `.asset.json` / `.url` indirection), so
 * once this script succeeds you can just run the normal build.
 *
 * Safe to re-run: existing files are simply overwritten. If a particular
 * download fails permanently (e.g. Lovable has since deleted/archived the
 * project), the summary at the end lists exactly which files need to be
 * manually re-exported/saved from the Lovable editor (open the project at
 * https://lovable.dev/projects/987c8892-bed9-4854-8ed1-ba00f196ef53, find the
 * image, right-click -> Save Image As, and drop it at the path shown).
 *
 * Plain Node.js (18+), ESM, no extra dependencies — uses only built-in
 * fetch() and fs/promises.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, "..", "src", "assets");

const PROJECT_ID = "987c8892-bed9-4854-8ed1-ba00f196ef53";

// Every asset this project references, extracted from the original
// `*.asset.json` manifests (asset_id + the exact filename the source code
// imports under src/assets/).
const ASSETS = [
  { assetId: "b3e7d5bb-a6d4-4c4c-8b9b-edf211e265c4", filename: "Rosnoc.otf" },
  { assetId: "6a4d60d8-fbcb-4eef-9e14-30d2750be94b", filename: "backdrop-acaert-2018.jpg" },
  { assetId: "2e0eb9d9-1f27-46c6-a587-0a13cdb2ea46", filename: "brinde-cartao-fio-dental-araruna.jpg" },
  { assetId: "bc64caff-8b8b-42d5-9639-c652a65355be", filename: "brinde-cartao-fio-dental-cmk.jpg" },
  { assetId: "a1db856a-0c0f-44ca-b7af-12441b16a388", filename: "brinde-firma-silva-2.jpeg" },
  { assetId: "346f37f4-293f-4a2f-abdf-2a5fe4511a05", filename: "brinde-firma-silva.jpeg" },
  { assetId: "c34cbfca-21b7-4d0d-aff1-e2eed7ccef2d", filename: "brinde-r5.jpeg" },
  { assetId: "1122f841-c231-42fc-98c6-0e31b30d8387", filename: "brinde-yva.jpeg" },
  { assetId: "bc8dfe2d-eacf-45da-9027-374b0d284e8c", filename: "caderno-empresarial-digcont.jpg" },
  { assetId: "f9ea88e8-01d0-4921-b730-944e377492ea", filename: "caixa-papelao-modular.jpg" },
  { assetId: "dc7bd611-91b2-4c7b-abe4-9069a996c37e", filename: "calendario-fs-contabil.jpg" },
  { assetId: "a116473c-0e0e-4aa2-8777-28d28ec7d01b", filename: "camiseta-custom-body.jpg" },
  { assetId: "1c6930a5-31ee-437b-9a41-41dae7d1ccc8", filename: "campanhas-de-performance-2.jpeg" },
  { assetId: "4ca7d454-17cf-4dab-b627-78c614206ef5", filename: "caneta-personalizada-gg.jpg" },
  { assetId: "4a8d127b-cd7b-4507-8d52-90fcd7ceda81", filename: "capa-ctps-fs-contabil.jpg" },
  { assetId: "9c657032-8987-4de6-b070-4a4b5e8ca6e0", filename: "cartao-corte-especial-kaluna-bulls.jpg" },
  { assetId: "9a53f893-ba5e-40a3-9e83-1eff1f503e0e", filename: "cartao-corte-especial-ladies.jpg" },
  { assetId: "1abeb90a-5b0e-4226-92d8-c117d304530c", filename: "cartao-corte-especial-renova.jpg" },
  { assetId: "3a728fc2-6858-4d62-8046-9861a8481668", filename: "cartao-jessica-alencar.jpg" },
  { assetId: "68f34a5d-3814-44fb-afc1-4c9785a2a656", filename: "cartao-modular.jpg" },
  { assetId: "d6d39051-9afe-4d39-93d8-16022b53c493", filename: "catalogo-elpak.jpg" },
  { assetId: "0b93f323-fb3a-4f98-af9b-15d92ab89073", filename: "catalogo-inoxfer.jpg" },
  { assetId: "1f532104-ff72-414d-8b20-fce2705ba291", filename: "catalogo-institucional.jpeg" },
  { assetId: "6733e586-71b9-418e-8e1d-727b30dcae15", filename: "catalogo-jopak.jpg" },
  { assetId: "25237b89-ee06-4805-9bf5-89eee1e803a3", filename: "catalogo-metta.jpg" },
  { assetId: "260c73fc-842d-42fe-b3b2-623f2d24097e", filename: "catalogo-pro.jpg" },
  { assetId: "810f24bb-35db-4e24-8488-8de33ae2b3ea", filename: "conteudo-seo-2.jpeg" },
  { assetId: "2ea242b9-7a91-48f5-a2f7-183625837133", filename: "convite-caneta-iwm.jpg" },
  { assetId: "ec298039-de41-4d3d-a3f2-ed8730bfd90d", filename: "cracha-eventos-citin.jpg" },
  { assetId: "8fc6dec4-490c-49c6-865c-ab658efc866b", filename: "cta-home.jpg" },
  { assetId: "f491d99a-3217-46aa-a832-9fa188faa405", filename: "embalagem-balde-tinta-wall-collors-2.jpg" },
  { assetId: "ba2c5fa3-ca1b-4389-b5ae-dd72b7c27fb1", filename: "embalagem-balde-tinta-wall-collors.jpg" },
  { assetId: "4d6b2c52-4c9e-4a3b-b760-ae107b8178f5", filename: "embalagem-caixa-projeto.jpg" },
  { assetId: "7f203b22-fcff-4846-a001-b6907e7c1f88", filename: "embalagem-pomada-million.jpg" },
  { assetId: "54c14fe8-6506-4178-9ed6-2970caa3299d", filename: "embalagem-saco-gesso-gm.jpg" },
  { assetId: "9003e2f4-f9dd-4c99-a06d-0c1d5c134a63", filename: "embalagens-de-assinatura.jpeg" },
  { assetId: "d47d4649-529b-47c7-b4b1-45a63a223b70", filename: "envelope-alessandra.jpg" },
  { assetId: "7eb3af76-9842-4acd-b747-9b516ebaa7db", filename: "envelope-allide.jpg" },
  { assetId: "7841fa40-6a4f-44c3-9a22-21b66f53d42b", filename: "envelope-ana.jpg" },
  { assetId: "7dd89c60-040a-4759-b612-234472980b96", filename: "envelope-jopak.jpg" },
  { assetId: "9a323a41-8f6b-41ae-ae44-e7a59c99e555", filename: "envelope-oficio-alessandra.jpg" },
  { assetId: "48a97db1-d188-49d1-8a8a-03662efb0812", filename: "envelope-oficio-allide.jpg" },
  { assetId: "b94bf43c-b0e4-4ca0-942f-df8323c36cd8", filename: "envelope-oficio-inova.jpg" },
  { assetId: "5713a33d-b20f-4861-8ee4-61326b44cd6a", filename: "envelope-oficio-jopak.jpg" },
  { assetId: "3cfd2409-cfd5-47eb-8667-68497e55d050", filename: "envelope-oficio-renova.jpg" },
  { assetId: "8b7903cd-d6aa-4070-a1ea-7e4fd92cbfe8", filename: "envelope-oficio-sheila.jpg" },
  { assetId: "f19c6499-27ba-4df3-beb8-5fc9d3031ebb", filename: "folder-dobra-cmk.jpeg" },
  { assetId: "ac697d23-43f2-40e9-bf82-7531ac8cd57c", filename: "folder-multiplas-dobras-homeo-ervas.jpeg" },
  { assetId: "981ef536-c240-4e58-bfad-ccd5a45bc21e", filename: "garrafa-termica-cmk.jpg" },
  { assetId: "a3d172f4-4f42-400e-9e9e-21b73cbb47ba", filename: "hero-poster.jpg" },
  { assetId: "d8e440cb-e7ee-4fe3-a0e8-1a9756d3d39e", filename: "hero-section-background.mp4" },
  { assetId: "2a620df1-17e5-48bf-8e2a-14864853870b", filename: "home-design.jpeg" },
  { assetId: "e103e49d-ef70-4a7e-9564-df360a280b23", filename: "home-identidade-visual.jpeg" },
  { assetId: "a9f0f1de-61bf-4479-918a-34fdb3616fad", filename: "home-impressos.jpeg" },
  { assetId: "04dd2c52-3e50-47d5-8c58-5404c25a0e5a", filename: "home-material-para-evento.jpeg" },
  { assetId: "48d0fd6b-c22a-4112-9523-7998aae2cf5c", filename: "home-papelaria-de-escritorio.jpeg" },
  { assetId: "290c40db-366f-470b-9103-588f752c70a6", filename: "home-portfolio-completo.jpeg" },
  { assetId: "9c9f08d5-e5a7-4921-9fd5-958443f06308", filename: "identidade-e-branding-2.jpeg" },
  { assetId: "6c4116f5-cd87-4b8f-806f-c2d05ac97abe", filename: "identidade-visual-alessandra-nuzzo.jpg" },
  { assetId: "16b58183-91d1-4475-806f-1b0378759974", filename: "identidade-visual-allide.jpg" },
  { assetId: "753eba0a-88ed-49b5-972c-25858768aa2f", filename: "identidade-visual-araruna-odontologia.jpg" },
  { assetId: "da9cbc56-38ef-4c99-860e-6e065da4da33", filename: "identidade-visual-ard.jpg" },
  { assetId: "5a578a60-71c3-4222-9b5d-e992bed2e80f", filename: "identidade-visual-assembleia-de-deus.jpg" },
  { assetId: "fe564455-bedd-4c3f-a3bf-1740a36e81ef", filename: "identidade-visual-avance-ferramentas.jpg" },
  { assetId: "55479df5-9464-4a5e-9f63-55378ed859a9", filename: "identidade-visual-belt.jpg" },
  { assetId: "f845c998-4971-4859-9f56-b7554c1004ae", filename: "identidade-visual-bike-mecanico.jpg" },
  { assetId: "327d4ff5-9204-4f01-866e-5f053c4216e0", filename: "identidade-visual-bracustica.jpg" },
  { assetId: "1fd1a105-7df3-4395-a73b-efafacfde4e6", filename: "identidade-visual-casa-das-brocas.jpg" },
  { assetId: "7b789440-dc46-47c0-876b-745afb582a01", filename: "identidade-visual-cmk.jpg" },
  { assetId: "f0aa01c3-0dfc-4439-9efc-51725dd28272", filename: "identidade-visual-cp-viagens.jpg" },
  { assetId: "1a3a03b4-3e06-4ee7-8689-a74b5827094e", filename: "identidade-visual-cultura-da-graca.jpg" },
  { assetId: "bdaf4540-0ca4-49b8-aefc-c90cea9a581e", filename: "identidade-visual-custom-body.jpg" },
  { assetId: "58405027-df0b-41a8-a6c0-a0fc7b214327", filename: "identidade-visual-digcont.jpg" },
  { assetId: "6f8b5ac5-93b9-4f20-808b-baa5cc903544", filename: "identidade-visual-eita-trem-bao.jpg" },
  { assetId: "9f321522-8d62-4278-bab7-8cc1359dce2c", filename: "identidade-visual-firmo-silva.jpg" },
  { assetId: "ced5c399-370b-415b-bc3a-9be59f86db4a", filename: "identidade-visual-flori-sorvetes.jpg" },
  { assetId: "bad0fd47-d87b-444d-b2e2-135390ecdf81", filename: "identidade-visual-kitchens-by-teresinha.jpg" },
  { assetId: "6a93ff60-dbf3-488a-a497-661f57fb8cb8", filename: "identidade-visual-legajo.jpg" },
  { assetId: "53d8f50e-c043-4d06-a1d0-0520be0bf392", filename: "identidade-visual-marinho-contabil.jpg" },
  { assetId: "1ea77721-317b-46fc-aaff-928dc8173a37", filename: "identidade-visual-mcm.jpg" },
  { assetId: "c2c94851-8ec3-457e-901d-10e614e4b9c1", filename: "identidade-visual-modular-moveis.jpg" },
  { assetId: "8b12cafe-8c57-4970-b150-7c5d68bb80a7", filename: "identidade-visual-mp-arruelas.jpg" },
  { assetId: "ae6c9ec3-adb6-44c8-a645-469ad0c82896", filename: "identidade-visual-nutreessencia.jpg" },
  { assetId: "e8036daa-2bc5-4581-b0ae-9efe64e3d6f5", filename: "identidade-visual-pro-hound.jpg" },
  { assetId: "4e7f8af3-254f-427d-92a5-412ae5e137cd", filename: "identidade-visual-r5.jpg" },
  { assetId: "21743ce5-99eb-4d42-88d7-b2a04d06a720", filename: "identidade-visual-renova-sun.jpg" },
  { assetId: "cd06babe-473c-4fa6-a0b2-f43fbfcff392", filename: "identidade-visual-vaz-odontologia.jpg" },
  { assetId: "45f719bc-d97c-4996-ae5c-2004dd5dd4ab", filename: "identidade-visual-vrm-construcao.jpg" },
  { assetId: "52d83a9b-9bc1-431a-b948-1b69705b80c7", filename: "identidade-visual-xavier-advocacia.jpg" },
  { assetId: "a2756206-5cbc-4d2d-bdb5-b0c61dfee220", filename: "identidade-visual-yva-joias.jpg" },
  { assetId: "357cf2cd-bf78-422f-9caa-56bf59041621", filename: "impressao-grafica-estrutura.jpg" },
  { assetId: "f871640f-3e3c-4466-944e-253a9fa7eecb", filename: "impressoes-especiais-ezcopy.jpeg" },
  { assetId: "f2b197d8-a740-49cc-9232-ed8467f250a7", filename: "impressoes-especiais-fs-contabil.jpeg" },
  { assetId: "364219f9-1c0e-4e85-9345-4d8bba686f22", filename: "impressoes-especiais-le-boutique.jpeg" },
  { assetId: "77093129-bcb6-415e-90c4-11db1ac3b4d8", filename: "impressoes-especiais-may-lui.jpeg" },
  { assetId: "73c9f2a8-394f-4860-8c89-f124de03a968", filename: "impressoes-especiais-rafit.jpeg" },
  { assetId: "e38ddf8b-948e-4de0-a6a1-7a78cf44f497", filename: "impressos-paradoxo.jpg" },
  { assetId: "37204bff-a5e0-4458-81d1-93cf5bac87b6", filename: "kit-corporativo.jpeg" },
  { assetId: "156a757a-fb74-4416-80a2-654191d1f7f1", filename: "marketing-estrutura.jpg" },
  { assetId: "8242ca09-4971-4f47-a1dc-364c4616320f", filename: "material-informacional-firmo-silva.jpeg" },
  { assetId: "cd9060da-02a1-43cf-911b-ec9e7bbaa53e", filename: "material-informacional-lcma.jpeg" },
  { assetId: "f02c0e50-13b4-486a-b575-f1730a1dbccd", filename: "papel-timbrado-alessandra.jpg" },
  { assetId: "12822e2f-d614-4b20-8d79-530859c33542", filename: "papel-timbrado-conforma.jpg" },
  { assetId: "74130e26-0763-49d4-9cda-81777bd23db0", filename: "papel-timbrado-credivic.jpg" },
  { assetId: "e4f6f8f1-dee5-4f70-88c5-2dd0c8d4aa8b", filename: "papel-timbrado-digcont.jpg" },
  { assetId: "901b9f8e-4240-40f3-92f0-66dd2acbc3bf", filename: "papel-timbrado-ecoga.jpg" },
  { assetId: "8310c55d-66f0-4919-a0da-40ea39bcc247", filename: "papel-timbrado-inova.jpg" },
  { assetId: "d8d5f082-41bf-4c72-9fa6-c3c2e7efd62c", filename: "pasata-alide.jpg" },
  { assetId: "acab9669-6330-425a-bd7e-6158e9343fb4", filename: "pasta-alessandra-nuzzo.jpg" },
  { assetId: "87b9b61e-2e21-4258-9b92-46cce6dd463e", filename: "pasta-banaldi.jpeg" },
  { assetId: "eca105d2-d415-4511-aee7-6bc156cd5aca", filename: "pasta-jopak.jpg" },
  { assetId: "f62bb2d5-6907-433d-916e-7f439c339e30", filename: "pasta-linsborsatti.jpg" },
  { assetId: "12f6abe8-d695-4ed4-b569-6d02de786378", filename: "pasta-metta.jpg" },
  { assetId: "31fb8e95-1f44-4ac8-9d86-3c92bbe45698", filename: "pasta-renova.jpg" },
  { assetId: "fd615903-d6ac-445f-a43f-a01a3c5dbb19", filename: "presenca-institucional-2.jpeg" },
  { assetId: "1b293134-03d5-4d5c-97e3-6a00c0ac6cbe", filename: "producoes-de-projetos.jpeg" },
  { assetId: "3db3eefd-0df2-487e-b99e-e7fb1adb70f0", filename: "produto-ezcopy.jpeg" },
  { assetId: "916fc91f-76e0-4489-919c-4e383403d23c", filename: "rotulo-criarte.jpeg" },
  { assetId: "0641b75f-bd63-459f-aabd-d41742a06419", filename: "sacola-ladies.jpeg" },
  { assetId: "2afb198e-2814-4756-987c-1b428bc8a30b", filename: "sacola-le-boutique.jpeg" },
  { assetId: "1061df5f-cdb8-4db0-b0d3-71f49bc9f96e", filename: "sacola-yva.jpeg" },
  { assetId: "94ebf231-99ac-4ec1-9fe3-5569e53f65a6", filename: "sacola.jpeg" },
  { assetId: "daf02730-6d7b-45e1-9768-fa904bdfac3b", filename: "showcase-financas-v2.png" },
  { assetId: "2f00c131-6ce4-4fd9-a9d1-c790727960d3", filename: "showcase-impressos-v2.png" },
  { assetId: "7389c325-d782-40ff-b8f2-a670ba19c252", filename: "showcase-marketing-v2.png" },
  { assetId: "40600616-d2b3-4de8-816c-e2f014724245", filename: "stand-feira-jopak.jpg" },
  { assetId: "e80fe730-2308-4826-a6fe-003223091eff", filename: "suporte-financas-estrutura.jpg" },
  { assetId: "6b7aa484-5022-4bd3-8109-5c8761cd73c2", filename: "wind-banner-homeo.jpg" },
  { assetId: "27e27976-b5f3-417e-91d9-9f66194c3316", filename: "wind-banner-lion.jpg" },
];

function lovableAssetUrl(assetId, filename) {
  // Lovable's preview-sandbox host serves an id-preview subdomain per
  // project, proxying to its internal asset CDN under this fixed path shape.
  return `https://id-preview--${PROJECT_ID}.lovable.app/__l5e/assets-v1/${assetId}/${encodeURIComponent(filename)}`;
}

async function downloadTo(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(destPath), { recursive: true });
  await writeFile(destPath, buf);
  return buf.length;
}

async function main() {
  console.log(`Downloading ${ASSETS.length} asset(s) into ${ASSETS_DIR}\n`);

  const failures = [];
  let successCount = 0;

  for (const { assetId, filename } of ASSETS) {
    const url = lovableAssetUrl(assetId, filename);
    const destPath = join(ASSETS_DIR, filename);

    try {
      const size = await downloadTo(url, destPath);
      console.log(`[OK]   ${filename} (${size} bytes)`);
      successCount++;
    } catch (err) {
      console.error(`[FAIL] ${filename}: ${err.message} (${url})`);
      failures.push({ filename, url, reason: err.message });
    }
  }

  console.log(`\nDone: ${successCount}/${ASSETS.length} downloaded successfully.`);

  if (failures.length > 0) {
    console.log(`\n${failures.length} file(s) failed to download automatically:`);
    for (const f of failures) {
      console.log(`  - ${f.filename}: ${f.reason}`);
    }
    console.log(
      "\nFor any failed file, open the project in the Lovable editor",
      "(https://lovable.dev/projects/987c8892-bed9-4854-8ed1-ba00f196ef53)",
      "and manually save/export the image (right-click -> Save Image As, or",
      "the editor's asset panel), then place it at src/assets/<filename> as",
      "shown above.",
    );
    process.exitCode = 1;
  } else {
    console.log("\nAll assets recovered. You can now run the normal production build.");
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exitCode = 1;
});
