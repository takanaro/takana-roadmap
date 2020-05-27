import React, { useState } from 'react';
import styled from 'styled-components';
import { darken, lighten, rgba } from 'polished';
import { media } from '../utils/media';
import config from '../../config/SiteConfig';
import { Link } from 'gatsby';

const HeaderWrapper = styled.header<{ banner: string }>`
  position: relative;
  background: linear-gradient(
      -185deg,
      ${(props) => rgba(darken(0.1, props.theme.colors.primary), 0.6)},
      ${(props) => rgba(lighten(0.1, props.theme.colors.grey.dark), 0.8)}
    ),
    url(${(props) => props.banner}) no-repeat;
  background-size: cover;
  padding: 8rem 2rem 10rem;
  text-align: center;

  .responsive-menu {
    display: flex;
    float: right;
  }

  .site-header {
    background: #333333b8;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    padding: 20px 0;
  }
  .site-header * {
    color: #fff;
  }

  .site-header .header-main {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .site-header .header-main .logo {
    width: 10%;
  }
  .site-header .header-main .menu {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .site-header .header-main .menu ul {
    padding: 0;
    display: flex;
    margin: 0;
    justify-content: flex-end;
    list-style: none;
  }
  .site-header .header-main .menu ul li {
    margin: 0 10px;
  }
  .site-header .header-main .menu ul li a {
    position: relative;
    color: #fff;
    overflow: hidden;
    text-decoration: none;
  }
  .site-header .header-main .menu ul li a:after {
    content: '';
    width: 0;
    height: 1px;
    position: absolute;
    bottom: -3px;
    left: 0;
    background: #fff;
    transition: 0.5s all;
  }
  .site-header .header-main .menu ul li a:hover:after {
    width: 100%;
    transition: 0.5s all;
  }

  @media ${media.tablet} {
    padding: 4rem 2rem 6rem;
  }
  @media ${media.phone} {
    padding: 1rem 0.5rem 2rem;
    .site-header .header-main .logo {
      width: 90%;
      width: calc(100% - 30px);
    }
    .site-header .header-main {
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
    }
    .site-header .header-main .menu {
      position: fixed;
      top: 0;
      right: -100%;
      bottom: 0;
      width: 100%;
      z-index: 1;
      background: #000000c9;
      z-index: 999;
      padding: 80px 0 0 0;
      -webkit-transition: 0.3s all;
      transition: 0.3s all;
    }
    .site-header.active .logo {
      z-index: 9999;
    }
    .site-header.active .header-main .menu {
      right: 0;
      -webkit-transition: 0.3s all;
      transition: 0.3s all;
    }
    .site-header.active .responsive-menu {
      z-index: 9999;
    }
    .site-header.active .responsive-menu span {
      background: transparent;
    }
    .site-header.active .responsive-menu span:before {
      transform: rotate(-45deg);
      top: 0;
    }
    .site-header.active .responsive-menu span:after {
      transform: rotate(45deg);
      top: 0;
    }
    .site-header .header-main .menu ul {
      flex-wrap: wrap;
      flex-direction: column;
      width: 100%;
      height: 100%;
      justify-content: flex-start;
    }
    .site-header .header-main .menu ul li {
      margin: 0;
    }
    .container {
      max-width: 100%;
    }
    h1,
    .h1 {
      font-size: 32px;
    }
    h2 {
      font-size: 24px;
      line-height: 30px;
    }
    .responsive-menu {
      display: flex;
      float: right;
    }
    .site-header .header-main .menu ul li a {
      padding: 6px 20px;
      display: inline-block;
      width: 100%;
      border-bottom: 1px solid #fff;
      box-sizing: border-box;
      font-size: 14px;
    }
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 999;
  a {
    color: ${(props) => props.theme.colors.bg};
    &:hover {
      opacity: 0.85;
      color: ${(props) => props.theme.colors.bg};
    }
  }
`;

interface Props {
  // children: any;
  // banner?: string;
  // site: any;
  data: any;
  header: any;
  siteTitle: any;
}

export const Header = (props: Props) => {
  const { data, header } = props;

  const [menu, setMenu] = useState(false);
  console.log(data);

  return (
    <HeaderWrapper
      className={`site-header ${menu ? 'active' : ''}`}
      banner={'aaa' || config.defaultBg}
    >
      <div className="container">
        <div className="header-main">
          <div className="logo">
            Takana Roadmap
            {/* <Link to="/">
              {data.logo.file.url ? (
                <img src={data.logo.file.url} alt="logo" />
              ) : (
                <span>{data.siteName}</span>
              )}
            </Link> */}
          </div>
          <div
            className="responsive-menu"
            onClick={() => {
              setMenu(!menu);
            }}
          ></div>
          {header === 'home' ? (
            <div className="menu">
              <ul
                onClick={() => {
                  setMenu(false);
                }}
              >
                <li>
                  <Link to="/#home">Home</Link>
                </li>
                {data.menus
                  .filter((item: any) => item === 'About')
                  .map((t: any) => {
                    return (
                      <li>
                        <Link to={`/#About`}>About</Link>
                      </li>
                    );
                  })}
                {data.menus
                  .filter((item: any) => item === 'Service')
                  .map((t: any) => {
                    return (
                      <li>
                        <Link to={`/#Service`}>Service</Link>
                      </li>
                    );
                  })}
                {data.menus
                  .filter((item: any) => item === 'Blogs')
                  .map((t: any) => {
                    return (
                      <li>
                        <Link to={`/#Blogs`}>Blogs</Link>
                      </li>
                    );
                  })}

                {data.menus
                  .filter((item: any) => item === 'Work')
                  .map((t: any) => {
                    return (
                      <li>
                        <Link to={`/#Work`}>Work</Link>
                      </li>
                    );
                  })}
                {data.menus
                  .filter((item: any) => item === 'Testimonials')
                  .map((t: any) => {
                    return (
                      <li>
                        <Link to={`/#Testimonials`}>Testimonials</Link>
                      </li>
                    );
                  })}
                {data.menus
                  .filter((item: any) => item === 'Photos')
                  .map((t: any) => {
                    return (
                      <li>
                        <Link to={`/#Photos`}>Photos</Link>
                      </li>
                    );
                  })}
                {data.menus
                  .filter((item: any) => item === 'Contact')
                  .map((t: any) => {
                    return (
                      <li>
                        <Link to={`/#Contact`}>Contact</Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ) : (
            <div className="menu">
              <ul
                onClick={() => {
                  setMenu(false);
                }}
              >
                <li>
                  <Link to="/#home">Home</Link>
                </li>
                {data.menus
                  .filter((item: any) => item === 'Blogs')
                  .map((t: any) => {
                    return (
                      <li>
                        <Link to="/blogs">Blogs</Link>
                      </li>
                    );
                  })}
                {data.menus
                  .filter((item: any) => item === 'Photos')
                  .map((t: any) => {
                    return (
                      <li>
                        <Link to="/photos">Photos</Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </HeaderWrapper>
  );
};
