import { createRoot } from "react-dom/client";
import { App } from './app/app';
import { Welcome } from './welcome/welcome';

import reducer from "./app/redux/store.js";
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { Provider } from "react-redux";
import store from "./app/redux/store.js";
import { composeWithDevTools } from "redux-devtools-extension";
// const store = createStore(
//     reducer, 
//     composeWithDevTools(applyMiddleware(immutableState.default())));

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

