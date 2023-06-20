import Cookies from "universal-cookie";
import useSWR from 'swr';
import callApi from "../helpers/callApi";
import { useAppDispatch } from ".";
import { updateUser } from "../store/auth";


const useAuth = () => {
    const dispatch = useAppDispatch();
    const cookie = new Cookies();

    const {data , error} = useSWR('user_me', () => {
        return callApi().get('/user')
        // return callApi().get('/user', {
        //     headers : {
        //         authorization : cookie.get('shopy_token')
        //     }
        // })
    })

    dispatch(updateUser(data?.data?.user));
    return { user: data?.data?.user, error, loading: !data && !error }
}

export default useAuth;