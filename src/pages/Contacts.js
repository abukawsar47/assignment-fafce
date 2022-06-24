import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    // const [items, setItems] = useState([]);
    const [noMore, setNoMore] = useState(true);
    const [page, setPage] = useState(100);
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        fetch("https://randomuser.me/api/?results=50")
            .then(res => res.json())
            .then(data => {
                setContacts(data)
                setPersons(Object.values(data)[0])
                console.log(data);
            })
    }, [])

    const abu = async () => {

        const res = await fetch(`https://randomuser.me/api/?results=${page}`)
        const data = await res.json()
        return data;
        /*     .then(res => res.json())
            .then(data => {
                setItems(data)
                // setPersons(Object.values(data)[0])
                console.log(data);
            }) */
    }

    // let data = Object.values(contacts)[0]
    // console.log(data);

    /*     if (data) {
            setItems(data)
        } */

    const fetchMoreData = async () => {
        const newData = await abu();
        console.log(newData);
        setPersons(Object.values(newData)[0])
        if (persons.length === 450 || persons.length > 450) {
            setNoMore(false)
        }
        setPage(page + 50)
    }


    return (

        <div className=''>
            <div className="lg:w-96 max-w-56 mx-auto">
                <div className="overflow-x-auto shadow-2xl">
                    <h2 className='font-bold lg:text-3xl text-primary px-5 py-2'>All Contacts</h2>

                    <div className='px-5'>
                        {/* <div className='px-5 overflow-scroll h-96'> */}
                        {/* -----Infinity Scroll----- */}
                        <InfiniteScroll
                            dataLength={persons?.length}
                            next={fetchMoreData}
                            //To put endMessage and loader to the top.
                            // inverse={true}
                            hasMore={noMore}
                            loader={<h4 className='text-center'>Loading...</h4>}
                            endMessage={<h4 className='text-center'>No More Data</h4>}
                        // scrollableTarget="scrollableDiv"
                        >
                            {persons.map((contact, index) => (
                                <div key={index}>
                                    <div className="flex items-center lg:gap-5 gap-4 my-5">
                                        <div>
                                            <span className='font-bold'>{index + 1}</span>
                                        </div>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={contact?.picture?.thumbnail} alt="contact img" />
                                            </div>
                                        </div>
                                        <div className=''>
                                            <div className="font-bold"><h1>{contact?.name?.title}{" "}{contact?.name?.first + " " + contact?.name?.last}</h1></div>
                                            <div className="text-sm opacity-50 ">{contact?.cell}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </InfiniteScroll>
                        {/* -----Infinity Scroll----- */}
                        {/*  {data &&
                            data.map((contact, index) => <div
                                key={index}
                            >
                                <div className="flex items-center lg:gap-5 gap-4 my-5">
                                    <div>
                                        <span className='font-bold'>{index + 1}</span>
                                    </div>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={contact?.picture?.thumbnail} alt="contact img" />
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className="font-bold"><h1>{contact?.name?.title}{" "}{contact?.name?.first + " " + contact?.name?.last}</h1></div>
                                        <div className="text-sm opacity-50 ">{contact?.cell}</div>
                                    </div>
                                </div>
                            </div>
                            )
                        } */}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Contacts;