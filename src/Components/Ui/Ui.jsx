import React, { useEffect } from 'react'
import { useState } from 'react';
import './ui.css'
import { FaRegCircleUser } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Form from "../form/Form.jsx"
import ViewDetails from './View Details/ViewDetails';
import { IoIosAddCircleOutline } from "react-icons/io";
const Ui = () => {
    let [data, setData] = useState(require('./data.json')) // local json data
    let [searchValue, setSearchValue] = useState('');
    let [editIndex, setEditIndex] = useState(null); // to store index of editable item
    const [mode, setMode] = useState("Add");  // it define operating mode like when function will "ADD " or "Update"
    const [updateData, setUpdateData] = useState({}) // variable for store and send updateable data.
    const [viewData, setViewData] = useState({}) // to store viewing data for view details component
    const [view, setView] = useState(false);  // variable for show user data when user click on eye icon
    const [close, setClose] = useState(true);   // state variable for close a side div
    const [filterUserData, setFilterUserData] = useState([]);

    useEffect(() => {
    }, [data])

    //  function for close a div 
    function closeHandler() {
        setClose(true);
    }
    //  function for "ADD " or "UPDATE" data.
    function addNewContactHandler(newContactData, mode) {
        if (mode === "Add") {
            setData([...data, newContactData])
        }
        else {
            // console.log(data);
            let newData = data[editIndex] = newContactData
            setMode("Add")
        }
    }
    // function for "DELETE" data of  from local state variable.

    function deleteHandler(index) {

        let fiteredData = data.filter((value, valueIndex) => {

            return valueIndex !== index
        })
        setData(fiteredData)
    }

    // function for Find "value Of editable user " 

    function editHandler(index) {
        setClose(false)
        setView(false);
        data.forEach((element, elementIndex) => {
            if (elementIndex === index) {
                setEditIndex(elementIndex);
                setMode("Edit");
                setUpdateData(element)
            }
        })
    }

    // function for "VIEW USER DATA"

    const viewHandler = (index) => {
        setClose(false);
        // console.log(index);
        data.forEach((element, elementIndex) => {
            if (elementIndex === index) {
                setViewData(element);

            }
        })
        setView(true);
    }
    //function for open "ADD CONTACT " modal. 

    function clickAllContact() {
        setClose(false);
        setView(false);
        setMode("Add")
        setUpdateData({});
    }

    // function for filter data on the base of search bar.

    function filterUserDataHandler(event) {
        let userName = event.target.value;
        setSearchValue(userName);
        const filterData = data.filter((value) => {
            return value.name.toLowerCase().includes(userName.toLowerCase())
        })
        // console.log(filterUserData);
        setFilterUserData(filterData)
    }

    // function to retun jsx based on data or filter variable

    function mapping(data) {
        // console.log((data));
        return data.map((element, index) => (
            <div className='data__list' key={index}>
                <div className="id">
                    {index + 1}
                </div>
                <div className="user__logo">
                    <FaRegCircleUser className='react-icons' />
                </div>
                <div className="user_detail">
                    <div className="name">
                        {element.name}
                    </div>
                    <div className="phone">
                        {element.mobile}
                    </div>
                </div>
                <div className="icons__container">
                    <div className="icon">
                        <IoMdEye className='react-icons' onClick={() => viewHandler(index)} />
                    </div>
                    <div className="icon">
                        <MdDelete className='react-icons' onClick={() => deleteHandler(index)} />
                    </div>
                    <div className="icon">
                        <MdEdit className='react-icons' onClick={() => editHandler(index)} />
                    </div>
                </div>
            </div>
        ));
    }


    return (
        <div className='main__container'>
            <div className="child__container__first">
                <div>
                    <button className='add__btn' onClick={clickAllContact}>All Contact <IoIosAddCircleOutline />
                    </button>
                    <input className='search__input__box' type="text" placeholder='Search Contact' onChange={filterUserDataHandler} />
                    <br />
                    <div className="data__lists">
                        {/* funtion will call with filter data when length of search bar and filter data is more then 1 otherwiser it render data using data variable  */}

                        {filterUserData.length > 0 || searchValue.length > 0 ?
                            mapping(filterUserData)
                            : mapping(data)
                        }
                    </div>
                </div>
            </div>
            <div className="child__container__second">
                {close === false ?
                    <div>
                        {view ? <ViewDetails viewData={viewData} closeHandler={closeHandler} />
                            :
                            < Form addNew={addNewContactHandler} mode={mode} updateData={updateData} closeHandler={closeHandler} />
                        }

                    </div> :
                    null}
            </div>
        </div>
    )
}

export default Ui