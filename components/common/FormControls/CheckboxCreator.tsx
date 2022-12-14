import * as React from 'react';
import {WrappedFieldProps} from "redux-form";


export default function CheckboxCreator(htmlFor: string, label: string): React.FC<WrappedFieldProps> {
    return function Checkbox({input, meta, ...props}) {
        const showError = meta.touched && meta.error
        return (
            <div>
                <input {...input} {...props} />
                <label className={'pl-1' + ' ' + (showError ? 'form-control-error' : '')}
                       htmlFor={htmlFor}>{label}</label>
            </div>
        )
    }
}
