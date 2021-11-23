import Button from "./Button"
import { useLocation } from 'react-router-dom'

const Header = ({ title, onAdd, showAdd }) => {

    const location = useLocation()

    return (
        <header className="header">
            <h1>{ title }</h1>
            {location.pathname === '/' &&
                <Button color={showAdd ? "red" : "green"} 
                    text={showAdd ? "Close" : "Add"} onBtnClick={onAdd} 
                />
            }
        </header>
    )
}

Header.defaultProps = {
    title: "Defalt Header"
}

export default Header