import { useRecoilState } from 'recoil';
import { lifePayJwtAtom, lifePayPublicAtom } from './life-pay.atom';
import { useEffect } from 'react';
import { LifePayAuthReponse, makeLifePayAuth } from './life-pay.api';

export const useLifePayAuth = () => {
  const [lifePayJwt, setLifePayJwt] = useRecoilState(lifePayJwtAtom);
  const [lifePayPublic, setLifePublic] = useRecoilState(lifePayPublicAtom);

  useEffect(() => {
    if (!lifePayJwt) {
      makeLifePayAuth().then((response: LifePayAuthReponse) => {
        setLifePayJwt(response.jwt);
        setLifePublic(response.lp_public);
      });
    }
  }, []);

  return {
    lifePayJwt,
    lifePayPublic,
  };
};
