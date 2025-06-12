import Answers from "./Answers";


const QuestionAnswer = ({item, index}) => {
  
    return (
        <>
            <div className={item.type == 'q' ? 'flex justify-end' : ''}>
                {
                    item.type == 'q' ?
                        <li key={index + Math.random()} className="text-right p-1 border-8 dark:bg-zinc-700 bg-zinc-300
                        dark:border-zinc-700 
                        border-zinc-300
                        rounded-tl-3xl rounded-bl-3xl rounded-br-3xl w-fit ">
                            <Answers ans={item.text} index={index} totalResult={1} type={item.type} /></li>
                        : item.text.map((ansItem, ansIndex) => (
                            <li key={index} className="text-left p-1"><Answers ans={ansItem} index={ansIndex} totalResult={item.length} type={item.type} /></li>
                        ))
                }
            </div>
        </>
    )
}

export default QuestionAnswer
