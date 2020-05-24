/*  
 *  TracksForm renders redux form that has a field that allows a user to type in search term
 */

import React from "react";
import {Field, reduxForm} from "redux-form"; //import Field component and reduxForm function

class TracksForm extends React.Component{
	
	render(){
		return(
			<form className="ui form error">
				<Field name="searchTerm" label="Search for Tracks: " component={this.renderInput}/>
			</form>
		);
	}

	onChange = (formValues) => {
		this.props.onChange(formValues); //calls onSubmit that is passed down in props
	}

	renderInput = (formProps) => {				
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

	renderError = (meta) => {		
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
}

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