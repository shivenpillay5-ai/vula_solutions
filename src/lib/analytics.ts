declare global {
  function gtag(...args: unknown[]): void;
}

function track(event: string, params?: Record<string, string | number>) {
  if (typeof gtag === "function") {
    gtag("event", event, params ?? {});
  }
}

export const analytics = {
  bookCompassClick: (source: string) => track("book_compass_click", { source }),
  contactFormSubmit: () => track("contact_form_submit"),
  askCompassMessage: () => track("ask_compass_message"),
};
