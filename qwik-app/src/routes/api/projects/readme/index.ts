import { type RequestHandler } from "@builder.io/qwik-city";
import { fetchReadmeHtml } from "../../../../nextjs/lib/github";

export const onGet: RequestHandler = async ({ json, url }) => {
  try {
    const repo = url.searchParams.get("repo");
    const branch = url.searchParams.get("branch");

    if (!repo || !branch) {
      json(400, { error: "Missing repo or branch parameter" });
      return;
    }

    const data = await fetchReadmeHtml(repo, branch);
    json(200, { readmeHtml: data });
  } catch (error) {
    console.error("Error in readme API route:", error);
    json(500, { error: "Internal Server Error" });
  }
};
