import { type RequestHandler } from "@builder.io/qwik-city";
import { getProjectDefaultBranch } from "../../../nextjs/lib/projects";

export const onGet: RequestHandler = async ({ params, redirect }) => {
  const { name } = params;
  const defaultBranch = await getProjectDefaultBranch(name);
  throw redirect(302, `/projects/${name}/${encodeURIComponent(defaultBranch)}`);
};
