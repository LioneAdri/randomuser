import React from 'react';
import classes from './User.module.css';

const User = (props) => {
    return (
        <li className={classes.user}>
            <img src={props.thumbnail} />
            <h2>{props.firstName} {props.lastName}</h2>
            <h3>{props.gender} - {props.postcode}</h3>
        </li>
    );
};

export default User;