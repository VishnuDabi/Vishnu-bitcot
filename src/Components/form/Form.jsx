import React, { useEffect, useState } from 'react'
import './form.css'
import { IoClose } from "react-icons/io5";
const Form = ({ addNew, mode, updateData, closeHandler }) => {
    // four state variable for errors .
    const [nameErr, setNameErr] = useState(null);
    const [emailErr, setEmailErr] = useState(null);
    const [mobileErr, setMobileErr] = useState(null);
    const [addressErr, setAddressErr] = useState(null);

    //  object to store form fields values
    const [form, setForm] = useState({
        name: '',
        email: "",
        mobile: "",
        address: ""
    });
    //  useefect for prop updateData. it will update values of form when we want to update a user data.
    useEffect(() => {
        if (Object.keys(updateData).length === 5) {
            setForm(updateData);
        }
    }, [updateData])

    // formhandler function for handle object's values   
    const formHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // Submission handler function will check validation on input field and prevent submission if inputs are invalid or empty.

    const submissionHandler = (event) => {
        event.preventDefault();
        const { name, email, mobile, address } = form;
        let result = true;
        {
            if (name === "") {
                setNameErr("Please Enter Your Name")
                result = false;
            }
            else if (name.length < 3) {
                setNameErr("Name should have 3 char.")
                result = false;
            }
            else {

                setNameErr('');
            }
            if (email === "") {
                setEmailErr("Please Enter Your Email")
                result = false;
            }
            else if (!String(email).toLowerCase().match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
                result = false;
                setEmailErr("Invalid Email Id. ")
            }
            else {

                setEmailErr('');
            }
            if (mobile === "") {
                setMobileErr("Please Enter Your mobile Number")
                result = false;
            }
            else if (mobile.length < 10) {
                setMobileErr("mobile Number Must have 10 Digits.")
                result = false;
            }
            else if (mobile.length > 10) {
                setMobileErr("mobile Number Must have 10 Digits.")
                result = false;
            }
            else {

                setMobileErr('');
            }
            if (address === "") {
                setAddressErr("Please Enter Your Adress")
                result = false;
            }

            else {

                setAddressErr('');
            }
            if (result) {
                addNew(form, mode)
                resetHandler();
            }
        }


    }

    // reset handle for clearing form fields.

    const resetHandler = () => {
        setForm({
            name: '',
            email: "",
            mobile: "",
            address: ""
        })
    }

    return (

        <div className='add_contact_main_container'>
            {/* container for headings and close button */}
            <div className='add_contact_container'>
                <div className='name__container'>
                    <h1>{mode === "Add" ? "Add" : "Update"} Contact</h1>
                </div>
                <div className='close_btn_container'>
                    <IoClose className='react-icons' onClick={closeHandler} />
                </div>
                <br style={{ clear: 'both' }} />
            </div>
            {/* container for headings and close button End here */}

            <hr />
            <br />
            <div>
                {/* Input  form start from here  */}
                <form action="" className='inpu_fields' onSubmit={submissionHandler}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id='name' name='name' value={form.name} onChange={formHandler} placeholder='Enter Your Name' />
                    {nameErr ? <p>{nameErr}</p> : null}
                    <label htmlFor="email">Email:</label>
                    <input type="email" id='email' name='email' value={form.email} onChange={formHandler} placeholder='Enter Your Email' />
                    {emailErr ? <p>{emailErr}</p> : null}

                    <label htmlFor="mobile">mobile Number:</label>
                    <input type="text" id='mobile' name='mobile' value={form.mobile} onChange={formHandler} placeholder='Enter Your mobile Number' />
                    {mobileErr ? <p>{mobileErr}</p> : null}

                    <label htmlFor="address">Adress:</label>
                    <input type="text" id='address' name='address' value={form.address} onChange={formHandler} placeholder='Enter Address' />
                    {addressErr ? <p>{addressErr}</p> : null}

                    <input className='btn-submit' type="submit" value={mode === "Add" ? "Submit" : "Update"} />
                    <button className='btn-submit' onClick={resetHandler}>Reset</button>
                </form>
                {/* input form End Here */}
            </div>
        </div>
    )
}

export default Form