
const RecentSearch = ({recentHistory, setRecentHistory, setSelectedHistory}) => {

    const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([])
  }

    const clearSelectedHistory = (selectedItem)=>{
        let history = JSON.parse(localStorage.getItem('history'))        
        history = history.filter((item)=>{
            if(item != selectedItem){
              return item
            }
        })
        setRecentHistory(history);
        localStorage.setItem('history', JSON.stringify(history))                
    }

    return (
        <>
            <div className="col-span-1 dark:bg-zinc-800 bg-zinc-300 h-screen dark:text-zinc-300 text-black">
                <h1 className="text-xl pt-3  text-center flex justify-center gap-2">
                    <span className="text-3xl">Recent Search</span>
                    <button onClick={clearHistory} className="cursor-pointer dark:bg-zinc-700 hover:dark:bg-zinc-900 bg-zinc-400 hover:bg-zinc-600 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D9D9D9"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg></button>
                </h1>
                <ul className="text-left overflow-auto mt-5">
                    {
                        recentHistory && recentHistory.map((item, index) => (
                            <div className="flex justify-between pr-3 py-1">
                            <li key={index} onClick={() => setSelectedHistory(item)} className="w-full px-5 pl-5 truncate  dark:hover:bg-zinc-700 hover:bg-zinc-400 dark:hover:text-zinc-50 cursor-pointer">{item}</li>
                            <button onClick={()=>clearSelectedHistory(item)} className="cursor-pointer dark:bg-zinc-700 hover:dark:bg-zinc-900 bg-zinc-400 hover:bg-zinc-600 rounded-xs "><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D9D9D9"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg></button>
                            </div>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default RecentSearch
