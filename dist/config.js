// All business settings live here. Empty optional values stay out of the interface.
window.WEBSITE_READY_CONFIG = Object.freeze({
  price: 699,
  currency: "USD",
  brandName: "Website Ready",
  legalName: "Website Ready LLC",
  // TODO: Set an HTTPS checkout URL and/or lead intake URL before public launch.
  // Checkout takes precedence. When neither is connected, CTAs explain the next step honestly.
  checkoutUrl: "",
  leadUrl: "",
  // TODO: Supply verified contact details and reviewed legal pages.
  email: "",
  phone: "",
  privacyUrl: "",
  termsUrl: "",
  socialLinks: [], // [{ label: 'Instagram', url: 'https://...' }]
  // TODO: Finalize before offering these terms. Empty values are never presented as promises.
  policies: {
    hosting: "",
    domain: "",
    revisions: "",
    refunds: "",
    launchTiming: "",
    maintenance: "",
    ownershipTransfer: "",
  },
});
