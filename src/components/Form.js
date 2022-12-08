import React, { useRef } from 'react';
import classes from './Form.module.css';

function Form(props) {

    const genderRef = useRef('');
    const primeRef = useRef('');
    const seedRef = useRef('');

    function submitHandler(event) {
        event.preventDefault();

        const filterData = {
            gender: genderRef.current.value,
            prime: primeRef.current.checked ? 1 : 0,
            seed: seedRef.current.checked ? 'abc' : ''
        };

        props.onFilter(filterData);
    }

    return (
        <form onSubmit={submitHandler} className={classes['form']}>
            <label htmlFor="gender">Gender: </label>
            <select name="gender" ref={genderRef} >
                <option value=""></option>
                <option value="female">Female</option>
                <option value="male">Male</option>
            </select><br />
            <label htmlFor="primenumbers">Prime numbers: </label>
            <input type="checkbox" name="primenumbers" value="1" ref={primeRef} /><br />
            <label htmlFor="primenumbers">Seed: </label>
            <input type="checkbox" name="seet" value="1" ref={seedRef} /><br /><br />
            <button>Filter</button>
        </form>
    );
}

export default Form;