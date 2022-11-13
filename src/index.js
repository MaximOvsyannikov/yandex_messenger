import Handlebars from "handlebars/dist/handlebars.runtime";

import mainTemplate from "./pages/main/index.hbs";
import chatTemplate from "./pages/chat/index.hbs";
import signinTemplate from "./pages/signin/index.hbs";
import signupTemplate from "./pages/signup/index.hbs";
import errorTemplate from "./pages/error/index.hbs";
import profileTemplate from "./pages/profile/index.hbs";

import button from "./components/button/button.hbs";
import input from "./components/input/input.hbs";
import profileField from "./components/profileField/profileField.hbs";
import profileButton from "./components/profileButton/profileButton.hbs";
import avatar from "./components/avatar/avatar.hbs";
import messageInput from "./components/messageInput/messageInput.hbs";

const PAGES = {
  main: {
    template: mainTemplate,
  },
  chat: {
    template: chatTemplate,
  },
  signin: {
    template: signinTemplate,
  },
  signup: {
    template: signupTemplate,
  },
  error500: {
    template: errorTemplate,
    data: {
      title: "500",
      text: "Мы уже фиксим",
    },
  },
  error404: {
    template: errorTemplate,
    data: {
      title: "400",
      text: "Не туда попали",
    },
  },
  profileInfo: {
    template: profileTemplate,
    data: {
      view: "info",
    },
  },
  profileUpdate: {
    template: profileTemplate,
    data: {
      view: "update",
    },
  },
  profilePassword: {
    template: profileTemplate,
    data: {
      view: "password",
    },
  },
};

window.renderPage = (name, data) => {
  const root = document.querySelector("#app");
  const template = PAGES[name].template;
  const params = data || PAGES[name].data;

  const html = template(params);
  root.innerHTML = html;
};

document.addEventListener("DOMContentLoaded", () => {
  Handlebars.registerPartial("button", button);
  Handlebars.registerPartial("input", input);
  Handlebars.registerPartial("profileField", profileField);
  Handlebars.registerPartial("profileButton", profileButton);
  Handlebars.registerPartial("avatar", avatar);
  Handlebars.registerPartial("messageInput", messageInput);

  Handlebars.registerHelper("eq", (a, b) => a == b);
  Handlebars.registerHelper("noteq", (a, b) => a !== b);

  renderPage("main", {
    pages: Object.keys(PAGES)
      .filter((el) => el !== "main")
      .map((el) => ({
        children: el,
        onclick: `renderPage('${el}')`,
      })),
  });
});
