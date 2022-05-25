import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyles = css`
  padding: 8px 12px;
  background: lightgrey;
  border-radius: 4px;
  display: flex;
  align-items: space-between;
  justify-content: flex-end;

  > div > a {
    margin-left: 10px;
    text-decoration: none;
  }
`;

const footerStyles = css`
  padding: 8px 12px;
  margin-top: 30px;
  background: lightgrey;
  border-radius: 4px;
  display: flex;
  align-items: space-between;
  justify-content: center;
`;

export default function Layout(props) {
  return (
    <div>
      <header css={headerStyles}>
        <div>
          <Link href="/">Home</Link>
          <Link href="/info">Info</Link>
          <Link href="/synths">Synths</Link>
          <Link href="/shop">Shop</Link>
        </div>
      </header>
      {props.children}
      <footer css={footerStyles}>Footer</footer>
    </div>
  );
}
