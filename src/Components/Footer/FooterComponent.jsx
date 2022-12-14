import DateTime from '../DateTime/DateTimeComponent';
import './FooterComponent.scss';

const Footer = () => {
  return (
    <footer>
      <div>Developed by Gary Allin</div>
      <div> YourCorporateMemory &copy;</div>
      <DateTime />
    </footer>
  );
};

export default Footer;
