'use client'

import React, { useState } from "react";
import { getFunFactsAction } from "./actions";

export default function Home() {
    const [animal, setAnimal] = useState('');
    const [funFacts, setFunFacts] = useState<string[]>([]);
    async function getNewFunFacts() {
        const funFacts = await getFunFactsAction(animal);
        setFunFacts(funFacts);
    }
    return (
        <main>
            <h1 className="text-xl">Animal Fun Facts!</h1>
            <label className="text-lg p-2 m-2">Animal</label>
            <input
                placeholder="dog"
                value={animal}
                onChange={(e) => setAnimal(e.target.value)}
                className="text-black border-2 p-2 m-2 rounded"
            />
            <button
                onClick={getNewFunFacts}
                className="font-bold border-2 p-2 m-2 rounded hover:bg-white hover:text-black"
            >
                Get New Fun Facts
            </button>
            <ul className="list-disc list-inside">
                {funFacts.map(function (thing) {
                    return <li key={thing}>{thing}</li>
                })}
            </ul>
        </main>
    );
}