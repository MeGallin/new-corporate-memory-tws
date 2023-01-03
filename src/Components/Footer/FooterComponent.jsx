import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userPageHitsAction } from '../../Store/actions/userActions';

import DateTime from '../DateTime/DateTimeComponent';
import './FooterComponent.scss';

const Footer = () => {
  const dispatch = useDispatch();

  const userPageHits = useSelector((state) => state.userPageHits);
  const { hits } = userPageHits;

  useEffect(() => {
    console.log('fired');
    let ignore = false;
    // Dispatch action for visitor counter
    dispatch(userPageHitsAction());

    if (!ignore);
    return () => (ignore = true);
  }, [dispatch]);

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
