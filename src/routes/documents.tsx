import { Outlet, createFileRoute } from "@tanstack/react-router";
import { InternalGate } from "@/components/site/InternalGate";

export const Route = createFileRoute("/documents")({
  component: DocumentsLayout,
});

function DocumentsLayout() {
  return (
    <InternalGate>
      <Outlet />
    </InternalGate>
  );
}