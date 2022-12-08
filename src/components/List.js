import React from 'react';
import User from './User';
import classes from './List.module.css';

const List = (props) => {
    return (
        <ul className={classes['list']}>
            {props.users.map((user, index) => (
                <User
                    key={index}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    gender={user.gender}
                    thumbnail={user.thumbnail}
                    postcode={user.postcode}
                />
            ))}
        </ul>
    );
};

export default List;