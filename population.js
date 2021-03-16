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

        this.individuals.sort((a, b) => (a.getFitness() > b.getFitness()) ? 1 : -1);
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
        this.individuals.sort((a, b) => (a.getFitness() > b.getFitness()) ? 1 : -1);
        let individualsLen = this.individuals.length;
        
        let chosenIndividuals = [-1, -1];
        for (let i = 0; i < 2; i++){
            while (chosenIndividuals[i] == -1) {
                let randomNumber = Math.floor(Math.random() * 1.4*individualsLen);
                let chosenIndividual = -1;
                
                if (randomNumber < (0.3 * individualsLen)) {
                    if (chosenIndividual)
                    chosenIndividual = Math.floor(randomNumber / 3);
                } else if (randomNumber >= (0.3 * individualsLen) && randomNumber < (0.7 * individualsLen)) {
                    chosenIndividual = Math.floor((randomNumber - ((0.1 * individualsLen)) / 2));
                } else {
                    chosenIndividual = randomNumber - (0.4 * individualsLen);
                }

                if (!chosenIndividuals.includes(chosenIndividual)){
                    chosenIndividuals[i] = chosenIndividual;
                    this.matingPool.push(this.individuals[chosenIndividual]);
                }  
            }
        }
    }

    reproduction() {
        let momDNA = this.matingPool[0].getDNA();
        let dadDNA = this.matingPool[1].getDNA();
        let childrenGenes = momDNA.crossover(this.crossoverRate, dadDNA);

        this.matingPool = [];
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