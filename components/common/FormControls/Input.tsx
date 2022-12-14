import * as React from "react";
import {WrappedFieldProps} from "redux-form";

const Input: React.FC<WrappedFieldProps & {className: string}> = ({input, meta, ...props}) => {
    const showError = meta.touched && meta.error
    return (
        <div>
            <input {...input} {...props} className={props.className + ' ' + (showError ? 'input-error' : '')} />
            {showError &&
                <span className="form-control-error">{meta.error}</span>
            }
        </div>
    )
}

export default Input