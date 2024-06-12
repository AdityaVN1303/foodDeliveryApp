import React , {lazy, Suspense, useState} from "react";
import ReactDOM from 'react-dom/client'
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Footer from "./components/Footer"
import { createBrowserRouter , RouterProvider , Outlet } from "react-router-dom";
import Menu from "./components/Menu";
import Error from './components/Error'
import Cart from './components/Cart'
import { Provider } from "react-redux";
import store from "./utils/store";
import Category from "./components/Category";


const Grocery = lazy(()=>import('./components/Grocery'));

const AppLayout = ()=>{

    const [isDarkMode, setIsDarkMode] = useState(false);

    function toggleMode(isDarkMode){
        setIsDarkMode(!isDarkMode);
    }
    
    return (
        <Provider store={store}>
            <div className={`app duration-500 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
            <Header setMode={toggleMode} mode={isDarkMode}/>
            <Outlet/>
            <Footer/>
        </div>
        </Provider>
    )
}

const appRouter = createBrowserRouter([
    {
        path : "/",
        element : <AppLayout/>,
        errorElement : <Error/>, 
        children : [
            {
                path : "/",
                element : <Body/>
            },
            {
                path : "/about",
                element : <About/>
            },
            {
                path : "/menu/:id",
                element : <Menu/>
            },
            {
                path : "/cart", 
                element : <Cart/>
            },
            {
                path : "/grocery",
                element : <Suspense fallback={<h1 className="text-4xl font-bold m-7">Loading....</h1>}><Grocery/></Suspense>
            },
            {
                path : "/category/:id",
                element : <Category/>
            }
        ]
    } 
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter}/>);