import React, { useState, useEffect } from 'react';

function ItemList() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>Items2</h1>
            <ul>
                {items.map(item => (
                    <li key={item.name}>
                        <strong>{item.name}</strong>: {item.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ItemList;

