import React, { useState } from 'react';
import { useData } from './DataContext';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4

function ItemList() {
    const { items, markers } = useData();
    const [expandedIndices, setExpandedIndices] = useState([]);

    const toggleExpand = (index) => {
        if (expandedIndices.includes(index)) {
            markers[index].setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
            setExpandedIndices(expandedIndices.filter((i) => i !== index));
        } else {
            markers[index].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
            setExpandedIndices([...expandedIndices, index]);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {items.map((item, index) => (
                <div
                    key={uuidv4()}
                    style={{
                        width: '80%',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        padding: '15px',
                        marginBottom: '15px',
                        cursor: 'pointer',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#f9f9f9',
                    }}
                    onClick={() => toggleExpand(index)}
                >
                    <h2 style={{ margin: '0', fontSize: '24px', color: '#333' }}>{item.name}</h2>
                    <p style={{ marginBottom: '5px', fontSize: '16px', color: '#555' }}>Address: {item.address}</p>
                    {expandedIndices.includes(index) && (
                        <>
                            {item.food_items.map((category, categoryIndex) => (
                                <div key={categoryIndex}>
                                    <h3 style={{ margin: '10px 0', fontSize: '18px', color: '#333' }}>{category.category_name}</h3>
                                    <p style={{ margin: '0', fontSize: '16px', color: '#555' }}>
                                        {category.items.join(', ')}
                                    </p>
                                    <p style={{ marginBottom: '5px', fontSize: '16px', color: '#555' }}>Hours: {item.days_hours ? item.days_hours : "Unavailable"}</p>
                                    <p style={{ marginBottom: '5px', fontSize: '16px', color: '#555' }}>Permit: {item.permit}</p>
                                    <p style={{ marginBottom: '5px', fontSize: '16px', color: '#555' }}>Permit Expiry: {item.expiration_date}</p>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ItemList;
