import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    <div>
      <Header
        itemsInCookieCart={props.itemsInCookieCart}
        setItemsInCookieCart={props.setItemsInCookieCart}
      />
      {props.children}
      <Footer />{' '}
    </div>
  );
}
