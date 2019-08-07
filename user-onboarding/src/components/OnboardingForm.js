import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

import Users from './Users';

const OnboardingForm = ({ erros, touched, values, handleSubmit, status }) => {

    const [users, setUsers] = useState([]);
    console.log(users);

    useEffect(() => {
        if(status) {
            setUsers([...users, status])
        }
    }, [status])

    return (
        <>
            <Form>
                <Field type="text" name="name" placeholder="Name"/>
                <Field type="email" name="email" placeholder="Email"/>
                <Field type="password" name="password" placeholder="Password"/>

                <label className="checkbox-container">
                    Terms of Service
                    <Field type="checkbox" name="tos" placeholder="Terms of Service" checked="values.tos"/>
                </label>
                
                <button type="submit">submit!</button>
            </Form>
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
        password: Yup.string().min(8).required()
    }),

    handleSubmit(values, { setStatus }) {
        axios
            .post('https://reqres.in/api/users_', values)
            .then(res => setStatus(res.data))
            .catch(err => console.error(err.reponse));
    }

})(OnboardingForm)

export default FormikOnboarding;