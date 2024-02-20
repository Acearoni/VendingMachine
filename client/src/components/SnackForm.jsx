import React, { useState } from 'react';
import axios from 'axios';
import '../SnackForm.css';

const SnackForm = () => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [price, setPrice] = useState(0);
    const [errors, setErrors] = useState({});

    const validateCode = (code) => {
        // Regular expression to validate if the code contains exactly two characters
        // and consists of valid button codes (A-F) or numbers (0-9)
        const regex = /^[A-F0-9]{2}$/i;
        return regex.test(code);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        // Validate the code format
        if (!validateCode(code)) {
            setErrors({ code: 'Invalid code: Code must be exactly two characters long and contain valid button characters (A-F) or numbers (0-9).' });
            return;
        }

        // Check if the price is greater than 0
        if (price <= 0) {
            setErrors({ price: 'Price must be greater than 0.' });
            return;
        }

        // Check if the name is empty
        if (!name) {
            setErrors({ name: 'Name is required.' });
            return;
        }

        const newSnack = { name, code, price };

        axios.post('http://localhost:8000/api/createSnack', newSnack)
            .then((res) => {
                console.log(res);
                // Redirect back to home page after successful submission
                window.location = '/';
            })
            .catch((err) => {
                console.error(err);
                setErrors(err.response.data.errors);
            });
    };


    return (
        <div className="snack-form-container">
            <h2>Create Snack</h2>
            <form onSubmit={submitHandler}>
                <div className="form-field">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>

                <div className="form-field">
                    <label>Code:</label>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    {errors.code && <p className="error-message">{errors.code}</p>}
                </div>

                <div className="form-field">
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    {errors.price && <p className="error-message">{errors.price}</p>}
                </div>

                <button className="submit-button" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SnackForm;
