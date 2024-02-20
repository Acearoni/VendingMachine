import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayOne = ({ code }) => {
    // State to store the snack data
    const [snack, setSnack] = useState(null);
    // State to track loading state
    const [loading, setLoading] = useState(true);

    // Function to fetch snack data based on the code
    const fetchSnackByCode = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/findSnackByCode/${code}`);
            setSnack(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching snack:', error);
        }
    };

    useEffect(() => {
        fetchSnackByCode();
    }, [code]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!snack) {
        return <div>Snack not found</div>;
    }

    return (
        <div>
            <h2>{snack.name}</h2>
            <p>Price: {snack.price}</p>
            {/* Add more details if needed */}
        </div>
    );
};

export default DisplayOne;
