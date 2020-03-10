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

    const token = useSelector(state => state.auth.token);    
    const categories = useSelector(state => state.categories.collection);
    const changesCount = useSelector(state => state.categories.changesCount);

    const onDeleteCategory = (id) => dispatch(actions.deleteCategory(id, token));

    const onInitCategories = useCallback(() => dispatch(actions.initCategories()), [dispatch]);

    // changes count przeładowuje kategorie 2 x. Można to przemyśleć w takim razie robiąc jakiś timer - inkrementujemy, a 
    // timer wyzeruje (wtedy powtórzymy ładowanie tylko po jakimś czasie)
    // albo za bardzo działam na bakendzie - może edyccja powinna być w 2 miejscach - tutaj i w bazie, a reload zrobimy tylko tutaj
    useEffect(() => {
        onInitCategories();
    }, [onInitCategories, changesCount]);

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

        console.log("cats:");
        console.log(categories);

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