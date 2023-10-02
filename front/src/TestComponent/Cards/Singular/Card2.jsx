// import React, { useState, useEffect } from "react";
import React from "react";
import style from "./Card2.module.css";
import { Link } from "react-router-dom";


export default function Card2({ id, title, image, genre, price}) {

//   const createName =  (forename, surname) => { 
//     if (forename && surname){ return forename + " " + surname };
//     if (forename && !surname){ return forename };
//     if (!forename && surname){ return surname };
//     if (!forename && !surname){ throw new Error ("There is no name provided") }
//   }; 
//   const name = createName(forename, surname);

  return (
    <div className={style.cardContainer}>
      <h2 className={style.cardInfo}>{title}</h2>
      <Link to={`/product-page/${id}`}>
        <img className={style.cardImage} src={image} alt={title} />
      </Link>
      <h4 className={style.cardInfo}>{genre}</h4>
      <h4 className={style.cardInfo}>{price}</h4>
    </div>
  );
};