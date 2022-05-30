import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyles = css`
  padding: 8px 12px;
  background: lightgrey;
  border-radius: 4px;
  display: flex;
  align-items: space-between;
  justify-content: center;

  > div > a {
    margin-left: 10px;
    text-decoration: none;
  }
`;

const footerStyles = css`
  padding: 8px 12px;
  margin-top: 0px;
  background: lightgrey;
  border-radius: 4px;
  display: flex;
  align-items: space-between;
  justify-content: center;
`;

const footerDivStyles = css`
  display: flex;
  min-height: 20vh;
  flex-direction: column;
  justify-content: space-between;
`;

const footerContainer = css`
  margin-top: auto;
`;

export default function Layout(props) {
  return (
    <div>
      <header data-test-id="products-link" css={headerStyles}>
        <div>
          <Link href="/">Home</Link>
          <Link href="/synths">Synths</Link>
          <Link href="/cart">Cart</Link>
        </div>
      </header>
      {props.children}
      <div css={footerDivStyles}>
        <div css={footerContainer}>
          <footer css={footerStyles}>Footer</footer>
        </div>
      </div>
    </div>
  );
}
