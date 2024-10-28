import React from 'react'

export default function List() {
    return (
        <div className='w-full min-h-dvh bg-black text-light p-6 md:p-10 select-none pt-20 md:pt-10'>
            <div className='flex items-start gap-8'>
                <span className='font-bold text-3xl text-light/90 hidden flex-col items-center md:flex'>
                    <p>Feb</p>
                    <p>4</p>
                </span>

                <span>
                    <h1 className='font-bold text-3xl text-light/90'>
                        Good Afternoon.
                    </h1>
                    <p className='font-bold text-3xl text-pretty text-light/40'>
                        What&apos;s your plan for today ?
                    </p>
                </span>
            </div>

            <ul className="w-full max-w-xl space-y-2 mt-8">
                {
                    ['1', '2', '3', '4', '5', '6'].map(todo => (
                        <li key={todo} className="bg-primary px-5 py-4 rounded flex items-center justify-between">

                            <label htmlFor={todo} className="flex items-center cursor-pointer gap-5">
                                <div>
                                    <input type="checkbox" name={todo} id={todo} className="peer hidden" />
                                    <span className="w-5 h-5 border border-warm rounded-full bg-transparent peer-checked:bg-warm flex items-center justify-center transition-all">
                                    </span>
                                </div>

                                <p className='text-light/80 font-medium'>
                                    Todo Text
                                </p>
                            </label>

                            <p className='text-sm text-light/60'>
                                2024-10-23
                            </p>
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}
