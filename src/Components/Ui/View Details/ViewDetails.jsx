import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import './view-details.css'
const ViewDetails = ({ viewData, closeHandler }) => {
    // console.log(viewData);
    const [form, setForm] = useState({
        name: '',
        email: "",
        mobile: "",
        address: ""
    });
    useEffect(() => {
        setForm(viewData)
    }, [viewData])

    return (
        <div className='view-details-container'>
            <div className="view-wrapper">
                <div className="details-container">
                    <h1>Contact Details</h1>
                </div>
                <div className='close_btn_container'>
                    <IoClose className='react-icons' onClick={closeHandler} />
                </div>
            </div>
            <div className='user-view-details'>
                <div>
                    <div className='data-list'>
                        <p>Name:</p>
                        <p>{form.name}</p>
                    </div>
                    <div className='data-list'>
                        <p>Email:</p>
                        <p>{form.email}</p>
                    </div>
                    <div className='data-list'>
                        <p>Number:</p>
                        <p>{form.mobile}</p>
                    </div>
                    <div className='data-list'>
                        <p>Adress:</p>
                        <p>{form.address}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ViewDetails