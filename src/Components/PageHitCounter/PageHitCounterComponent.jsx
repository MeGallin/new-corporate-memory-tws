import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pageHitsAction } from '../../Store/actions/pageHitCounterActions';
import SpinnerComponent from '../Spinner/SpinnerComponent';

const PageHitCounterComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let ignore = false;
    dispatch(pageHitsAction());
    if (!ignore) return () => (ignore = true);
  }, [dispatch]);
  const pageHits = useSelector((state) => state.pageHits);
  const { loading, error, count } = pageHits;
  return (
    <>
      {' '}
      {loading ? (
        <SpinnerComponent />
      ) : error ? (
        'There was an error loading the page hit counter'
      ) : (
        `${100 + count} unique hits.`
      )}
    </>
  );
};

export default PageHitCounterComponent;
