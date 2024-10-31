/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import appwriteService from '@/appwrite/functions'
import useAuth from '@/context/useAuth'
import React, { useEffect, useState } from 'react'
import formatToHistory from '@/utils/formatToHistory';
import formatToDate from '@/utils/formatToDate'
import { Check, X } from 'lucide-react';

export default function TodoHistory() {

    const { userData } = useAuth();
    const [history, setHistory] = useState<any>([])

    useEffect(() => {
        (async () => {
            if (userData) {
                const todos = await appwriteService.getTodoByUserId(userData.$id);
                const formattedTodos = formatToHistory(todos.documents)
                setHistory(formattedTodos)
                console.log("History Todos", formattedTodos)
            }
        })()
    }, [userData])

    return (
        <div className='w-full bg-black text-light md:p-10 hidden xl:block'>
            <h1 className='text-2xl text-light/90 font-bold'>
                Todo History
            </h1>

            <div className='mt-6 space-y-6 overflow-y-auto h-full max-h-[40rem]'>
                {
                    history.length > 0 ? history.map((elem: any) => (
                        <div key={elem.month}>
                            <h1 className='text-lg font-bold text-light/60'>
                                {elem.month}
                            </h1>

                            <ul className='space-y-2 mt-2 w-full max-w-2xl'>
                                {
                                    elem.todos.map((todo: any) => (
                                        <li className='w-full bg-primary px-4 py-3 rounded flex items-center justify-between' key={todo.id}>
                                            <p className='text-light/80 font-medium flex items-center gap-2'>
                                                {
                                                    todo.isCompleted ? (
                                                        <Check className='text-green-400' />
                                                    ) : (
                                                        <X className='text-red-400' />
                                                    )
                                                }
                                                {todo.todo}
                                            </p>

                                            <p className='text-light/50 text-sm font-medium'>
                                                {
                                                    formatToDate(todo.createdAt)
                                                }
                                            </p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    )) :
                        (
                            <p className='font-medium text-light/50'>
                                No Todos yet
                            </p>
                        )
                }
            </div>
        </div>
    )
}
