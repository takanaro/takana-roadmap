import React, { useState } from 'react';
import styled from 'styled-components';
import { darken, lighten, rgba } from 'polished';
import { media } from '../../utils/media';
import config from '../../../config/SiteConfig';
import { Link } from 'gatsby';

const HeaderWrapper = styled('header')<{ banner: string }>`
  background-color: purple;
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

  return (
    <HeaderWrapper
      className={`site-header ${menu ? 'active' : ''}`}
      banner={'aaa' || config.defaultBg}
    >
      <div className="container">
        <div className="header-main">
          <nav role="navigation">
            <div id="menuToggle">
              <input type="checkbox" />
              <span></span>
              <span></span>
              <span></span>
              <ul id="menu">
                <a href="#">
                  <li>Home</li>
                </a>
                <a href="#">
                  <li>About</li>
                </a>
                <a href="#">
                  <li>Info</li>
                </a>
                <a href="#">
                  <li>Contact</li>
                </a>
                <a href="https://erikterwan.com/" target="_blank">
                  <li>Show me more</li>
                </a>
              </ul>
            </div>
          </nav>
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
