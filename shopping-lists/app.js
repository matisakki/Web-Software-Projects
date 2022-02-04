import { serve } from "https://deno.land/std@0.120.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as taskController from "./controllers/taskController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const handleRequest = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  if (url.pathname === "/" && request.method === "GET") {
    return await taskController.viewMain(request);
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await taskController.addShoppingList(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await taskController.viewLists(request);
  } else if (url.pathname === "/lists/" + urlParts[2] + "/deactivate" && request.method === "POST") {
    return await taskController.deactivateList(request);
  } else if (url.pathname === "/lists/" + urlParts[2] && request.method === "GET") {
    return await taskController.viewItems(request);
  } else if (url.pathname === "/lists/" + urlParts[2] + "/items" && request.method === "POST") {
    return await taskController.addItems(request);
  } else if (url.pathname === "/lists/" + urlParts[2] + "/items/" + urlParts[4] + "/collect" && request.method === "POST") {
    return await taskController.collect(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
};
serve(handleRequest, { port: 7777 });
