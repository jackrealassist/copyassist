import React, { useState, useCallback, useContext, useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { DataContext } from '../contexts/dataContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const { data, setData } = useContext(DataContext);
    const [address, setAddressSearch] = useState("");
    const [loading, setLoading] = useState(false);

    // Function to handle user input and display suggestions
    const [searchValue, setSearchValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [addressSelected, setAddressSelected] = useState(false);

    const [formValues, setFormValues] = useState({
        post_for: '',
        address: '',
        description: ''
    });

    const handleValueChange = useCallback(() => {
        if (searchValue.trim() === "") {
            setSuggestions([]);
            return;
        }
        setLoading(true);

        const apiUrl = `https://www.zillowstatic.com/autocomplete/v3/suggestions?q=${address}&abKey=590006d0-856e-4f16-bce6-a7077b4ce545&clientId=homepage-render`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                return response.json();
            })
            // www.zillowstatic.com/autocomplete CODE
            .then((data) => {
                const listOption = [];
                data?.results?.map((record) =>
                    listOption.push(record?.display + "," + record?.metaData?.country),
                );
                console.log(listOption)
                setSuggestions(listOption);
                setLoading(false);
            })
            .catch((error) => {
                setSuggestions([]);
                setLoading(false);
            });
    }, [searchValue]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "address") {
            setAddressSelected(false);
            setAddressSearch(value);
            setSearchValue(value);
            handleValueChange();

        }

        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formValues.post_for || !formValues.address || !formValues.description) {
            alert("Please fill out all form fields.");
            return;
        }
        setData(formValues);
        navigate('/generate');
    };

    return (
        <div className='flex-1 p-4 flex gap-10 flex-col items-center justify-center'>
            <h1 className=' text-center text-2xl font-semibold'>Generate Property Description</h1>
            <form onSubmit={handleSubmit}>
                <div className=' flex flex-col gap-2'>
                    <p className=' text-center text-lg font-semibold'>What is this post for?</p>

                    <div className="radio-input">
                        <label>
                            <input type="radio" id="Social Media" name="post_for" value="Social Media" onChange={handleInputChange} />
                            <span className=' text-base'>Social Media</span>
                        </label>
                        <label>
                            <input type="radio" id="MLS" name="post_for" value="MLS" onChange={handleInputChange} />
                            <span className=' text-base'>MLS</span>
                        </label>
                        <span className="selection"></span>
                    </div>
                </div>
                <div className=' flex flex-col gap-3 mt-8 items-center justify-center'>
                    <p className=' text-center text-lg font-semibold'>Property Address</p>
                    <div className="card coupons">
                        <div className="flex gap-2 relative">
                            <input type="text" placeholder="Enter an address" className="input_home border-2 p-2 rounded-lg" name="address" value={formValues.address} onChange={handleInputChange} />

                            {!addressSelected &&
                                <div className='absolute bg-white border border-grey rounded-lg top-[50px] w-[256px]' style={{ zIndex: 99 }}>
                                    {loading ? <div className=''>Loading...</div> : <div>
                                        {suggestions.length > 0 && (
                                            <ul className="suggestions" >
                                                {suggestions.slice(0, 5).map((suggestion, index) => (
                                                    <li className='cursor-pointer hover:bg-grey-500' key={index} onClick={() => { setAddressSearch(suggestion); setFormValues({ ...formValues, address: suggestion }); setAddressSelected(true) }}>
                                                        {suggestion}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>}
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center mt-8 gap-3'>
                    <p className=' text-center text-lg font-semibold'>Description length (words)</p>
                    <div className="radio-input">
                        <label>
                            <input type="radio" id="short" name="description" value="short" onChange={handleInputChange} />
                            <span className=' text-base'>Short</span>
                        </label>
                        <label>
                            <input type="radio" id="medium" name="description" value="medium" onChange={handleInputChange} />
                            <span className=' text-base'>Medium</span>
                        </label>
                        <label>
                            <input type="radio" id="long" name="description" value="long" onChange={handleInputChange} />
                            <span className=' text-base'>Long</span>
                        </label>
                        <span className="selections"></span>
                    </div>
                </div>
                <div className=' flex flex-col mt-8 items-center justify-center'>
                    <button type="submit" className="w-fit bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-16 rounded-xl">
                        Generate
                    </button>
                </div>
            </form>

            <Footer />

        </div>
    )
}

export default Home
