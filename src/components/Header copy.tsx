import React from 'react';
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
  @media ${media.tablet} {
    padding: 4rem 2rem 6rem;
  }
  @media ${media.phone} {
    padding: 1rem 0.5rem 2rem;
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
  children: any;
  banner?: string;
  site: any;
}

export const Header = (props: Props) => {
  return (
    <HeaderWrapper banner={props.banner || config.defaultBg}>
      <Content>{props.children}</Content>
      <div>
          <nav>
            <ul style={{ display: "flex", flex: 1 }}>
              {props.site.siteMetadata.menuLinks.map((link: any)=> (
                <li
                  key={link.name}
                  style={{
                    listStyleType: `none`,
                    padding: `1rem`,
                  }}
                >
                  <Link style={{ color: `white` }} to={link.link}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
    </HeaderWrapper>
  );
};
