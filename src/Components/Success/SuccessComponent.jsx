import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './SuccessComponent.scss';
import PropTypes from 'prop-types';
import 'animate.css';

import {
  MEMORIES_CREATE_RESET,
  MEMORIES_EDIT_RESET,
  MEMORIES_DELETE_RESET,
  MEMORIES_DELETE_TAG_RESET,
  MEMORIES_SET_DUE_DATE_RESET,
  MEMORIES_IS_COMPETE_RESET,
} from '../../Store/constants/memoriesConstants';

import {
  MEMORY_IMAGE_DELETE_RESET,
  MEMORY_IMAGE_UPLOAD_RESET,
} from '../../Store/constants/imageUploadConstants';
import {
  ADMIN_DELETE_ALL_USER_DATA_RESET,
  ADMIN_IS_ADMIN_RESET,
  ADMIN_IS_SUSPENDED_RESET,
} from '../../Store/constants/adminConstants';

const SuccessComponent = ({ type, message }) => {
  const dispatch = useDispatch();
  const [clear, setClear] = useState('');
  useEffect(() => {
    const interval = setTimeout(() => {
      setClear('clear');
      //Dispatch Action to Clear state
      switch (type) {
        case 'MEMORIES_CREATE_SUCCESS':
          dispatch({ type: MEMORIES_CREATE_RESET });
          break;
        case 'MEMORIES_EDIT_SUCCESS':
          dispatch({ type: MEMORIES_EDIT_RESET });
          break;
        case 'MEMORIES_DELETE_SUCCESS':
          dispatch({ type: MEMORIES_DELETE_RESET });
          break;
        case 'MEMORIES_DELETE_TAG_SUCCESS':
          dispatch({ type: MEMORIES_DELETE_TAG_RESET });
          break;
        case 'MEMORY_IMAGE_UPLOAD_SUCCESS':
          dispatch({ type: MEMORY_IMAGE_UPLOAD_RESET });
          break;
        case 'MEMORY_IMAGE_DELETE_SUCCESS':
          dispatch({ type: MEMORY_IMAGE_DELETE_RESET });
          break;
        case 'MEMORIES_IS_COMPETE_SUCCESS':
          dispatch({ type: MEMORIES_IS_COMPETE_RESET });
          break;
        case 'MEMORIES_SET_DUE_DATE_SUCCESS':
          dispatch({ type: MEMORIES_SET_DUE_DATE_RESET });
          break;
        case 'ADMIN_IS_ADMIN_SUCCESS':
          dispatch({ type: ADMIN_IS_ADMIN_RESET });
          break;
        case 'ADMIN_IS_SUSPENDED_SUCCESS':
          dispatch({ type: ADMIN_IS_SUSPENDED_RESET });
          break;
        case 'ADMIN_DELETE_ALL_USER_DATA_SUCCESS':
          dispatch({ type: ADMIN_DELETE_ALL_USER_DATA_RESET });
          break;
        default:
          break;
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [type, clear, dispatch]);

  return (
    <div className="animate__animated animate__bounceInLeft">
      <span className={`success-component ${clear}`}>{message}</span>
    </div>
  );
};
SuccessComponent.propTypes = {
  message: PropTypes.string,
};
export default SuccessComponent;
