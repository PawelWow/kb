import React from 'react';

import SideDrawer from '../../components/Navigation/SideDrwer/SideDrawer';
import NavigationItem from '../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';

import classes from './SideCategories.css';

const SideCategories = (props) => {

    const categories = [
        { link: '/', name: 'Kategoria 1'},
        { link: '/', name: 'Kategoria 2'},
        { link: '/', name: 'Kategoria 3'}    
    ];

    return(
        <SideDrawer 
            isAuth={props.isAuthenticated}
            open={props.isVisible} 
            closed={props.closed}>
            <h1>Kategorie</h1>
            <nav>
                {categories.map(cat => (
                    <NavigationItem link={cat.link} isVertical>{cat.name}</NavigationItem> 
                ))}
            </nav>
        </SideDrawer>
    );
}

export default SideCategories;