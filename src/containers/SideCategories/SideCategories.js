import React, {useEffect, useCallback } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import SideDrawer from '../../components/Navigation/SideDrwer/SideDrawer';
import NavigationItem from '../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';

const SideCategories = (props) => {

    // const categories = [
    //     { link: '/', name: 'Kategoria 1'},
    //     { link: '/', name: 'Kategoria 2'},
    //     { link: '/', name: 'Kategoria 3'}    
    // ];

    const dispatch = useDispatch();

    const categories = useSelector(state => state.sideCategories.categories);

    const onInitCategories = useCallback(() => dispatch(actions.initCategories()), [dispatch]);

    useEffect(() => {
        onInitCategories();
        console.log("categories inits");
    }, [onInitCategories]);

    return(        
        <SideDrawer 
            isAuth={props.isAuth}
            open={props.isVisible} 
            closed={props.closed}>
            <h1>Kategorie</h1>
            {getCategories()}
            {props.isAuth && <p>Admin:<br /><NavigationItem link="/addCategory" isVertical>Dodaj</NavigationItem></p>}

        </SideDrawer>
    );

    function getCategories()
    {
        if(!categories)
        {
            return <Spinner />;
        }

       return (
            <nav>
                {categories.map(cat => (
                    <NavigationItem key={cat.id} link={cat.link} isVertical>{cat.name}</NavigationItem> 
                ))}
            </nav>
       ); 
    }
}

export default SideCategories;