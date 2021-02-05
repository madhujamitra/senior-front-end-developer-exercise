import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'
import { Link } from 'react-router-dom'


/*interface Props {
    title?: string
}
*/

interface HeaderProps {
    title: string,
    onAdd: () => void,
    showAdd?: boolean
}

const Header = ({ title, onAdd, showAdd }: HeaderProps) => {

    const location = useLocation();

    return (
        <header className="header">
            <h1>
                <div>
                    <Link to="/">{title}</Link>
                    <input type="search" style={{ margin: "30px" }} />
                </div>
            </h1>
            <div>
                <span>Create a Listing | Live Chat | FAQ | Contact</span>
                {location.pathname === '/' && <Button color={showAdd ? 'red' : 'green'}
                    text={showAdd ? 'Close' : 'Login'} onClick={onAdd} />}
            </div>

        </header>
    )
};

Header.defaultProps = {
    title: 'EXERCISE'
};

export default Header
