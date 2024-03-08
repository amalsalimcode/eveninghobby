import React, { useEffect } from 'react';
import { useData } from './DataContext';

function ItemList() {

    const {items, markers} = useData();

    useEffect(() => {
    }, []);

    return (
        <div style={{}}>
            {items.map((item, index) => (

                <div
                    key={item.address}
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
                    onClick={() => {
                        console.log(markers[index]);
                        markers[index].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')

                        const greenIconSuffix = 'green-dot.png';
                        markers.forEach((marker, i) => {
                            if (i !== index && marker.icon.endsWith(greenIconSuffix)){
                                marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')

                            }
                        })
                    }}
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

