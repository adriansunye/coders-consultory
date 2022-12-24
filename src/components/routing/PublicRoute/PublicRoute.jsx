import React from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Home from '@views/Home/Home';
import Edit from '@views/Edit/Edit';
import Create from '@views/Create/Create';
import ErrorPage from '@views/ErrorPage/ErrorPage';

export class PublicRoute extends React.Component {
    render() {
      return (
        <Router>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="consult/create" element={<Create />} />
                <Route path="consult/:id/edit" element={<Edit />} />
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </Router>
      );
    }
  }
