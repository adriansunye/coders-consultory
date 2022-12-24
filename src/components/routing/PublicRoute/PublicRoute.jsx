import React from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Home from '@views/Home/Home';
import UpdateUsers from '@components/layout/structuring/Home/UpdateUsers/UpdateUsers';
import ErrorPage from '@views/ErrorPage/ErrorPage';

export class PublicRoute extends React.Component {
    render() {
      return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="user/:id/edit" element={<UpdateUsers />} />
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </Router>
      );
    }
  }
