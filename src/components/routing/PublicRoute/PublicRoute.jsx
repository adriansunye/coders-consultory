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
import Registration from '@views/Registration/Registration';
import SelectCoder from '@views/SelectCoder/SelectCoder';
import Login from '@views/Login/Login';

export class PublicRoute extends React.Component {
    render() {
      return (
        <Router>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="registration" element={<Registration/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="/consult/selectCoder/createConsult" element={<Create/>} />
                <Route path="consult/selectCoder" element={<SelectCoder/>} />
                <Route path="consult/:id/edit" element={<Edit/>} />
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </Router>
      );
    }
  }
