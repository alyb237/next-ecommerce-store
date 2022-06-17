import { css } from '@emotion/react';

const footer = css`
  display: flex;
  justify-content: space-between;
  background-color: #f3e6e8;
  background-image: linear-gradient(315deg, #f3e6e8 0%, #d5d0e5 74%);
  padding-top: 1px;
  flex-direction: column;
  ul {
    list-style: none;

    display: flex;

    justify-content: space-evenly;
    gap: 4px;
  }
  li {
  }
  /* .copyright {
    border-top: solid 2px #f1f0e3;
    padding-top: 10px;
    padding-bottom: 20px;
    padding-left: 10px;
  } */
`;

export default function Footer() {
  return (
    <footer css={footer}>
      <div className="link-container">
        <ul>
          <li>FAQ</li>
          <div>
            <span>© Synthtronics</span>
          </div>
          <li className="footer-link">Contact us</li>
        </ul>
      </div>
    </footer>
  );
}
