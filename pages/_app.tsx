import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/app.scss'
import type { AppProps } from 'next/app'
import store from "../redux/store";
//import {wrapper} from "../redux/store";
import {Provider} from "react-redux";

// export default wrapper.withRedux(function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// })

export default function App({ Component, pageProps }: AppProps) {
    //const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}
