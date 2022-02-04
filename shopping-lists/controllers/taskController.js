import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as shoppingService from "../services/shoppingService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const addShoppingList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await shoppingService.create(name);
  return redirectTo("/lists");
};

const addItems = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await shoppingService.addItem(urlParts[2], name);

  return redirectTo("/lists/" + urlParts[2]);
};

const viewItems = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const data = {
    notCollected: await shoppingService.findItemsNotCollected(urlParts[2]),
    collected: await shoppingService.findItemsCollected(urlParts[2]),
    id: urlParts[2],
  };
  return new Response(await renderFile("items.eta", data), responseDetails);
};

const viewLists = async () => {

  const data = {
    shoppingLists: await shoppingService.findByActivity(),
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};

const viewMain = async () => {

  const data = {
    listCount: await shoppingService.findListAmounts(),
    itemCount: await shoppingService.findItemAmounts(),
  };
  return new Response(await renderFile("main.eta", data), responseDetails);
};

const deactivateList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await shoppingService.deactivate(urlParts[2]);
  return redirectTo("/lists");
};

const collect = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await shoppingService.collectItem(urlParts[4]);
  return redirectTo("/lists/" + urlParts[2]);
};

export { addShoppingList, viewLists, deactivateList, viewMain, addItems, viewItems, collect};