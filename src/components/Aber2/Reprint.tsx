import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onTimer } from 'store/aber2/gamego/actions';
import { afterReprint } from 'store/key/actions';
import { getNeedReprint, getReprint } from 'store/key/selectors';
import { sigalrm } from 'store/signals/actions';

const Reprint = () => {
  const dispatch = useDispatch<any>();

  const needReprint = useSelector(getNeedReprint);
  const reprint = useSelector(getReprint);

  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  const handleReprint = useCallback(
    async () => {
      await dispatch(sigalrm());
      setShow(needReprint);
      setMessage(reprint);
      await dispatch(afterReprint());  
    },
    [
      dispatch,
      needReprint,
      reprint,
    ],
  );

  useEffect(() => {
    handleReprint();
  }, [
    handleReprint,
  ])

  if (!show) {
    return null;
  }

  return message;
};

export default Reprint;
