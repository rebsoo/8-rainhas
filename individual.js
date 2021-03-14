class Individual {
    constructor(DNA_) {
        this.DNA = DNA_;
        this.fitness = 0;

        let fitness_ = 0;
        let genes = this.DNA.getGenes();
        for (let i = 0; i < genes.length; i++) {
            for (let ii = i + 1; ii < genes.length; ii++){
                let aux_i = parseInt(genes[i], 2);
                let aux_ii = parseInt(genes[ii], 2);
                if (Math.abs(i - ii) == Math.abs(aux_i - aux_ii)){
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