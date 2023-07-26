import React from "react";

interface Props{
    index: number;
    cover: string;
}

const ProductView = ({index, cover} : Props) => {
    if(index === 1){
        return(<>
            <div className="movie-case-wrapper">
                <img className="movie-case-img" src={cover} alt="Cover"/>
            </div>
        </>);
    }

    if(index === 2){
        return(<>
            <div className="cd-wrapper">
                <img className="cd-img" src={cover} alt="Cover"/>
                <div className="cd-center"></div>
            </div>
        </>);
    }
    
    if(index === 3){
        return(<>
            <div className="open-case-wrapper">
                <div className="case-side left-side">
                    <img className="open-case-img" src={cover} alt="Cover"/>
                </div>
                <div className="case-side right-side">
                    <div className="case-cd-wrapper">
                        <img className="open-case-cd-img" src={cover} alt="Cover"/>
                        <div className="case-cd-center"></div>
                    </div>
                </div>
            </div>
        </>);
    }

    return(<>
        <div className="movie-case-wrapper">
            <img className="movie-case-img" src={cover} alt="Cover"/>
        </div>
    </>);
}

export default ProductView;