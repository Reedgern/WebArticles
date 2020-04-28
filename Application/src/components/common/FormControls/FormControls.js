import React from "react";
import style from './FormControls.module.css';

export const Input = ({input, meta, ...props}) => {
    const isError = meta.touched && meta.error;
    return (
        <div className={isError ? style.error: undefined}>
            <input {...input} {...props}/>
            {props.text}
            {isError && <span>{meta.error}</span>}
        </div>
    );
};

export const Textarea = ({input, meta, ...props}) => {
    const isError = meta.touched && meta.error;
    return (
        <div className={isError ? style.error: undefined}>
            <textarea {...input} {...props}/>
            {props.text}
            {isError && <span>{meta.error}</span>}
        </div>
    );
};

export const Error = ({message}) => {
    return (
        <div className={style.error}>
            {message}
        </div>
    )
};