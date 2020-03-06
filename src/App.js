import React, { useEffect, Suspense } from 'react';
import {Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

function App(props) {
  
  const { onTryAutoSignup } = props;
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{getRoutes(props)}</Suspense>
      </Layout>
    </div> 
  );

  function getRoutes(props) {
    if( props.isAuthenticated ) {     
      
      // Dodałem /auth i teraz działa - widocznie skaszaniło się, bo w kursie podział na ścieżki dla auth/unauth nastąpił, ale
      // w kursie jeszcze nie sprawdzono czy wszystko działa. Tak czy siak, cały dzień w pizdu
      return(
        <Switch>                       
          <Route path="/auth" render={(props) => <Auth {...props} />} /> 
          <Route path="/logout" component={Logout} />          
          <Redirect to="/" />   
        </Switch>
      );
    }
    
    return(
      <Switch>   
        <Route path="/auth" render={(props) => <Auth {...props} />} /> 
        <Route path="/" exact render={() => <h1>Home</h1>} />
        <Redirect to="/" />       
      </Switch>
    );
  }  
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ));
