import React from "react";
import {Field, reduxForm} from "redux-form";//import Field component and reduxForm function

class TracksForm extends React.Component{

	renderError(meta){								//helper function to display errors after input is touched
		if(meta.touched && meta.error){
			return(
				<div className="ui error message">
					<div className="header">
						{meta.error}
					</div>
				</div>
			);
		}
	}

												//helper function that has formProps (label, input, meta)
	renderInput = (formProps) => {				//used arrow function to protect this context
		return(
			<div className="field">				
				<p className="lead" style={{paddingBottom: ".1em", fontSize: "1em"}}>
    				{formProps.label}
    			</p>	
				<input {...formProps.input}/>		
				{this.onChange()}
				{this.renderError(formProps.meta)}
			</div>
		); 
	}

	onChange = (formValues) =>{
		this.props.onChange(formValues); //calls onSubmit that is passed down in props
	}

	//handleSubmit is a redux-form method
	//Field is just a container component we use component prop to actually render what we want to show
	//the method in component is automatically called with formProps, our callback onSubmit is auto called
	//with argument formValues which contains the values of the inputs
	render(){
		return(
			<form className="ui form error">
				<Field name="searchTerm" label="Search for Tracks: " component={this.renderInput}/>
			</form>
		);
	}
}


//returns empty errors object if no errors, if there are it will add a key value pair to errors obj and return 
//if a key in the error obj has a key that matches a field name it is auto passed in an argument named formProps.meta
//that is called in renderInput
const validate = (formValues) => {
	const errors ={};

	if(!formValues.searchTerm){
		errors.searchTerm = "Please enter a track";
	}
	return errors;
}


//connecting form with redux, pass in form name, and validate function to handle input validation
//hooking up validate
export default reduxForm({form: "TracksForm", validate: validate})(TracksForm);