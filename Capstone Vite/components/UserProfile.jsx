import React, {useState} from 'react';
import Banner from './Banner.jsx';
import './UserProfile.css';

const UserProfile = () => {
  // Placeholder for user info and their contributions
    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState({ id: 1, name: "User Name", reviews: ["Review 1", "review 2"]});

    const toggleMode = () => {
        setIsLogin(!isLogin);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            console.log('Logging in...')
        }else {
            console.log('Signing up...')
        }
    };

    return (
        <div>
            <Banner isUserProfile={true} />
            {user ? (
                <div>
                    <h1> Welcome, {user.name}!</h1>
                    <h2>My Reviews</h2>
                    <ul>
                        {user.reviews.map((review, index) => {
                            <li key={index}>{review}</li>
                        })}
                    </ul>
                </div>
            ): (
                <div>
            
            <h2> {isLogin ? 'Login' : 'Sign Up'} </h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type ="password" id="password" required />
                </div>
                {isLogin && (
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" id="confirmPassword" required />
                    </div>
                )}
                <button type = "submit" > {isLogin ? 'Login' : 'Sign Up'} </button>
            </form>
            <p>
                {isLogin ? "Don't have an accout? " : "Already have an account? "}
                <button onClick={toggleMode}>
                    {isLogin ? 'Sign Up here' : 'Login here'}
                </button>
            </p>
        </div>
    )}
    </div>
    );
};

export default UserProfile;
