import React, { useEffect, useState } from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';

const Contact = () => {
    let offset = 0;
    const [contacts, setContacts] = useState([]);


    const loadMoreContact = () => {
        fetch(`https://randomuser.me/api/?results=10&offset=${offset}`)
            .then(res => res.json())
            .then(data => {
                setContacts(...data)
                console.log(data);
            })
        offset += 10;
    }

    const handleScroll = (e) => {
        if (
            window.innerHeight + e.target.documentElement.scrollTop >= e.target.documentElement.scrollHeight
        ) {
            loadMoreContact()
        }
    }

    useEffect(() => {
        loadMoreContact();
        window.addEventListener('scroll', handleScroll)
    }, [])

    const data = Object.values(contacts)[0]
    // console.log(data);


    return (

        <div className='min-h-fit'>
            <div className="lg:w-96 max-w-56 mx-auto">
                <div className="overflow-x-auto shadow-2xl">
                    <h2 className='font-bold lg:text-3xl text-primary px-5 py-2'>All Contacts</h2>

                    <div className='px-5'>
                        {/* <div className='px-5 overflow-scroll h-96'> */}
                        {/* -----Infinity Scroll----- */}
                        {/* -----Infinity Scroll----- */}
                        {data &&
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
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Contact;