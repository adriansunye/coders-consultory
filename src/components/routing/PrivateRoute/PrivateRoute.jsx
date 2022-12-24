import React from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Profile from '@views/Profie/Profie';
import ErrorPage from '@views/ErrorPage/ErrorPage';

export default class PrivateRoute extends React.Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path="/profile:user" element={<Profile />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Router>
        );
    }
}
