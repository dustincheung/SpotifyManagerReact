import React from "react";
import {Field, reduxForm} from "redux-form";//import Field component and reduxForm function

class PlaylistForm extends React.Component{

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
				<label>{formProps.label}</label>
				<input {...formProps.input}/>			
				{this.renderError(formProps.meta)}
			</div>
		); 
	}

	onSubmit = (formValues) =>{
		this.props.onSubmit(formValues); //calls onSubmit that is passed down in props
	}

	//handleSubmit is a redux-form method
	//Field is just a container component we use component prop to actually render what we want to show
	//the method in component is automatically called with formProps, our callback onSubmit is auto called
	//with argument formValues which contains the values of the inputs
	render(){
		return(
			<form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
				<Field name="name" label="Playlist Name: " component={this.renderInput}/>
				<Field name="description" label="Description: " component={this.renderInput}/>
				<button className="fluid ui button"> Submit </button>
			</form>
		);
	}
}


//returns empty errors object if no errors, if there are it will add a key value pair to errors obj and return 
//if a key in the error obj has a key that matches a field name it is auto passed in an argument named formProps.meta
//that is called in renderInput
const validate = (formValues) => {
	const errors ={};

	if(!formValues.name){
		errors.name = "Please enter a name";
	}

	if(!formValues.description){
		errors.description = "Please enter a description";
	}

	return errors;
}


//connecting form with redux, pass in form name, and validate function to handle input validation
//hooking up validate
export default reduxForm({form: "PlaylistForm", validate: validate})(PlaylistForm);