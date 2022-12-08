import React, { useState, useEffect, useCallback } from 'react';
import List from './components/List';
import Form from './components/Form';
import Pager from './components/Pager';
import classes from './App.module.css';

function App() {

    const url = 'https://randomuser.me/api/?results=10&inc=name,gender,location,picture&noinfo';
    // this api won't filter (gender=male) if seed is on (seed=abc)
    // but proven paging works only if seed is on

    const [users, setUsers] = useState([]);
    const [urlParams, setUrlParams] = useState({
        page: 1
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsersHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setUsers([]);
        try {
            const params = serialize(urlParams)
            const response = await fetch(url + "&" + params);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

            const transformedUsers = data.results.map((userData) => {
                return {
                    firstName: userData.name.first,
                    lastName: userData.name.last,
                    gender: userData.gender,
                    postcode: userData.location.postcode,
                    thumbnail: userData.picture.thumbnail
                };
            });
            setUsers(transformedUsers);
        } catch (error) {
            setError(error.message);
            setUsers([]);
        }
        setIsLoading(false);

    }, [urlParams]);

    useEffect(() => {
        fetchUsersHandler();
    }, [fetchUsersHandler]);


    function onFilter(filterData) {
        let copyOfObject = { ...urlParams, ...filterData };

        if (copyOfObject.gender === "") {
            delete copyOfObject.gender;
        }
        if (copyOfObject.seed === "") {
            delete copyOfObject.seed;
        }
        if (copyOfObject.prime === 0) {
            delete copyOfObject.prime;
        }

        setUrlParams(oldParams => ({
            ...copyOfObject
        }));
    }

    function onPaging(up) {
        const number = up ? (urlParams.page + 1) : (urlParams.page - 1 === 0 ? 1 : (urlParams.page - 1));
        let updatedValue = {};
        updatedValue = {
            page: number
        };
        setUrlParams(oldParams => ({
            ...oldParams,
            ...updatedValue
        }));
        fetchUsersHandler();
    }

    function serialize (obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    }

    let content = <p>No users</p>;

    if (users.length > 0) {
        content = <List users={users} />;
    }

    if (error) {
        content = <p>{error}</p>;
    }

    if (isLoading) {
        content = <p>Loading...</p>;
    }

    return (
        <section className={classes['app']}>
            <Form onFilter={onFilter} />
            <Pager onPaging={onPaging} page={urlParams.page} length={users.length}/>
            <section>{content}</section>
            <Pager onPaging={onPaging} page={urlParams.page} length={users.length}/>
        </section>
    );
}

export default App;