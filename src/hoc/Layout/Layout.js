import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideCategories from '../../containers/SideCategories/SideCategories';

import classes from './Layout.css';

const Layout = props => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const onSideCategoriesClosed = () => {
        setSideDrawerIsVisible(false);
    }

    const onSideCategoriesToggle = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    }

    return (
        <Aux>
            <Toolbar 
                isAuth={props.isAuthenticated}
                drawerToggleClicked={onSideCategoriesToggle} />
            <SideCategories 
                isAuth={props.isAuthenticated}
                isVisible={sideDrawerIsVisible} 
                closed={onSideCategoriesClosed} />
             <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)( Layout );