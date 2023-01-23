import DateTime from '../DateTime/DateTimeComponent';
import PageHitCounterComponent from '../PageHitCounter/PageHitCounterComponent';
import './FooterComponent.scss';

const Footer = () => {
  return (
    <footer>
      <div>Developed by Gary Allin</div>
      <div className="footer-content-wrapper">
        <div>YourCorporateMemory &copy;</div>
        <div>
          <PageHitCounterComponent />
        </div>
      </div>
      <DateTime />
    </footer>
  );
};

export default Footer;
