$(document).ready(function() {
    const salon = {
        name: "The Fashion Pet",
        address: {
            street: "123 Pet Street",
            city: "Pet City",
            state: "CA",
            zip: "90210"
        },
        hours: {
            open: "9:00 AM",
            close: "6:00 PM"
        },
        pets: []
    };

    function Pet(name, age, gender, breed, service, type) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.breed = breed;
        this.service = service;
        this.type = type;
    }

    let pets = [
        new Pet("Scooby", 88, "Male", "Great Dane", "Grooming", "Dog"),
        new Pet("Scrappy", 44, "Male", "Great Dane", "Vaccination", "Dog"),
        new Pet("Pixie", 4, "Female", "Xolo", "Checkup", "Dog")
    ];

    salon.pets = pets;

    function displayPetCount() {
        $('#petCount').text(salon.pets.length);
    }

    function displayRow() {
        const petList = $('#petList');
        petList.empty();

        let dogCount = 0;
        let catCount = 0;
        let otherCount = 0;

        for (let pet of salon.pets) {
            let row = `
                <tr>
                    <td>${pet.name}</td>
                    <td>${pet.age}</td>
                    <td>${pet.gender}</td>
                    <td>${pet.breed}</td>
                    <td>${pet.service}</td>
                    <td>${pet.type}</td>
                </tr>
            `;
            petList.append(row);
            if (pet.type === "Dog") {
                dogCount++;
            } else if (pet.type === "Cat") {
                catCount++;
            } else {
                otherCount++;
            }
        }

        $('#dogCount').text(dogCount);
        $('#catCount').text(catCount);
        $('#otherCount').text(otherCount);
    }

    $('#petForm').on('submit', function(event) {
        event.preventDefault();

        const name = $('#name').val();
        const age = $('#age').val();
        const gender = $('#gender').val();
        const breed = $('#breed').val();
        const service = $('#service').val();
        const type = $('#type').val();

        const newPet = new Pet(name, age, gender, breed, service, type);

        salon.pets.push(newPet);

        console.log(newPet);

        $('#petForm')[0].reset();

        displayPetCount();
        displayRow();
    });

    if (window.location.pathname.endsWith('index.html')) {
        displayPetCount();
        displayRow();
    }
});