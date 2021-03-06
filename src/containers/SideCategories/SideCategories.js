import React, {useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import SideDrawer from '../../components/Navigation/SideDrwer/SideDrawer';
import NavigationItem from '../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';

import classes from './SideCategories.css';

const SideCategories = (props) => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.auth.token);    
    const categories = useSelector(state => state.categories.collection);

    const onDeleteCategory = (id) => dispatch(actions.deleteCategory(id, token));

    const onInitCategories = useCallback(() => dispatch(actions.initCategories()), [dispatch]);

    // co jakiś czas powinniśmy ten init odpalać jednak, jakiś timer czy coś?
    useEffect(() => {
        onInitCategories();
    }, [onInitCategories]);

    return(        
        <SideDrawer 
            isAuth={props.isAuth}
            open={props.isVisible} 
            closed={props.closed}>
            <h1>Kategorie</h1>
            {getCategories()}
            {props.isAuth && getAuthSection()}

        </SideDrawer>
    );

    function getAuthSection(){
        return(
            <Aux>
                <p>Administracja:</p>
                <nav>
                    <NavigationItem link="/categories/add" isVertical>Nowa kategoria</NavigationItem>
                    <NavigationItem link="/articles/add" isVertical>Nowy artykuł</NavigationItem>
                </nav>
            </Aux>
        );
    }

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
                (<NavLink key={elementId} to={link} exact>edit</NavLink>, <button onClick={() => onDeleteCategory(cat.id)}>Delete</button>)               
            </div>
            
        );
    }
}

export default SideCategories;