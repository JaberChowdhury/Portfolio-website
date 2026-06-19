import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export const Preloader = component$(() => {
  const loc = useLocation();
  const isInitialLoad = useSignal(true);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    // Hide initial preloader after a short delay to allow hydration and rendering
    const timer = setTimeout(() => {
      isInitialLoad.value = false;
    }, 500);
    return () => clearTimeout(timer);
  });

  const show = loc.isNavigating || isInitialLoad.value;

  return (
    <div
      class={`fixed top-0 left-0 right-0 z-[10000] h-[3px] overflow-hidden bg-transparent transition-opacity duration-300 pointer-events-none ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        class={`h-full bg-primary shadow-[0_0_10px_hsl(var(--primary))] transition-transform duration-300 ${
          show ? "animate-top-loading" : "w-full"
        }`}
      ></div>
    </div>
  );
});
