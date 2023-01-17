import { createRoot } from "react-dom/client";
import { App } from './app/app';
import { Welcome } from './welcome/welcome';
import { Provider } from "react-redux";
import store from "./app/redux/store.js";

const main = document.querySelector("main");
if (main){
    const root = createRoot(main);
    fetch('/user/id.json')
        .then(res => res.json())
        .then(data => {
            if (data.userId) {
                root.render(<Provider store={store}>
                    <App />
                </Provider>
                );
                
            } else {
                root.render(<Welcome />);
            }
        })
}

