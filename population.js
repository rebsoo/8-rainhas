
class Population {
    constructor(m, c, num) {
        this.mutationRate = m; // Mutation rate
        this.crossoverRate = c; // Crossover rate
        this.population = []; // array to hold the current population
        this.matingPool = []; // ???
        this.generations = 0; // Number of generations

        for (let i = 0; i < num; i++) {
            this.population[i] = new Individual(new DNA(), i)
        }
    }

    getRandomIndividuals() {
        // Pegar 5 indivíduos aleatóriamente da população
        shuffle(this.population);
        return this.population.slice(0, 5);

    }

    // Making the next generation
    reproduction() { // Ainda precisa modificar esse método, só foi copiado !!!!

        // Escolher de maneira random 5 indivíduos
        // Escolher os 2 melhores pelo fitness para serem os pais
        // Refill the population with children from the mating pool
        for (let i = 0; i < this.population.length; i++) {
            // Sping the wheel of fortune to pick two parents
            let m = floor(random(this.matingPool.length));
            let d = floor(random(this.matingPool.length));
            // Pick two parents
            let mom = this.matingPool[m];
            let dad = this.matingPool[d];
            // Get their genes
            let momgenes = mom.getDNA();
            let dadgenes = dad.getDNA();
            // Mate their genes
            let child = momgenes.crossover(dadgenes);
            // Mutate their genes
            child.mutate(this.mutationRate);
            // Fill the new population with the new child
            this.population[i] = new Individual(child, i);
        }
        this.generations++;
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle
    while (0 !== currentIndex) {

        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}