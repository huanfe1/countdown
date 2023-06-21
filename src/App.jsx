import './App.css';
import Add from './components/add';
import List from './components/list';
import Center from './components/data/center';
import { useState, useEffect } from 'react';

const getFestivals = () => {
    if (localStorage.getItem('festivals')) return JSON.parse(localStorage.getItem('festivals'));
    localStorage.setItem('festivals', JSON.stringify([]));
    return [];
};

function App() {
    const [festivals, setFestivals] = useState(getFestivals());
    useEffect(() => {
        localStorage.setItem('festivals', JSON.stringify(festivals));
    }, [festivals]);
    return (
        <div className="mx-auto mt-24">
            <Add festivals={festivals} setFestivals={setFestivals} />
            {/* <Center festivals={festivals} /> */}
            <List festivals={festivals} setFestivals={setFestivals} />
        </div>
    );
}

export default App;
