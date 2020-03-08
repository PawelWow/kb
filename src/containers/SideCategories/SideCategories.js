import React, {useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SideDrawer from '../../components/Navigation/SideDrwer/SideDrawer';
import NavigationItem from '../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';

import classes from './SideCategories.css';

const SideCategories = (props) => {
    const dispatch = useDispatch();

    const categories = useSelector(state => state.sideCategories.categories);

    const onInitCategories = useCallback(() => dispatch(actions.initCategories()), [dispatch]);

    useEffect(() => {
        onInitCategories();
        console.log("categories inits");
    }, [onInitCategories]);

    const onEditCategory = (event, categoryId) => {
        console.log(props);
        //props.history.replace('/categories/edit/'+ categoryId);
    }

    return(        
        <SideDrawer 
            isAuth={props.isAuth}
            open={props.isVisible} 
            closed={props.closed}>
            <h1>Kategorie</h1>
            {getCategories()}
            {props.isAuth && <p>Admin:<br /><NavigationItem link="/categories/add" isVertical>Dodaj</NavigationItem></p>}

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
                                       
                    <NavigationItem key={cat.id} link={cat.link} extras={createExtras(cat)} isVertical>{cat.name}</NavigationItem>
                ))}
            </nav>
       ); 
    }

    function createExtras(cat){
        
        if(!props.isAuth)
        {
            return;
        }
        
        const elementId = 'edit' + cat.id;
        const link = '/categories/edit/' + cat.id;

        return (
            <div className={classes.Extras}>
                (<NavLink key={elementId} to={link} exact>edit</NavLink>)                
            </div>
            
        );
    }
}

export default SideCategories;