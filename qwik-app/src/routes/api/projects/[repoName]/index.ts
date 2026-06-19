import { type RequestHandler } from "@builder.io/qwik-city";
import { fetchDetailedRepo } from "../../../../nextjs/lib/github";

export const onGet: RequestHandler = async ({ json, params }) => {
  try {
    const { repoName } = params;
    const data = await fetchDetailedRepo(repoName);
    json(200, data);
  } catch (error) {
    console.error(`Error in projects API route for ${params.repoName}:`, error);
    json(500, { error: "Internal Server Error" });
  }
};
