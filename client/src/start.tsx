import { createRoot } from "react-dom/client";
import { App } from './app/app';
import { Welcome } from './welcome/welcome';

import reducer from "./app/redux/reducer.js";
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { Provider } from "react-redux";
const store = createStore(reducer, applyMiddleware(immutableState.default()));

const main = document.querySelector("main");
if (main){
    const root = createRoot(main);
    fetch('/user/id.json')
        .then(res => res.json())
        .then(data => {
            if (data.userId) {
                root.render(<Provider store={store}>
                    <App />
                    {/* root.render(<App />); */}   
                </Provider>
                );
                
            } else {
                root.render(<Welcome />);
            }
        })
}

