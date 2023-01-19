import { createRoot } from "react-dom/client";
import { App } from './app/app';
import { Welcome } from './welcome/welcome';
import { Provider } from "react-redux";
import { store } from "./app/redux/store";

import { initSocket } from "./app/socket";

const main = document.querySelector("main");
if (main){
    const root = createRoot(main);
    fetch('/user/id.json')
        .then(res => res.json())
        .then(data => {
            if (data.userId) {
                //setup the socket NOW!!!
                //once we are signed in - we trigger the connection to the socket
                initSocket(store); //we are calling the function from socket.js to setup the connecting with the socket
                root.render(<Provider store={store}>
                    <App />
                </Provider>
                );
            } else {
                root.render(<Welcome />);
            }
        })
}

