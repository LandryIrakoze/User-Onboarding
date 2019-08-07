import React from 'react';

const Users = ({ info }) => {
    console.log('user props', info);

    return (
        <>
            {info.map(item => (
                <>
                    <p>{item.name}</p>
                    <p>{item.email}</p>
                    <p>Password: {item.password}</p>
                    <p>{item.tos}</p>
                    <p>ID: {item.id}</p>
                </>
            ))}
        </>
    )
}

export default Users;