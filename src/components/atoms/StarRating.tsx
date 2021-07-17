
import React from 'react';
import { ReactComponent as StarIcon } from './Star.svg';
import styled from 'styled-components';

const FILLED_COLOR = "#FACE5D";
const UNFILLED_COLOR = "#CCCCCC";


function Star({ fill }: { fill: string }) {
    return (
        <div style={{
            width: '24px',
            height: '24px',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <StarIcon style={{ fill }}/>
        </div>
    );
}


const ClickSpace = styled.div`
    display: inline-block;
    width: 12px;
    height: 24px;
`;


export default function StarRating({ score, onRate = () => {} }: { score: number, onRate?: (rating: number) => void } & JSX.IntrinsicAttributes) {
    return (
        <div style={{
            width: 24*5 + 'px',
            height: 24 + 'px'
        }}>
            <div style={{ position: 'relative' }}>
                <div style={{
                    position: 'absolute',
                    zIndex: 3
                }}>
                    {
                        new Array(10).fill(null).map((_, i) => i + 1).map(i =>
                            <ClickSpace onClick={() => onRate(i)} key={i}/>
                        )
                    }
                </div>
                <div style={{
                    position: 'absolute',
                    zIndex: 2,
                    clipPath: `inset(${0}px ${24/2 * (10 - score)}px ${0}px ${0}px)`
                }}>
                    <Star fill={FILLED_COLOR}/>
                    <Star fill={FILLED_COLOR}/>
                    <Star fill={FILLED_COLOR}/>
                    <Star fill={FILLED_COLOR}/>
                    <Star fill={FILLED_COLOR}/>
                </div>
                <div style={{
                    position: 'absolute',
                    zIndex: 1
                }}>
                    <Star fill={UNFILLED_COLOR}/>
                    <Star fill={UNFILLED_COLOR}/>
                    <Star fill={UNFILLED_COLOR}/>
                    <Star fill={UNFILLED_COLOR}/>
                    <Star fill={UNFILLED_COLOR}/>
                </div>
            </div>
        </div>
    );
}