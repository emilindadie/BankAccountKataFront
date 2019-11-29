import React, { useState } from 'react';
import useAuth from '../../contexts/auth';

export function Home() {
    const {
        state: { user },
        dispatch,
    } = useAuth();

    return (
        <div>
            <p>Home</p>
        </div>
    );
}

export default Home;
