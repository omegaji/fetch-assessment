import React from 'react'
import InputBars from '../InputBars/InputBars'
import { useState, useEffect } from 'react'
import FeedbackMessage from '../FeedbackMessage/FeedbackMessage'
import logo from '../../logo.svg'
import dog from '../../dog.svg'
const Form = () => {
    // This is the message that will be shown on either successful submission or error
    const [feedbackState, setFeedbackState] = useState({ "type": "none", "message": "" })
    // This state will store all the form input values, which we will utilize in the post request
    const [formState, setFormState] = useState({
        "First Name": '',
        "Last Name": "",
        "Email": "",
        "Password": "",
        "Occupation": "",
        "State": ""
    });
    // This state stores given occupations and states as Key: Value Objects
    const [occupationStates, setOccupationStates] = useState({ "occupations": [], "states": [] })


    // A function to be passed to child inputs, update formState for specific inputs
    const handleFormChange = (key, val) => {
        setFormState({ ...formState, [key]: val })
    }

    // A function to be passed to child inputs, update feedback for specific inputs
    const handleFeedback = (key, val) => {
        setFeedbackState({ ...feedbackState, [key]: val })
    }

    // To validate form
    const validateForm = () => {
        for (let key in formState) {
            if (formState[key] === "") {
                setFeedbackState({ ...feedbackState, type: "error", "message": "Error, " + key + " is empty" })
                return false
            }
        }

        return true;
    }
    // called on submitting a form
    const submitForm = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const url = "https://frontend-take-home.fetchrewards.com/form";
            const options = {
                method: "POST",
                body: JSON.stringify({
                    "name": formState['First Name'] + formState["Last Name"],
                    "email": formState["Email"],
                    "password": formState["Password"],
                    "occupation": formState["Occupation"],
                    "state": formState["State"]
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }
            fetch(url, options)
                .then((response) => {
                    if (response.status === 201) {
                        setFeedbackState({ ...feedbackState, type: "success", message: "Yay! the post was a success!🎉" })
                    }
                    else {
                        setFeedbackState({ ...feedbackState, type: "error", message: "Oops! the post failed!😟" })

                    }
                })
                .catch((err) => {
                    setFeedbackState({ ...feedbackState, type: "error", message: "Oops! the post failed!😟" })

                })

        }
    }

    // Loading the occupations and states 
    useEffect(() => {
        const url = "https://frontend-take-home.fetchrewards.com/form";
        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        fetch(url, options)
            .then((res) => res.json())
            .then((response) => {
                let states = response.states.map(item => item.name)
                setOccupationStates({ ...response, states: states })
                setFormState({ ...formState, Occupation: response["occupations"][0], State: states[0] })
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])




    return (
        <form className='form-flex'>
            <img alt="" src={logo}></img>
            <div className='form-item'>
                <InputBars type="text" handleFormChange={handleFormChange} name="First Name" state={formState} label="👤First Name" />
            </div>
            <div className='form-item'>
                <InputBars type="text" handleFormChange={handleFormChange} name="Last Name" state={formState} label="👤Last Name" />
            </div>
            <div className='form-item'>
                <InputBars type="text" handleFormChange={handleFormChange} name="Email" state={formState} label="📧Email" />
            </div>
            <div className='form-item'>
                <InputBars type="password" handleFormChange={handleFormChange} name="Password" state={formState} label="🔑Password" />
            </div>
            <div className='form-item'>
                <InputBars type="select" selectData={occupationStates["occupations"]} handleFormChange={handleFormChange} name="Occupation" state={formState} label="🏢Occupation" />
            </div>
            <div className='form-item'>
                <InputBars type="select" selectData={occupationStates["states"]} handleFormChange={handleFormChange} name="State" state={formState} label="🌎State" />

            </div>

            <div className='form-item'>
                <FeedbackMessage type={feedbackState.type} message={feedbackState.message} handleFeedback={handleFeedback} />

                <button type="submit" onClick={submitForm.bind(this)}>Create <img alt="" src={dog}></img></button>
            </div>


        </form>
    )
}

export default Form