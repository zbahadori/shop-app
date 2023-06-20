import React from 'react'

import { useFormik } from 'formik';

function formic() {
    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          username: '',
          password: '',
        },
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });
    return (
        <div>
             <form onSubmit={formik.handleSubmit}>
             <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    // {...formik.getFieldProps('name')}
                />
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />

                <label htmlFor="username">username</label>
                <input
                    id="username"
                    name="username"
                    type="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
            
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default formic
