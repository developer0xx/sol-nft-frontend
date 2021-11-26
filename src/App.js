import {ChakraProvider} from "@chakra-ui/react"
import Home from './pages/Home';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {StoreProvider} from './StoresContext';

require('dotenv').config()

function App() {
    return (
        <StoreProvider>
            <BrowserRouter>
                <div className="App">
                    <ChakraProvider>
                        <Home/>
                    </ChakraProvider>
                </div>
            </BrowserRouter>
        </StoreProvider>
    );
}

export default App;
