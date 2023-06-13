import './App.css';
import Add from './components/add';
import List from './components/list';
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
        <div className="mx-auto mt-24 w-80">
            <h1 className="text-center">倒数日</h1>
            <Add festivals={festivals} setFestivals={setFestivals} />
            <List festivals={festivals} setFestivals={setFestivals} />
        </div>
    );
}

export default App;
