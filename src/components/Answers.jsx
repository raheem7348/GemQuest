import React from 'react'
import { useEffect, useState } from 'react'
import { checkHeading, replaceHeadingStars } from '../helper'


const Answers = ({ ans, index, totalResult, type }) => {
    const [heading, setHeading] = useState(false)
    const [answer, setAnswer] = useState(ans)

    useEffect(() => {
        if (checkHeading(ans)) {
            setHeading(true);
            setAnswer(replaceHeadingStars(ans))
        }

    }, [])

    // console.log(index);


    return (
        <>
            {/* {ans} */}
            {
                index == 0 && totalResult > 1 ? <span className='text-lg block pt-2'>{answer}</span> :
                    heading ?
                        <span className='text-xl block pt-2'>{answer}</span>
                        : <span className={type=='q' ? 'pl-1' : 'pl-5'}>{answer}</span>
            }
        </>
    )
}

export default Answers
