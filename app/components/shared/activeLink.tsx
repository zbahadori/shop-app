import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
    children : React.ReactElement | (({active} : { active: boolean}) => React.ReactElement ),
    href : string,
    as? : string
}
const ActiveLink = ({ children, ...props } : Props) => {

    const {asPath} = useRouter();
    const active = asPath === props.href || asPath === props.as;
    return (
        <Link {...props} className={`${
            active
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
          >
              {
                typeof children === 'function'
                ?
                    children({active})
                : 
                    children
            }
        </Link>
    );
};

export default ActiveLink;