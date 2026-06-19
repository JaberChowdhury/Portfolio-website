import { type RequestHandler } from "@builder.io/qwik-city";
import { fetchAllPortfolios } from "../../../nextjs/lib/github";

export const onGet: RequestHandler = async ({ json }) => {
  try {
    const data = await fetchAllPortfolios();
    json(200, data);
  } catch (error) {
    console.error("Error in projects API route:", error);
    json(500, { error: "Internal Server Error" });
  }
};
