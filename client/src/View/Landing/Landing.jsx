import React from 'react'
import styles from './Landing.module.css'
import validation from './validationlog'
import 'boxicons'

const Landing = ( props) => {
    const [userData, setUserData] = React.useState({
        email:"",
        password:"",
    })

    const [errors, setErrors] = React.useState({});
    
    const handleChange = (event) =>{
        const {name, value} = event.target;
        setUserData ({
            ...userData,
            [name]: value,
        })
        setErrors (validation({
            ...userData,
            [name]:value,
        }))
    }
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        props.login(userData);
    }
    
    return(
        <div className={styles.container}>
            <div className={styles.backgroundOverlay}></div>
            <div className={styles.image}>
                <h1 className={styles.h1} >Dogs</h1>
            </div>
            <div className={styles.formContainer}>
            <h1 className={styles.h1}>Login </h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.input}>
            <input 
            placeholder='Email'
            className={styles.form}
            type="text"
            name='email'
            value={userData.email}
            onChange={handleChange} 
            /> 
            <box-icon type='solid' name='dog'></box-icon>
            </div>
            <div className={styles.input}>
            <input 
            placeholder='Password'
            className={styles.form}
            type="password"
            name='password' 
            value={userData.password}
            onChange={handleChange}
            />
            <box-icon type='solid' name='lock'></box-icon>
            </div>
            <button type='submit' className={styles.btn}>Login</button>
            </form>
            </div>
            
        </div>
    )
}
export default Landing;