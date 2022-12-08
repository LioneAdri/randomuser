import React from 'react';
import classes from './Pager.module.css';

function Pager(props) {

    function pagerHandler(up, event) {
        event.preventDefault();
        props.onPaging(up);
    }

    return (
        <section className={classes['pager']}>
            <button title="Down"
                disabled={props.page===1 ? true : props.length < 1}
                className={classes['down']}
                onClick={(e) => pagerHandler(false, e)}>
                &laquo;
            </button>
            <button title="Up"
                disabled={props.length < 10}
                className={classes['up']}
                onClick={(e) => pagerHandler(true, e)}>
                &raquo;
            </button>
            <div title="Page" className={classes["pageNum"]}>{props.page}</div>
        </section>
    );
}

export default Pager;