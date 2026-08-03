import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";

import { getResourceSectionBySlug } from "@/lib/resources";

export const Route = createFileRoute("/resources/$section")({
  beforeLoad: ({ params }) => {
    if (!getResourceSectionBySlug(params.section)) {
      throw notFound();
    }
  },
  component: ResourceSectionLayout,
});

function ResourceSectionLayout() {
  return <Outlet />;
}
