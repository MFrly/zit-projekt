"use strict";

/* ===== 1) Mobilní menu ===== */
(function () {
  const btn = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });
})();

/* ===== 2) Převodník stupnic (stránka stupnice.html) ===== */
(function () {
  const select = document.getElementById("font-grade");
  const out = document.getElementById("v-grade");
  const rows = document.querySelectorAll("#grade-table tbody tr");
  if (!select || !out) return;

  // Fontainebleau -> V-scale (orientační převod)
  const grades = [
    ["3", "VB"], ["4", "V0"], ["5", "V1"], ["5+", "V2"],
    ["6A", "V3"], ["6A+", "V3"], ["6B", "V4"], ["6B+", "V4"],
    ["6C", "V5"], ["6C+", "V5"], ["7A", "V6"], ["7A+", "V7"],
    ["7B", "V8"], ["7B+", "V8"], ["7C", "V9"], ["7C+", "V10"],
    ["8A", "V11"]
  ];

  grades.forEach(([f]) => select.add(new Option(f, f)));
  select.value = "6A";

  function update() {
    const found = grades.find(([f]) => f === select.value);
    out.textContent = found ? found[1] : "–";
    rows.forEach(r => r.classList.toggle("hl", r.dataset.font === select.value));
  }
  select.addEventListener("change", update);
  update();
})();

/* ===== 3) Validace formuláře (kontakt.html) ===== */
(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const rules = {
    name: v => v.trim().length >= 2 || "Zadejte jméno (alespoň 2 znaky).",
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || "Zadejte platný e-mail, např. jmeno@seznam.cz.",
    level: v => v !== "" || "Vyberte svou úroveň.",
    message: v => v.trim().length >= 10 || "Zpráva musí mít alespoň 10 znaků."
  };

  function check(field) {
    const result = rules[field.name](field.value);
    const err = document.getElementById("err-" + field.name);
    const ok = result === true;
    field.setAttribute("aria-invalid", String(!ok));
    err.textContent = ok ? "" : result;
    return ok;
  }

  form.querySelectorAll("input,select,textarea").forEach(f =>
    f.addEventListener("blur", () => check(f))
  );

  form.addEventListener("submit", e => {
    e.preventDefault();
    const status = document.getElementById("form-status");
    const allOk = [...form.elements].filter(f => rules[f.name]).map(check).every(Boolean);
    if (allOk) {
      status.className = "status ok";
      status.textContent = "Díky, " + form.name.value.trim() + "! Zpráva je připravená k odeslání (demo bez serveru).";
      form.reset();
    } else {
      status.className = "status";
      status.textContent = "Opravte prosím označená pole.";
    }
  });
})();

/* ===== 4) Tip dne (index.html) ===== */
(function () {
  const box = document.getElementById("daily-tip");
  if (!box) return;
  const tips = [
    "Nejdřív nohy: většina síly při boulderingu pochází z nohou, ne z rukou.",
    "Prohlédni si bloky ještě před lezením a vymysli pořadí chytů.",
    "Dopřej si mezi pokusy 2–3 minuty odpočinku, svaly se zotaví.",
    "Padej správně: do pokrčených nohou, nikdy na nataženou ruku.",
    "Zkus lézt pomalu a tiše – zlepší to kontrolu těla.",
    "Lezení na hranu prstů trénuj postupně, šlachy se adaptují déle než svaly."
  ];
  // Stejný tip celý den
  const day = Math.floor(Date.now() / 86400000);
  box.textContent = tips[day % tips.length];
})();
