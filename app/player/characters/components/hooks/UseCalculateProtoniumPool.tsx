import { Inventory, Protonium } from '@/app/context/CharacterTypes';
import { useState, useEffect } from 'react'

function useCalculateProtoniumPool(inventory: Inventory[], protonium: Protonium) {
    const [totalPool, setTotalPool] = useState(0)
    const [generators, setGenerators] = useState<Inventory[]>([])
    const [generatorsTotalPool, setGeneratorsTotalPool] = useState(0)

    useEffect(() => {

        const generators = inventory.filter(item => item.isProtoniumGenerator === true)
        setGenerators(generators)

        const generatorTotal = generators.reduce((total, protoniumTotal) => total + protoniumTotal.rank, 0);
        setGeneratorsTotalPool(generatorTotal)

        const totalPool = protonium.rank + generatorTotal
        setTotalPool(totalPool)

    }, [inventory, protonium])

    return {totalPool, generators, generatorsTotalPool}
}

export default useCalculateProtoniumPool