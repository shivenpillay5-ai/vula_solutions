import { analytics } from "@/lib/analytics";

export function WhatsAppButton() {
  const href =
    "https://wa.me/27612119960?text=" +
    encodeURIComponent("Hi, I'd like to learn more about Vula Solutions.");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onClick={() => analytics.whatsAppClick("floating_button")}
      className="print:hidden fixed bottom-5 left-5 z-40 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:bottom-6 sm:left-6"
      style={{ backgroundColor: "#25D366" }}
    >
      {/* WhatsApp logo */}
      <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.56 4.14 1.538 5.874L0 24l6.304-1.53A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.012-1.375l-.36-.214-3.73.905.946-3.625-.235-.373A9.809 9.809 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818zm5.472-7.436c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      </svg>
    </a>
  );
}
