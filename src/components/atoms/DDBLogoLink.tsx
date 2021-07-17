
import React from 'react';
import { ReactComponent as BigDDBLogo } from './BigDDBLogo.svg';
import { Link } from 'react-router-dom';

export default function DDBLogoLink({ ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <Link to="/">
            <BigDDBLogo width={406} height={170} {...props}/>
        </Link>
    );
}