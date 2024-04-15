import UserForm from "../components/UserForm"


const LoginRegister = () => {

    return (
        <div className="container mt-3">
            <h1 className="text-center"> Login & Registration</h1>
            <hr />
            <div className="row">
                <div className="col-6">
                    <UserForm formType="login" />
                </div>
                <div className="col-6">
                    <UserForm formType="register" />
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;