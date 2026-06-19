import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { QProjectDetailPage } from "../../../../components/react/qwik-project-detail";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const loc = useLocation();
  const repoName = loc.params.name;
  const activeBranchName = decodeURIComponent(loc.params.branch);

  return (
    <>
      <QProjectDetailPage repoName={repoName} activeBranchName={activeBranchName} />
    </>
  );
});

export const head: DocumentHead = ({ params }) => {
  const name = params.name;
  const decodedBranch = decodeURIComponent(params.branch);
  return {
    title: `${name} (${decodedBranch}) | Projects`,
    meta: [
      {
        name: "description",
        content: `Details and README for the repository: ${name} on branch ${decodedBranch}`,
      },
    ],
  };
};
