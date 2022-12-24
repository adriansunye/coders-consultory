import React from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Home from '@views/Home/Home';
import UpdateConsult from '@components/layout/structuring/Home/UpdateConsult/UpdateConsult';
import CreateConsult from '@components/layout/structuring/Home/CreateConsult/CreateConsult';
import ErrorPage from '@views/ErrorPage/ErrorPage';

export class PublicRoute extends React.Component {
    render() {
      return (
        <Router>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="consult/create" element={<CreateConsult />} />
                <Route path="consult/:id/edit" element={<UpdateConsult />} />
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </Router>
      );
    }
  }
