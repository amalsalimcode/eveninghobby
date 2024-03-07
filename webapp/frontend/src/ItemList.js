import React, { useState, useEffect } from 'react';

function ItemList() {
    const [items, setItems] = useState([{
        "address": "85 02ND ST",
        "dayshours": "",
        "items": "Lomo Saltado: Jalea: Ceviche: Calamar: Tilapia plate: chicken special. Soda: Water.",
        "lat": 37.788457028828915,
        "lon": -122.3998841605663,
        "name": "El Calamar Perubian Food Truck"
    },
    {
        "address": "85 02ND ST",
        "dayshours": "",
        "items": "Lomo Saltado: Jalea: Ceviche: Calamar: Tilapia plate: chicken special. Soda: Water.",
        "lat": 37.788457028828915,
        "lon": -122.3998841605663,
        "name": "El Calamar Perubian Food Truck"
    }]);

    useEffect(() => {
    }, []);

    return (
        <div style={{maxHeight: '100px'}}>
            {items.map(item => (

                <div
                    key={1}
                    style={{
                        border: '1px solid black',
                        borderRadius: '5px',
                        padding: '15px',
                        marginBottom: '15px',
                        cursor: 'pointer',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s ease',
                        backgroundColor: '#f9f9f9',
                        color: '#333',
                        fontFamily: 'Arial, sans-serif',
                        fontWeight: 'bold',
                        fontSize: '16px',
                    }}
                    onClick={() => { }}
                >
                    <p style={{ marginBottom: '1px', fontSize: '18px', color: '#555', textAlign: 'left' }}>{item.name}</p>
                    <p style={{ textAlign: 'left'}}>Address: {item.address}</p>
                    <p style={{textAlign: 'left'}}>Hours: {item.dayshours}</p>
                    <p style={{textAlign: 'left'}}>Menu: {item.items}</p>
                </div>
            ))}
        </div>

    );
}

export default ItemList;

