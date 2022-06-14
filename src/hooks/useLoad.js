import Spinner from "../components/Spinner/Spinner";
import Error from "../components/Page/Error/Error";

const useLoad = (loading, error) => {
    const loaded = loading ? <Spinner/> : null;
    const mistake = error ? <Error/> : null;

    return {loaded, mistake}
}

export default useLoad