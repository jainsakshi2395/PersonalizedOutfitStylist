import React, { useEffect, useRef, useState } from 'react';
import "./NewUser.css";
import  Amplify, { API, Auth, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
// import awsExports from '../aws-exports';
// Amplify.configure(awsExports);


function NewUserForm({ signOut, user }) {
    return (
        <>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </>
      );

//     // Define state variables for the form fields
//     const [userData, setUserData] = useState({ payload: { email: '' } });
//     const [fullname, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     //User Informantion
//     useEffect(() => {
//         fetchUserData();
//     }, []);

//     async function fetchUserData() {
//         await Auth.currentAuthenticatedUser()
//         .then((userSession) => {
//             console.log("userData: ", userSession);
//             setUserData(userSession.signInUserSession.accessToken);
//         })
//         .catch((e) => console.log("Not signed in", e));
//     }

//     async function handleSubmit(event) {
//         event.preventDefault();

//         try {
//           const response = await API.graphql(graphqlOperation(createUser, {input: { name: fullname, email: email, password: password }}));
//           console.log(response);
//           alert("New User Successfully Registered!");
//         } catch (error) {
//           console.log(error);
//           alert("Error creating new user");
//         }
//       }

    


//   return (
//     <div className='recommend'>
//         <div class="container">
//             <div className='content-box2'>
//                 <h2 className='content-title'>Create New User</h2>
//                 <form onSubmit={handleSubmit} encType="multipart/form-data" className="new-user-form">
//                     <label className="form-label">
//                         Name: <input className="form-input" type="text" name="fullname" value={fullname} onChange={(e) => setName(e.target.value)} />
//                     </label>
//                     <label className="form-label">
//                         Email: <input className="form-input" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                     </label>
//                     <label className="form-label">
//                         Password: <input className="form-input" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                     </label>
//                     <button className="form-submit" type="submit">Create User</button>
//                 </form>
//             </div>
//         </div>
//     </div>
//   );
}

// export default NewUserForm;
export default withAuthenticator(NewUserForm);
