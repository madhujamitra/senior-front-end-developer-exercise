import { useHistory, useLocation, Link } from 'react-router-dom'
import Button from './Button'
import SearchBar from './SearchBar/SearchBar'
import { SearchState } from '../App'
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle/ThemeToggle';
import React, { useState, useEffect, useRef } from 'react';

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
    const history = useHistory();
    const location = useLocation();
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleLogout = () => {
        logout();
        setIsMobileMenuOpen(false);
    };
    
    const handleDashboard = () => {
        history.push('/dashboard');
        setIsMobileMenuOpen(false);
    };

    // Check if we're on property listing or property detail page
    const currentPath = location.pathname;
    const showDashboard = currentPath === '/' || currentPath.startsWith('/property/');

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Close menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (
                menuRef.current && 
                buttonRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    // Close menu on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMobileMenuOpen]);

    // Close menu on window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1025) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className="header">
            <nav className="header-nav">
                <div className="header-brand">
                    <h1>
                        <Link to="/">{title}</Link>
                    </h1>
                </div>

                {/* Mobile/Tablet Breadcrumb Menu */}
                <div className="header-mobile-menu">
                    <ThemeToggle size="sm" variant="switch" className="mobile-theme-toggle" />
                    <button 
                        ref={buttonRef}
                        className="mobile-menu-toggle"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        ☰
                    </button>
                    <div 
                        ref={menuRef}
                        className={`mobile-menu-dropdown ${isMobileMenuOpen ? 'open' : ''}`}
                    >
                        <ul className="breadcrumb-menu">
                            <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
                            <li><a href="#create-listing" onClick={closeMobileMenu}>Create a Listing</a></li>
                            <li><a href="#live-chat" onClick={closeMobileMenu}>Live Chat</a></li>
                            <li><a href="#faq" onClick={closeMobileMenu}>FAQ</a></li>
                            <li><a href="#contact" onClick={closeMobileMenu}>Contact</a></li>
                            {!user ? (
                                <li><Link to="/login" onClick={closeMobileMenu}>Login</Link></li>
                            ) : (
                                <>
                                    {showDashboard && (
                                        <li><button onClick={handleDashboard}>My Portal</button></li>
                                    )}
                                    <li><button onClick={handleLogout}>Logout</button></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="header-desktop-nav">
                    <SearchBar search={search} setSearch={setSearch} />
                    
                    <div className="header-links">
                        <span className="nav-links">
                            <a href="#create-listing">Create a Listing</a>
                            <span className="separator">|</span>
                            <a href="#live-chat">Live Chat</a>
                            <span className="separator">|</span>
                            <a href="#faq">FAQ</a>
                            <span className="separator">|</span>
                            <a href="#contact">Contact</a>
                        </span>
                    </div>

                    <div className="header-auth">
                        <ThemeToggle size="sm" className="desktop-theme-toggle" />
                        {!user ? (
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <Button color="transparent" text="Login" onClick={() => {}} className="login-btn" />
                            </Link>
                        ) : (
                            <div className="auth-buttons">
                                {showDashboard && (
                                    <Button 
                                        color="transparent" 
                                        text="My Portal" 
                                        onClick={handleDashboard}
                                        className="dashboard-btn"
                                    />
                                )}
                                <Button 
                                    color="transparent" 
                                    text="Logout" 
                                    onClick={handleLogout}
                                    className="logout-btn"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
};

Header.defaultProps = {
    title: 'EXERCISE'
};

export default Header
