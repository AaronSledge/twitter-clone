import "./CreateAccount.css"

function CreateAccount(props) {
    
    return (props.trigger) ? (
        <div className="CreateAccount">
            <div className="content">
                <button className="close" onClick={() => props.setTrigger(false)}>X</button>
                { props.children }
            </div>
        </div>
    ) : "";
}

export default CreateAccount;