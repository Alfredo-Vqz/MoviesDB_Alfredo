import { useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const Show = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        //LLamar endpoint de detalles
    }, [])

    return (
        <div>
            <div>Show id: { id }</div>
            <div> Titulo desde el state: { location.state.name } </div>
            <button onClick={goBack}> Ir atras </button>
        </div>
    );
};

export default Show;