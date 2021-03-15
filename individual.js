class Individual {
    constructor(DNA_) {
        this.DNA = DNA_;
        this.fitness = 0;

        let fitness_ = 0;
        let genes = this.DNA.getGenes();
        for (let i = 0; i < genes.length; i++) {
            for (let ii = i + 1; ii < genes.length; ii++){
                if (Math.abs(i - ii) == Math.abs(genes[i] - genes[ii])){
                    fitness_++;
                }
            }
        }
        this.fitness = 1/(1+fitness_);
    }

    getFitness() {
        return this.fitness;
    };

    getDNA() {
        return this.DNA;
    }
}