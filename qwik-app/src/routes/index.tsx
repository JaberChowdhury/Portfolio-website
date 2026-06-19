import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { QHomePage } from "~/components/react/homepage";

export default component$(() => {
  return (
    <div class="flex w-full snap-y snap-mandatory flex-col scroll-smooth antialiased">
      <QHomePage />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
