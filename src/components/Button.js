import PropTypes from 'prop-types'

const Button = ({ color, text, onBtnClick }) => {

    return (
        <button style={{ backgroundColor: color }} 
            className='btn'
            onClick={ onBtnClick }
        > { text }</button>
    )
}

Button.defaultProps = {
    color: 'steelblue'
}

Button.prototype = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button