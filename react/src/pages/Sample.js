import React, { useState } from 'react';
import { API } from 'aws-amplify';
// import { withAuthenticator } from 'aws-amplify-react';

function NewUserForm() {
  // Define state variables for the form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    // event.preventDefault();
    // await API.post('MyAPI', '/items', { body: data });
  };

  const handleChange = (event) => {
    // setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
            <div className='recommend'>
                <div class="container">
                    <div className='content-box2'>
                        <h2 className='content-title'>Create New User</h2>
                        <form onSubmit={handleSubmit} className="new-user-form">
                            <label className="form-label">
                                Name: <input className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </label>
                            <label className="form-label">
                                Email: <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </label>
                            <label className="form-label">
                                Password: <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </label>
                            <button className="form-submit" type="submit">Create User</button>
                        </form>
                    </div>
                </div>
            </div>
        );
}

export default NewUserForm;
