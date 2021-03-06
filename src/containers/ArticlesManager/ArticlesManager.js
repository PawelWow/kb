import React, {useState} from 'react';
import { useDispatch, useSelector  } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import * as inputDefs from '../../components/UI/Input/inputDefs';
import * as actions from '../../store/actions/index';

import { updateObject, checkIsValid, checkFormIsValid } from '../../shared/utility';

import classes from './ArticlesManager.css';

const ArticlesManager = (props) => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.auth.token);    
    const categories = useSelector(state => state.categories.collection);

    const [articleLink, setArticleLink] = useState('');

    const onAddArticle = (details, content) => dispatch(actions.addArticle(details, content, token));

    const [isDone, setIsDone] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const [articleForm, setArticleForm] = useState({
        title: {
            elementType: inputDefs.INPUT_TYPE_INPUT,
            elementConfig: {
                type: 'text',
                placeholder: 'Tytuł'
            },
            value: '',
            validation: {
                required: true,
                minLength: 3,
                isAlphanumeric: true
            },
            isValid: false,                
            isTouched: false
        },
        content: {
            elementType: inputDefs.INPUT_TYPE_TEXTAREA,
            elementConfig: {
                type: 'text',
                placeholder: 'Treść'
            },
            value: '',
            validation: {
                required: true,
                minLength: 20,
                isAlphanumeric: true
            },
            isValid: false,                
            isTouched: false
        },
        category: {
            elementType: inputDefs.INPUT_TYPE_SELECT,
            elementConfig: {
                options: getCategoriesSelector()
            },
            // dajemy wartość domyślną dla switcha, bo bez tego nie będzie żadnej wartości w bazie
            value: inputDefs.INPUT_TYPE_SELECT_VALUE_DEFAULT,
            validation: {
                prohibitValue: inputDefs.INPUT_TYPE_SELECT_VALUE_DEFAULT
            },
            isValid: false,
            isTouched: false
        }
    });

    const onInputChanged = (event, controlName) => {
        const updatedControls = updateObject(articleForm, {            
            [controlName]: updateObject(articleForm[controlName], {                
                value: event.target.value,
                isValid: checkIsValid(event.target.value, articleForm[controlName].validation),
                isTouched: true
            })
        });

        setArticleForm(updatedControls);

        if(controlName === "title"){
            // robimy unikalny link - nie chcemy artów po id wyświetlać
            // TODO ale z polskich znaków może wywalać ogonki tylko
            const pattern = /[^a-zA-Z0-9]+/g;        
            const validLink = event.target.value.trim().toLowerCase().replace(pattern, '_');
            setArticleLink(validLink);
        }

        setIsFormValid(checkFormIsValid(updatedControls))
    }       

    const onSubmit = (event) => {
        event.preventDefault();
       
        if(props.match.params.id){
            // eidt
        } else {            
            const data = getArticleData(articleForm, false);
            onAddArticle(data.details, data.content);
        }

       setIsDone(true);
    }


    return <div className={classes.ArticlesManager}>{isDone ? <p>Done!</p> : showForm()}</div>;

    function getCategoriesSelector(){
        const categoriesToSelect = [{value: inputDefs.INPUT_TYPE_SELECT_VALUE_DEFAULT, displayValue: 'Wybierz...'}];
        categories.map( category => {
            categoriesToSelect.push({value: category.id, displayValue: category.name})
        });

        return categoriesToSelect;
    }

    function getFormElements(form) {
        const formElementsArray = [];
        for( let key in form ) {
            formElementsArray.push( {
                id: key,
                config: form[key]
            });
        }
        return formElementsArray;
    }

    function showForm(){
        const formElementsArray = getFormElements(articleForm);

        return (            
            <form onSubmit={onSubmit}>
                <p>Link: /{articleLink}</p>
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
        
            <Button btnType="Success" disabled={!isFormValid}>SUBMIT</Button>
            </form>                 
        );
    }

    function getArticleData(form, isEdit){
        const data = [];
        for(let formElementIdentifier in form) {
            if(formElementIdentifier === 'content'){
                // treść osobno
                continue;
            }

            data[formElementIdentifier] = form[formElementIdentifier].value;
        }

        const dateNow = new Date();
        if(isEdit){
            data["edited"] = dateNow;
            data["editor"] = "pawel@";
        }
        else {            
            data["created"] = dateNow;
            data["edited"] = dateNow;
            data["editor"] = "pawel@";
            data["author"] = "pawel@";          
        }       
        
        const content = form["content"].value;
        data["description"] = createArticleDescription(content);
        data["link"] = articleLink;

        return {details: data, content: content};
    }

    // zwraca opis jako określona ilość znaków z contentu
    function createArticleDescription(content){
        const descriptionLength = 100;
        if(content.length > descriptionLength){
            return content.substring(0, descriptionLength) + '...';
        }else {
            return content;
        }
    }
}

export default ArticlesManager;