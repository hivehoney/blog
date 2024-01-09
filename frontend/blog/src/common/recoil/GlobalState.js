import { atom } from 'recoil';
import {recoilPersist} from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: "tokenState", //원하는 key 값 입력
    storage: sessionStorage,
})

export const tokenState = atom({
    key: "token",
    default: null,
    effects_UNSTABLE: [persistAtom]
})