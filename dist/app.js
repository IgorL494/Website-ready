"use strict";
const config = window.WEBSITE_READY_CONFIG;
document
  .querySelectorAll("[data-brand]")
  .forEach((el) => (el.textContent = config.brandName));
document
  .querySelectorAll("[data-legal]")
  .forEach((el) => (el.textContent = config.legalName));
const formatPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: config.currency,
  maximumFractionDigits: 0,
});
document
  .querySelectorAll("[data-price]")
  .forEach((el) => (el.textContent = formatPrice.format(config.price)));
document.querySelector('meta[property="og:description"]').content =
  `A professional website built for your local business. Preview it before you buy. ${formatPrice.format(config.price)} one-time.`;
document.querySelector('meta[name="description"]').content =
  `Professional websites for local businesses. See your personalized website before you buy. ${formatPrice.format(config.price)} one-time. We build first. You decide second.`;
document.getElementById("year").textContent = new Date().getFullYear();
const nav = document.querySelector("nav");
const menu = document.querySelector(".menu-toggle");
function closeMenu() {
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", "Open navigation");
}
menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
});
nav
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("open")) {
    closeMenu();
    menu.focus();
  }
});
// Dismiss the compact menu when moving back into the page or to desktop.
document.addEventListener("click", (event) => {
  if (!event.target.closest("header")) closeMenu();
});
matchMedia("(min-width: 961px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

function safeUrl(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
const getDialog = document.getElementById("get-dialog");
document.querySelectorAll("[data-get]").forEach((button) =>
  button.addEventListener("click", () => {
    closeMenu();
    const destination = safeUrl(config.checkoutUrl) || safeUrl(config.leadUrl);
    if (destination) {
      window.location.assign(destination);
    } else {
      getDialog.showModal();
    }
  }),
);
document
  .querySelectorAll(".close-dialog")
  .forEach((button) =>
    button.addEventListener("click", () => button.closest("dialog").close()),
  );
document.querySelectorAll("dialog").forEach((dialog) =>
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        dialog.close();
    }
  }),
);
document.getElementById("browse-examples").addEventListener("click", () => {
  getDialog.close();
  document.getElementById("examples").scrollIntoView({
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
  document.querySelector("[data-demo]").focus({ preventScroll: true });
});
const footer = document.getElementById("footer-links");
function addLink(label, url) {
  const a = document.createElement("a");
  a.textContent = label;
  a.href = url;
  footer.append(a);
}
if (config.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email))
  addLink(config.email, "mailto:" + config.email);
if (config.phone)
  addLink(config.phone, "tel:" + config.phone.replace(/[^+\d]/g, ""));
if (safeUrl(config.privacyUrl))
  addLink("Privacy Policy", safeUrl(config.privacyUrl));
if (safeUrl(config.termsUrl)) addLink("Terms", safeUrl(config.termsUrl));
config.socialLinks.forEach((link) => {
  if (safeUrl(link.url)) addLink(link.label, safeUrl(link.url));
});
const demos = {
  washing: {
    name: "Clearline · Pressure washing",
    heading: "A cleaner home starts outside.",
    body: "From the front walk to the back patio, a thoughtful clean brings the details of your home back into view.",
    services: [
      ["House washing", "A fresh look for siding and exterior surfaces."],
      ["Driveways & walkways", "Care for the paths you use every day."],
      ["Patios & outdoor spaces", "Make more of your time outside."],
    ],
  },
  landscape: {
    name: "Everfield · Landscape & lawn",
    heading: "An outdoor space that feels like home.",
    body: "A welcoming front yard. A quiet corner in the garden. A landscape shaped around the way you live.",
    services: [
      [
        "Landscape design",
        "Considered spaces, from the first idea to the finishing touches.",
      ],
      ["Lawn care", "Care and attention for a lawn you can enjoy."],
      ["Seasonal upkeep", "Thoughtful maintenance as the seasons change."],
    ],
  },
  detailing: {
    name: "Forma · Mobile detailing",
    heading: "Care you can see. A finish you can feel.",
    body: "A considered approach to your vehicle, inside and out. Rediscover the details that made you love your car in the first place.",
    services: [
      ["Interior detail", "Attention to the surfaces you see and touch."],
      ["Exterior care", "A clean, considered finish for every drive."],
      ["Finishing touches", "Detail-focused care, from wheels to windows."],
    ],
  },
};
const demoDialog = document.getElementById("demo-dialog");
const canvas = document.getElementById("demo-canvas");
document.querySelectorAll("[data-demo]").forEach((button) =>
  button.addEventListener("click", () => {
    const demo = demos[button.dataset.demo];
    document.getElementById("demo-title").textContent = demo.name;
    canvas.replaceChildren(button.querySelector(".sample").cloneNode(true));
    canvas.dataset.theme = button.dataset.demo;
    const extra = document.createElement("section");
    extra.className = "demo-extra";
    extra.id = "demo-services-section";
    extra.tabIndex = -1;
    const h = document.createElement("h4");
    h.textContent = demo.heading;
    extra.append(h);
    const p = document.createElement("p");
    p.textContent = demo.body;
    extra.append(p);
    const services = document.createElement("div");
    services.className = "demo-services";
    demo.services.forEach(([name, description]) => {
      const item = document.createElement("div");
      const title = document.createElement("h5");
      title.textContent = name;
      const text = document.createElement("p");
      text.textContent = description;
      item.append(title, text);
      services.append(item);
    });
    extra.append(services);
    canvas.append(extra);
    // A real in-preview action, without implying a booking or lead submission.
    const originalCta = canvas.querySelector(".sample-cta");
    const sampleCta = document.createElement("button");
    sampleCta.type = "button";
    sampleCta.className = "sample-cta";
    sampleCta.textContent = originalCta.textContent;
    sampleCta.setAttribute("aria-label", "Explore sample services");
    sampleCta.addEventListener("click", () => {
      extra.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
      extra.focus({ preventScroll: true });
    });
    originalCta.replaceWith(sampleCta);
    setDevice(matchMedia("(max-width: 800px)").matches ? "mobile" : "desktop");
    demoDialog.showModal();
    document.querySelector(".demo-scroll").scrollTop = 0;
  }),
);
function setDevice(device) {
  canvas.classList.toggle("mobile", device === "mobile");
  document.querySelectorAll("[data-device]").forEach((button) => {
    const selected = button.dataset.device === device;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}
document
  .querySelectorAll("[data-device]")
  .forEach((button) =>
    button.addEventListener("click", () => setDevice(button.dataset.device)),
  );
