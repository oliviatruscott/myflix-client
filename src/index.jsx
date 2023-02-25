import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

//main component (will eventually use all the others)
const App = () => {
    return (
        <Container>
            <MainView />
        </Container>
    );
};

//finds root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

//tells react to render your app in the root dom element
root.render(<App />);