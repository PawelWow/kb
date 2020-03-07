import React, { useState  } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { updateObject, checkIsValid } from '../../shared/utility';
import * as actions from '../../store/actions/index';

const CategoryManager = (props) => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.auth.token);

    const [categoryLink, setCategoryLink] = useState(false);

    const onAddCategory = category => dispatch(actions.addCategory(category, token));

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
        const validLink = event.target.value.trim().toLowerCase().replace(pattern, '_');
        setCategoryLink(validLink);

    }    

    const onSubmit = (event) => {
        event.preventDefault();
        onAddCategory(getCategoryData());       
    }


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
                    <p>Link: {categoryLink}</p>
            <Button btnType="Success">SUBMIT</Button>                
        </form>
    );

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
}

export default CategoryManager;