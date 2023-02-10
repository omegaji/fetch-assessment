import React from 'react'
const InputBars = (props) => {
    const changeFormValue = (event) => {
        props.handleFormChange(props.name, event.target.value);
    }
    if (props.type !== "select") {
        return (
            <div>

                <div className='label-wrapper'><label className='form-label'>{props.label}</label></div>
                <input type={props.type} value={props.state[props.name]} className="form-input" onChange={changeFormValue.bind(this)} required></input>
            </div>
        )
    }
    else {
        return (
            <div>
                <div className='label-wrapper'><label className='form-label'>{props.label}</label></div>
                <select value={props.state[props.name]} className="form-input" onChange={changeFormValue.bind(this)} required>
                    {props.selectData.map((item) => {
                        return (
                            <option key={item} value={item}>{item}</option>
                        )
                    })}
                </select>
            </div>
        )
    }
}

export default InputBars