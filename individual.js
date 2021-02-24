
class Individual {
    constructor(dna_, index_) {
        this.rolloverOn = false // ???
        this.dna = dna_ // individual's DNA
        this.index = index_
        this.fitness = 1 // How good is this individual? It starts all the same for everyone
    }

    getFitness() {
        return this.fitness
    }

    getDNA() {
        return this.dna
    }
}