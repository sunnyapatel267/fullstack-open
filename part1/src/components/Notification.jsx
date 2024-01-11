const Notification = ({ message,logic }) => {
    if(message === null){
        return null
    }

    if(logic === true){
        return (
        <div className='success'>
            {message}
        </div>
        )
    }else{
        return (
        <div className='error'>
            {message}
        </div>
        )
    }
}

export default Notification