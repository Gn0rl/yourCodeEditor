import "./styles.css";
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app")! as unknown as Element | ShadowRoot,
});

export default app;