import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../theme/GlobalStyle';
import { Footer } from './Footer';
import { slide as Menu } from 'react-burger-menu';
import '../styles/burgerStyle.css';

// import '../style/all.scss';
import { darkTheme, lightTheme } from '../theme';
import Navbar from './Navbar';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Header } from './Header';

const ModeButton = styled.button`
  background: none;
  border: 0;
  padding: 1rem;
  right: 0;
  position: fixed;
  z-index: 999;
  cursor: pointer;
  :focus {
    border: 0;
    outline: none;
  }
`;

const useHandleMenu = () => {
  const [isLoading, setIsLoding] = useState('is-loading');
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const Toggle = () => {
    isMenuVisible ? setIsMenuVisible(true) : setIsMenuVisible(false);
  };
};

const Layout = ({ children }: { children: any }) => {
  const stored = typeof window !== 'undefined' && localStorage.getItem('isDarkMode');
  const [isDarkMode, setIsDarkMode] = useState(stored === 'true' ? true : false);

  const toggelThemeMode = () => {
    setIsDarkMode(!isDarkMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('isDarkMode', `${!isDarkMode}`);
    }
  };

  const showSettings = (event: any) => {
    event.preventDefault();
  };

  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          menuLinks {
            name
            link
          }
        }
      }
    }
  `);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <>
      <Header site={data.site}>
        たかなろーどまっぷ
      </Header>
          <GlobalStyle />
          <ModeButton onClick={toggelThemeMode}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isDarkMode ? '#fff' : '#000'}
              stroke={isDarkMode ? '#fff' : '#000'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </ModeButton>
          {children}
          <Footer />
      </>
    </ThemeProvider>
  );
};

export { Layout };
