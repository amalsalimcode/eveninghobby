import React from 'react';
import './App.css';
// import ItemList from './ItemList';
import MapComponent from './MapComponent';
import ItemList from './ItemList';
import { DataProvider } from './DataContext';
import Toggles from './Toggles';

function App() {
    return (
        <div className="App">
            <DataProvider>
                <div className="map-container">
                    <MapComponent />
                </div>
                <div>
                    <Toggles />
                </div>
                <div className='item-list'>
                    <ItemList />
                </div>
            </DataProvider>
        </div>
    );
}

export default App;

