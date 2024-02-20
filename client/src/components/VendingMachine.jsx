import React, { useState } from 'react';
import '../VendorStyle.css';
import { Link } from 'react-router-dom';
import DisplayOne from './DisplayOne'; // Import the DisplayOne component

function VendingMachine({ onButtonClick }) {
    const [selectedLetter, setSelectedLetter] = useState(null); // State to store the selected letter
    const [selectedNumber, setSelectedNumber] = useState(null); // State to store the selected number
    const [displaySnack, setDisplaySnack] = useState(false); // State to control displaying the snack

    const buttons = [
        'A', 'B', 'C', 'D', 'E', 'F',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'CLR', 'ENT'
    ];

    // Function to handle selection of a letter
    const handleLetterSelection = (letter) => {
        setSelectedLetter(letter); // Update selected letter
    };

    // Function to handle selection of a number
    const handleNumberSelection = (number) => {
        setSelectedNumber(number); // Update selected number
    };

    // Function to handle ENT button click
    const handleEntButtonClick = () => {
        if (selectedLetter && selectedNumber) {
            // Set displaySnack to true to show the snack
            setDisplaySnack(true);
        } else {
            console.log('Please select both a letter and a number before pressing ENT.');
        }
    };

    // Function to handle CLR button click
    const handleClearButtonClick = () => {
        setSelectedLetter(null); // Clear selected letter
        setSelectedNumber(null); // Clear selected number
        setDisplaySnack(false); // Hide displayed snack
        window.location.reload(); // Refresh the page
    };


    return (
        <div className="vending-machine">
            <h1>Vending Machine</h1>
            <div className="buttons">
                {buttons.map((code, index) => (
                    <button key={index} onClick={() => code === 'CLR' ? handleClearButtonClick() : code === 'ENT' ? handleEntButtonClick() : isNaN(code) ? handleLetterSelection(code) : handleNumberSelection(code)}>
                        {code}
                    </button>
                ))}
            </div>
            <div className='add-snack-css'>
                <Link to="/add-snack">Add Snack</Link>
            </div>
            {/* Display selected snack details only when displaySnack is true */}
            {displaySnack && selectedLetter && selectedNumber && <DisplayOne code={`${selectedLetter}${selectedNumber}`} />}
        </div>
    );
}

export default VendingMachine;
