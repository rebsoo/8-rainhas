
class Population {
    constructor(m, c, num) {
        this.mutationRate = m; // Mutation rate
        this.crossoverRate = c; // Crossover rate
        this.population = []; // array to hold the current population
        this.matingPool = []; // array de indivíduos aleatórios que vão sair os pais
        this.generations = 0; // Number of generations

        for (let i = 0; i < num; i++) {
            this.population[i] = new Individual(new DNA(), i)
            //precisa aumentar o generations aqui? acho que não mas tem que contar
            //o calculo do fitness
        }
    }

    // Generate a mating pool
    selection() {

        // Clear the ArrayList
        this.matingPool = [];

        //Pegar aleatoriamente 5 indivíduos da população
        shuffle(this.population);
        this.matingPool = this.population.slice(0, 5);
    }

    // Making the next generation
    reproduction() {

        // A mating pool já está com os 5 indivíduos    
        // Escolher os 2 melhores pelo fitness para serem os pais
        this.matingPool.sort((a, b) => (a.getFitness > b.getFitness) ? 1 : -1);
        let parents = this.matingPool.slice(0, 2);

        // Pick two parents
        let mom = parents[0];
        let dad = parents[1];

        // Get their genes
        let momgenes = mom.getDNA();
        let dadgenes = dad.getDNA();

        // Mate their genes and generate 2 children
        let children = momgenes.crossover(this.crossoverRate, dadgenes); // this will return an array with 2 new individuals

        // Mutate their genes
        children[0].mutate(this.mutationRate);
        children[1].mutate(this.mutationRate);

        // Fill the new population with the new child
        // Aqui precisa pegar os dois piores individuos da população inteira
        // Essa função ordena a população de melhor fitness para o pior
        this.population.sort((a, b) => (a.getFitness > b.getFitness) ? 1 : -1);

        //Logo os indivíudos das posições 98 e 99 serão os piores e serão substituídos 

        this.population[98] = new Individual(children[0], 98);
        this.population[99] = new Individual(children[1], 99);

        this.generations++;
    }

    // Find highest fitness for the population
    getMaxFitness() {
        let record = 0;
        for (let i = 0; i < this.population.length; i++) {
            if (this.population[i].getFitness() > record) {
                record = this.population[i].getFitness();
            }
        }
        return record;
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