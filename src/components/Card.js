import PropTypes from 'prop-types';

const Card = ({post, children, onClick}) => {
    return (
        <div 
            className="card mb-3"
            onClick={onClick}
        >
            <div className="card-body">
                <h1>{post.title}</h1>
                <div className="d-flex justify-content-between">
                    {post.body}
                    {children && <div >{children}</div>}
                </div>
            </div>
        </div>
    );
}

Card.PropType = {
    onClick : PropTypes.func
}

Card.defaultProps ={
    post: null,
    title : 'Title',
    body : 'Body',
    children : null,
    onClick: () => {}
}

export default Card;