import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './MemoriesComponent.scss';

import { memoriesGetAction } from '../../Store/actions/memoriesActions';

import CardComponent from '../Card/CardComponent';
import ErrorComponent from '../Error/ErrorComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';

const Memories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const memoriesGet = useSelector((state) => state.memoriesGet);
  const { loading, success, error, memories } = memoriesGet;

  useEffect(() => {
    let ignore = false;
    if (userInfo) {
      dispatch(memoriesGetAction());
    }
    if (!ignore);
    return () => (ignore = true);
  }, [userInfo, navigate, dispatch]);

  return (
    <>
      {error ? <ErrorComponent error={error} /> : null}
      {loading && !success ? (
        <SpinnerComponent />
      ) : (
        <div className="memories-component-wrapper">
          {memories?.map((memory) => (
            <div key={memory._id}>
              {/* {console.log(memory)} */}
              <CardComponent
                title={memory.title}
                dueDate={memory.dueDate}
                memory={memory.memory}
                priority={memory.priority}
                tag={memory.tags.map((tag) => tag)}
                created={memory.createdAt}
                updated={memory.updatedAt}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Memories;
