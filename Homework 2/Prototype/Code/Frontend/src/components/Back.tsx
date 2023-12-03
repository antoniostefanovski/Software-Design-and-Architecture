import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Combined.css';

function Back() {

    const navigate = useNavigate();

    return(
        <>
            <button onClick={() => navigate(-1)} className="btn-back">Назад</button>
        </>
    )
};

export default Back;