import { render } from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import About from "./webpages/about";
import Teams from "./webpages/Teams/Teams";
import Team from "./webpages/Teams/{id}";
import NavBar from "./components/NavBar";
import Games from "./webpages/games/Games";
import Chess from "./webpages/games/chess";

render(
    <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
            <Route path="/">
                <Route index element={<About />} />
                <Route path="teams">
                    <Route index element={<Teams />} />
                    <Route path=":teamId" element={<Team />} />
                </Route>
                <Route path="games">
                    <Route index element={<Games/>}/>
                    <Route path="chess" element={<Chess/>}/>
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>,
    document.getElementById("root")
);