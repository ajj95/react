import propTypes from 'prop-types';

const Toast = ({toasts, deleteToast}) => {

    return (
        <>
        <div className="position-fixed bottom-0 end-0 p-2">
            {toasts.map(toast => (
                <div 
                    key={toast.id}
                    onClick={() => {deleteToast(toast.id)}}
                    className={`alert alert-${toast.type || 'success'} m-0 py-2 mt-2`} role="alert">
                    {toast.text}
                </div>
            ))}
        </div>
        </>

    );
}

Toast.propTypes = {
    toasts : propTypes.arrayOf(
        propTypes.shape({
            text : propTypes.string,
            type : propTypes.string
    })),
    deleteToast : propTypes.func.isRequired
}

Toast.defaultProps = {
    toasts: []
}

export default Toast;