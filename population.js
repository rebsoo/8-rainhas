
class Population {
    constructor(mutationRate_, crossoverRate_, quantity) {
        this.mutationRate = mutationRate_;
        this.crossoverRate = crossoverRate_;
        this.individuals = [];
        this.generations = 1;
        this.matingPool = [];

        for (let i = 0; i < quantity; i++) {
            let dna = new DNA();
            this.individuals[i] = new Individual(dna);
        }
    }

    evolveNewGeneration() {
        this.selection();
        let children = this.reproduction();

        this.individuals.sort((a, b) => (a.getFitness > b.getFitness) ? 1 : -1);
        this.individuals[this.individuals.length-2] = children.child1;
        this.individuals[this.individuals.length-1] = children.child2;

        this.generations++;
        
        if (children.child1.getFitness() == 1 || children.child2.getFitness() == 1) {
            return this.generations;
        } else {
            return -1;
        }
    }

    selection() {
        shuffle(this.individuals);
        this.matingPool = this.individuals.slice(0, 5);
    }

    reproduction() {
        this.matingPool.sort((a, b) => (a.getFitness > b.getFitness) ? 1 : -1);
        let parents = this.matingPool.slice(0, 2);

        let momDNA = parents[0].getDNA();
        let dadDNA = parents[1].getDNA();
        let childrenGenes = momDNA.crossover(this.crossoverRate, dadDNA);

        return {
            child1: new Individual(childrenGenes.child1Genes), 
            child2: new Individual(childrenGenes.child2Genes)
        };
    }


    getMaxFitness() {
        let record = this.individuals[0].getFitness();
        for (let i = 0; i < this.individuals.length; i++) {
            if (this.individuals[i].getFitness() > record) {
                record = this.individuals[i].getFitness();
            }
        }
        return record;
    }

    getSolutions() {
        let solutions = [];
        for (let i = 0; i < this.individuals.length; i++) {
            if (this.individuals[i].getFitness() == 1) {
                solutions.push(this.individuals[i].getDNA().getGenes());
            }
        }
        return solutions;
    }

    getAverageFitness() {
        let fitnessSum = 0;
        for (let i = 0; i < this.individuals.length; i++) {
            fitnessSum = fitnessSum + this.individuals[i].getFitness();
        }
        return fitnessSum/this.individuals.length;
    }

    getGenerations() {
        return this.generations;
    }
}