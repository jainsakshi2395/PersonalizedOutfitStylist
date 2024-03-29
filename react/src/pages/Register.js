import React, { useState, useEffect } from "react";
import "./Register.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postProfile } from "../redux/profile/profileAction";
import { postInitialRecommend } from "../redux/initialRecommend/initialRecommendAction";
import { Auth, Amplify } from "aws-amplify";
import { fetchProfileDetails } from "../redux/profileDetails/profileDetailsAction";
import { useSelector } from "react-redux";
import { updateProfile } from "../redux/updateProfile/updateProfileAction";
// Amplify.Logger.LOG_LEVEL = 'DEBUG';

   
function Register() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector(
    (state) => state.profileDetails.profileDetails
  );
  const [age, setAge] = useState(userProfile.age);
  const [height, setHeight] = useState(userProfile.height);
  const [bust, setBust] = useState(userProfile.bust);
  const [waist, setWaist] = useState(userProfile.waist);
  const [hip, setHip] = useState(userProfile.hip);
  const [userId, setUserId] = useState(null);
  const [userName, setUsername] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
        setUserId(currentUser.attributes.sub);
        setUsername(currentUser.username);
        dispatch(fetchProfileDetails(currentUser.attributes.sub));
      } catch (error) {
        console.log("Error getting current user: ", error);
      }
    }

    getCurrentUser();
  }, []);

  useEffect(() => {
    setAge(userProfile.age);
    setHeight(userProfile.height);
    setBust(userProfile.bust);
    setWaist(userProfile.waist);
    setHip(userProfile.hip);
  }, [userProfile]);
  useEffect(() => {
    setProfileState({
      user_id: userId || "",
      age: age,
      name: userName || "",
      height: height,
      waist: waist,
      bust: bust,
      hip: hip,
    });
  }, [age, height, waist, bust, hip, userId, userName]);

  const [profileState, setProfileState] = useState({
    user_id: user?.attributes.sub || "",
    age: age,
    name: user?.username || "",
    height: height,
    waist: waist,
    bust: bust,
    hip: hip,
  });

  const mapProfileState = (profileState) => {
    return {
      user_age: profileState.age,
      user_height: profileState.height,
      user_bust: profileState.bust,
      user_waist: profileState.waist,
      user_hip: profileState.hip,
    };
  };
  
  const isValidState = (profileState) => {
    let valid = false;
    if(profileState.age < 1 || profileState.age > 40) {
      setError("Age must be between 1 and 40");
    } else if(profileState.bust < 30 || profileState.bust > 60) {
      setError("Bust must be between 30 and 60");
    } else if(profileState.waist < 22 || profileState.waist > 50) {
      setError("Waist must be between 22 and 50");
    } else if(profileState.hip < 30 || profileState.hip > 60) {
      setError("Hip must be between 30 and 60");
    } else { valid = true; }
    return valid;
  }

  const submitProfile = (event) => {
    event.preventDefault();
    if(isValidState(profileState)){
      if (!Object.keys(userProfile).length) {
        dispatch(postProfile(profileState));
      } else {
        dispatch(updateProfile(profileState));
      }
      const initalRecState = mapProfileState(profileState);
      dispatch(postInitialRecommend(initalRecState));
      navigate("/recommend");
    }
  };
  return (
    <form onSubmit={(e) => submitProfile(e)}>
      <div className="welcomeUser">
        <div className="container">
          {user ? (
            <div>
              <p>
                Welcome, {user.username}! <br />
                Please fill out the below details to get your preferred
                recommendations.
                <br />
              </p>
            </div>
          ) : (
            <p>You are not authenticated.</p>
          )}
        </div>
      </div>
      <div className="register-container">
        <div className="content-box">
          <h2 className="content-title">Profile Details</h2>
          <div className="fields-container">
            {error && <div className="error-text">{error}</div>}
            <div className="profile-field">
              <label className="bold-text" htmlFor="age">Age</label>
              <input
                className="input-field"
                name="age"
                onChange={(e) => setAge(Number(e.target.value))}
                type="number"
                value={age}
                placeholder="0"
                required
              />
            </div>
            <div className="profile-field">
              <label className="bold-text" htmlFor="height">Height(cm)</label>
              <input
                className="input-field"
                name="height"
                onChange={(e) => setHeight(Number(e.target.value))}
                type="number"
                value={height}
                placeholder="0"
                required
              />
            </div>
            <div className="profile-field">
              <label className="bold-text" htmlFor="bust">Bust(in)</label>
              <input
                className="input-field"
                name="bust"
                onChange={(e) => setBust(Number(e.target.value))}
                type="number"
                value={bust}
                placeholder="0"
                required
              />
            </div>
            <div className="profile-field">
              <label className="bold-text" htmlFor="waist">Waist(in)</label>
              <input
                className="input-field"
                name="waist"
                onChange={(e) => setWaist(Number(e.target.value))}
                type="number"
                value={waist}
                placeholder="0"
                required
              />
            </div>
            <div className="profile-field">
              <label className="bold-text" htmlFor="hips">Hips(in)</label>
              <input
                className="input-field"
                name="hips"
                onChange={(e) => setHip(Number(e.target.value))}
                type="number"
                value={hip}
                placeholder="0"
                required
              />
            </div>
            <button className="save-button" type="submit">
              SAVE
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Register;
