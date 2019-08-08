import React from 'react';
import 'semantic-ui-css/semantic.min.css';

const Users = ({ info }) => {
    console.log('user props', info);

    return (
        <div className="ui cards">
            {info.map(item => (
                <div className="card" key={item.id}>
                    <div class="header">
                        {item.name}
                    </div>
                    <div className="description">
                        {item.email}
                    </div>
                    <div className="description">
                        Password: {item.password}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Users;