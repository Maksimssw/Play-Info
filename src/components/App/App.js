import { lazy, Suspense} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import AppHeader from "../AppHeader/AppHeader";

const PlatformPage = lazy(() => import('../Page/PlatformPage/PlatformPage'));
const Error = lazy(() => import('../Page/Error/Error'));
const PlatformInfo = lazy(() => import('../Page/PlatformInfo/PlatformInfo'));
const AllGames = lazy(() => import('../Page/AllGamesPage/AllGamesPage'));
const GamePage = lazy(() => import('../Page/GamePage/GamePage'));
 
const App = () => {
    return (
        <Suspense fallback={<Spinner/>}>
            <Router>
                <AppHeader/>
                <Routes>
                    <Route path="/" element={<PlatformPage/>}/>
                    <Route path="*" element={<Error/>}/>
                    <Route path="/:idPlatform" element={<PlatformInfo/>}/>
                    <Route path="/games" element={<AllGames/>}/>
                    <Route path="/games/:idGame" element={<GamePage/>}/>
                </Routes>
            </Router>
        </Suspense> 
    )
} 

export default App;