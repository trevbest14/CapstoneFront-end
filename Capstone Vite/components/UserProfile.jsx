import React from 'react';

function UserProfile() {
  // Placeholder for user info and their contributions
    const user = { id: 1, name: "User Name", reviews: ["Review 1", "Review 2"] };

    return (
        <div>
        <h1>{user.name}</h1>
        <h2>My Reviews</h2>
        <ul>
            {user.reviews.map((review, index) => (
            <li key={index}>{review}</li>
            ))}
        </ul>
        </div>
    );
}

export default UserProfile;
