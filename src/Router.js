import LoginPage from "./LoginPage.svelte";

class Router {
  constructor() {
    this.pageComponent = LoginPage;
  }

  push(pageComponent) {
    debugger;
    this.pageComponent = pageComponent;
    history.pushState(null, '', pageComponent.name);
  }

  getPageComponent() {
    return this.pageComponent;
  }
}

export default Router;