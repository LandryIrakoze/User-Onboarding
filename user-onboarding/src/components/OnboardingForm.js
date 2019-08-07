import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form as FormikForm, Field, withFormik } from 'formik';
import 'semantic-ui-css/semantic.min.css';
import * as Yup from 'yup';

import Users from './Users';

const OnboardingForm = ({ errors, touched, values, handleSubmit, status }) => {

    const [users, setUsers] = useState([]);
    console.log(users);

    useEffect(() => {
        if(status) {
            setUsers([...users, status])
        }
    }, [status])

    return (
        <>
            <FormikForm className="ui form">
                <div className="field">
                    <label>Name</label>
                    <Field type="text" name="name" placeholder="Name" className="field"/ >
                    {touched.name && errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div className="field">
                    <label>Email</label>
                    <Field type="email" name="email" placeholder="Email" className="field"/>
                    {touched.email && errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="field">
                    <label>Password</label>
                    <Field type="password" name="password" placeholder="Password"/>
                    {touched.password && errors.password && <p className="error">{errors.password}</p>}                
                </div>
                <div className="field">
                    <Field type="checkbox" name="tos"/>
                    <label>I agree to the Terms of Service</label>
                </div>
                    
                <button className="ui button" type="submit">submit!</button>
            </FormikForm>
        <Users info={users}/>
        </>
    )
}

const FormikOnboarding = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(4).required(),
        tos: Yup.bool().oneOf([true], "Must Accept Terms and Conditions")
    }),

    handleSubmit(values, { setStatus }) {
        axios
            .post('https://reqres.in/api/users_', values)
            .then(res => setStatus(res.data))
            .catch(err => console.error(err.reponse));
    }

})(OnboardingForm)

export default FormikOnboarding;