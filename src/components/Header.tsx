import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar/SearchBar'
import { SearchState } from '../App'


/*interface Props {
    title?: string
}
*/

interface HeaderProps {
    title: string,
    onAdd: () => void,
    showAdd?: boolean,
    search: SearchState,
    setSearch: (search: SearchState) => void
}

const Header = ({ title, onAdd, showAdd, search, setSearch }: HeaderProps) => {

    const location = useLocation();

    return (
        <header className="header">
            <h1>
                <div>
                    <Link to="/">{title}</Link>
                </div>
            </h1>
            <SearchBar search={search} setSearch={setSearch} />
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
