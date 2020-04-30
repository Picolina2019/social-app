import React from 'react';
import { Field,reduxForm } from 'redux-form';
import { Input, createField } from '../common/FormsControls/FormsControl';
import { required } from '../../utils/validators/validator';
import { connect } from 'react-redux';
import { login} from '../../redux/authReducer';
import { Redirect } from 'react-router-dom';
import s from '../common/FormsControls/FormsControl.module.css';


const LoginForm = ({handleSubmit, error, captchaUrl})=>{ //destuctization of propd by extracting what we need from them handleSubmit and error
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <Field validate={[required]}  placeholder={'email'} name={'email'} component={Input }/>
                </div>
                <div>
                    <Field validate={[required]} type={'password'}  placeholder={'password'} name={'password'} component={Input}/>
                </div>
                <div>
                    <Field  type={'checkbox'} name={'RememberMe'} component={Input}/>remember me
                </div>
                
                { captchaUrl && <img src={captchaUrl}/> }
                { captchaUrl && createField('Symbols from image', 'captcha',[required], Input, {} )}
                { error && <div className={s.formSummaryError}> {error}

                </div>} 
                <div>
                    <button>Login</button>
                </div>
            </form>
        </div>
    )
}
const LoginReduxForm = reduxForm ({
    form:'login'
}) (LoginForm)


const Login = (props)=>{
    const onSubmit = (formData)=>{
      props.login(formData.email, formData.password,formData.rememberMe, formData.captcha )
    }
    if (props.isAuth){ 
        return <Redirect to={'/profile'}/>
    }
    return(
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}
const mapStateToProps= (state)=>({
    isAuth:state.auth.isAuth,
    captchaUrl:state.auth.captchaUrl
})
export default connect (mapStateToProps, { login }) (Login);