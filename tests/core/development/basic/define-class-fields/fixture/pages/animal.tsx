interface Animal {
	animalStuff: any;
}
interface Dog extends Animal {
	dogStuff: any;
}

class AnimalHouse {
	resident: Animal;
	constructor(animal: Animal) {
		this.resident = animal;
	}
}
class DogHouse extends AnimalHouse {
	// Initializes 'resident' to 'undefined'
	// after the call to 'super()' when
	// using 'useDefineForClassFields'!
	// @ts-ignore
	resident: Dog;
}

class DogHouseWithDeclare extends AnimalHouse {
	declare resident: Dog;
}

export default function AnimalView() {
	const dog = new DogHouse({
		animalStuff: 'animal',
		dogStuff: 'dog',
	});
	const dogDeclare = new DogHouseWithDeclare({
		animalStuff: 'animal',
		dogStuff: 'dog',
	});
	return (
		<>
			<div id={'dog'}>{dog.resident}</div>
			<div id={'dogDecl'}>{dogDeclare.resident?.dogStuff}</div>
		</>
	);
}
