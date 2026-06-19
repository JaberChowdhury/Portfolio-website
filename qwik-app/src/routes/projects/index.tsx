import { component$ } from "@builder.io/qwik";
import { QProjectsPage } from "../../components/react/qwik-projects";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <QProjectsPage />
    </>
  );
});

export const head: DocumentHead = {
  title: "Projects | Jaber Chowdhury",
  meta: [
    {
      name: "description",
      content: "Projects showcase of Jaber Chowdhury",
    },
  ],
};
