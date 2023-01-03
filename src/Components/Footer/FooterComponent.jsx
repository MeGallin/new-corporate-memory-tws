import { useSelector } from 'react-redux';
import DateTime from '../DateTime/DateTimeComponent';
import './FooterComponent.scss';

const Footer = () => {
  const userPageHits = useSelector((state) => state.userPageHits);
  const { hits } = userPageHits;

  return (
    <footer>
      <div>Developed by Gary Allin</div>
      <div className="footer-content-wrapper">
        {' '}
        <div>YourCorporateMemory &copy;</div>{' '}
        <div>visitors: {hits?.length}</div>{' '}
      </div>
      <DateTime />
    </footer>
  );
};

export default Footer;
