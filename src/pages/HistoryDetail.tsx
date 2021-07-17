
import React from 'react';
import { useParams } from "react-router-dom";
import Detail from './Detail';


export default function HistoryDetail() {
    const { v } = useParams<{ v: string }>();
    const numV = Number(v);

    return (
        <Detail v={numV}/>
    );
}