import React, { useState, useEffect, useCallback  } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { updateObject, checkIsValid } from '../../shared/utility';
import * as actions from '../../store/actions/index';

import classes from './CategoriesManager.css';

const CategoryManager = (props) => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.auth.token);        
    const categories = useSelector(state => state.categories.collection);
    const changesCount = useSelector(state => state.categories.changesCount);
    
    const [categoryLink, setCategoryLink] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const onAddCategory = category => dispatch(actions.addCategory(category, token));
    const onEditCategory = (id, category) => dispatch(actions.editCategory(id, category, token));
    const onSetCategories = categories => dispatch(actions.setCategories(categories));
    
    const [categoryForm, setCategoryForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Category name'
            },
            value: '',
            validation: {
                required: true,
                minLength: 3,
                isAlphanumeric: true
            },
            isValid: false,                
            isTouched: false
        }                    
    });

    // Tylko jeśli zmienią się propsy kategorii
    useEffect(() => {

        if(!props.match.params.id){
            // To nie jest edycja kategorii więc czyścimy formularz tylko
            setInitialForm({name: '', link: ''});
            return;
        }

        const result = categories.filter( c => c.id === props.match.params.id);
        if(!result){
            console.log('no such category');  
            setInitialForm({name: '', link: ''});          
            return;
        }
        
        setInitialForm(result[0]);

    }, [props.match.params.id]);

    const onInputChanged = (event, controlName) => {
        const updatedControls = updateObject(categoryForm, {            
            [controlName]: updateObject(categoryForm[controlName], {                
                value: event.target.value,
                isValid: checkIsValid(event.target.value, categoryForm[controlName].validation),
                isTouched: true
            })
        });

        setCategoryForm(updatedControls);

        // usuń spacje i inne
        const pattern = /[^a-zA-Z0-9]+/g;        
        const validLink = '/'+event.target.value.trim().toLowerCase().replace(pattern, '_');
        setCategoryLink(validLink);

        setIsFormValid(checkFormIsValid(updatedControls))

    }    

    const onSubmit = (event) => {
        event.preventDefault();

        const category = getCategoryData();
        if(props.match.params.id){
            const categoryId = props.match.params.id; 
            onEditCategory(categoryId, category);

            const updatedCategories = categories.filter( cat => cat.id !== categoryId);
            updatedCategories.push({...category, id: categoryId});
            onSetCategories(updatedCategories);
        } else {
            onAddCategory(category);  

            // const updatedCategories = {...categories};
            // updatedCategories.push(category);
            // onSetCategories(updatedCategories);
        }



        setIsDone(true);
        //onChange();
        
        console.log("after submit changes count: " + changesCount);
        
        props.history.replace('/');
        
    }

    return (
        <div className={classes.CategoriesManager}>
            {isDone ? <p>Done with {categoryForm["name"].value}</p> : showForm()}           
        </div>
    );

    function showForm(){
        const formElementsArray = getCategoryormElements();

        return (
            <form onSubmit={onSubmit}>
                {formElementsArray.map( formElement => (                
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.isValid}
                    shouldValidate={formElement.config.validation}
                    isTouched={formElement.config.isTouched}
                    changed={( event ) => onInputChanged( event, formElement.id )}
            />))}
            <p >Link: {categoryLink}</p>
            <Button btnType="Success" disabled={!isFormValid}>SUBMIT</Button>                
        </form>  
        );
    }

    function getCategoryData(){
        const categoryData = {};
        for(let formElementIdentifier in categoryForm) {
            categoryData[formElementIdentifier] = categoryForm[formElementIdentifier].value;
        }

        categoryData["link"] = categoryLink;

        return categoryData;
    } 
    
    function getCategoryormElements() {
        const formElementsArray = [];
        for( let key in categoryForm ) {
            formElementsArray.push( {
                id: key,
                config: categoryForm[key]
            });
        }
        return formElementsArray;
    }

    // Jeśli jaki element formularza nie jest walidny to zwraca false - 
    function checkFormIsValid(form)
    {        
        for(let inputIdentifier in form){
            
            if(form[inputIdentifier].isValid === false)
            {

                return false;
            }
        }

        return true;
    }    

    function setInitialForm(category)
    {
        const formData = updateObject(categoryForm, {            
            name: updateObject(categoryForm["name"], {                
                value: category.name,
                isValid: true,
                isTouched: false
            })});

        setCategoryForm(formData);
        setCategoryLink(category.link);
        setIsDone(false);
    }
}

export default CategoryManager;