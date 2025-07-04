import PropTypes from 'prop-types'
import { useLocation, useHistory, Link } from 'react-router-dom'
import Button from './Button'
import SearchBar from './SearchBar/SearchBar'
import { SearchState } from '../App'
import { useAuth } from '../context/AuthContext';
import React from 'react';

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
    const history = useHistory();
    const { user, logout } = useAuth();

    const handleLogout = () => logout();
    const handleDashboard = () => history.push('/dashboard');

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
                {!user ? (
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <Button color="green" text="Login" onClick={() => {}} />
                    </Link>
                ) : (
                    <>
                        <Button color="#bc3b3b" text="Dashboard" onClick={handleDashboard} />
                        <Button color="#888" text="Logout" onClick={handleLogout} />
                    </>
                )}
            </div>
        </header>
    )
};

Header.defaultProps = {
    title: 'EXERCISE'
};

export default Header
