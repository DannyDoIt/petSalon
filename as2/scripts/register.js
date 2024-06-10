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

    function initializePets() {
        salon.pets = getItem('pets');
        if (salon.pets.length === 0) {
            salon.pets = [
                new Pet("Scooby", 88, "Male", "Great Dane", "Bath and Haircut", "Dog"),
                new Pet("Scrappy", 44, "Male", "Great Dane", "Vaccination", "Dog"),
                new Pet("Pixie", 4, "Female", "Xolo", "Dental/Oral Hygiene", "Dog")
            ];
            saveItem('pets', salon.pets);
        }
    }

    initializePets();

    function getServiceIcon(service) {
        switch (service) {
            case "Bath and Haircut":
                return "images/pet-shampoo.png";
            case "Dental/Oral Hygiene":
                return "images/medical-report.png";
            case "Nail Trim":
                return "images/pet-friendly.png";
            case "Vaccination":
                return "images/vaccine.png";
            default:
                return "images/pawprint.png";
        }
    }

    function displayPetCount() {
        $('#petCount').text(salon.pets.length);
    }

    function displayRow() {
        const petList = $('#petList');
        petList.empty();

        let dogCount = 0;
        let catCount = 0;
        let rodentCount = 0;
        let rabbitCount = 0;
        let otherCount = 0;

        for (let pet of salon.pets) {
            let serviceIcon = getServiceIcon(pet.service);
            let row = `
                <div class="col-md-4">
                    <div class="card mb-4 ${pet.type.toLowerCase()}">
                        <img src="${serviceIcon}" alt="Service Icon" class="icon">
                        <div class="card-body">
                            <h5 class="card-title">${pet.name}</h5>
                            <p class="card-text">Age: ${pet.age}</p>
                            <p class="card-text">Gender: ${pet.gender}</p>
                            <p class="card-text">Breed: ${pet.breed}</p>
                            <p class="card-text">Service: ${pet.service}</p>
                            <p class="card-text">Type: ${pet.type}</p>
                            <button class="btn btn-danger delete-btn" data-name="${pet.name}">Delete</button>
                        </div>
                    </div>
                </div>
            `;
            petList.append(row);
            if (pet.type === "Dog") {
                dogCount++;
            } else if (pet.type === "Cat") {
                catCount++;
            } else if (pet.type === "Rodent") {
                rodentCount++;
            } else if (pet.type === "Rabbit") {
                rabbitCount++;
            } else {
                otherCount++;
            }
        }

        $('#dogCount').text(dogCount);
        $('#catCount').text(catCount);
        $('#rodentCount').text(rodentCount);
        $('#rabbitCount').text(rabbitCount);
        $('#otherCount').text(otherCount);
    }

    // Delete pet function
    function deletePet(petName) {
        salon.pets = salon.pets.filter(pet => pet.name !== petName);
        saveItem('pets', salon.pets);
        displayPetCount();
        displayRow();
    }

    $('#petList').on('click', '.delete-btn', function() {
        const petName = $(this).data('name');
        deletePet(petName);
    });

    $('#petForm').on('submit', function(event) {
        event.preventDefault();

        const name = $('#name').val();
        const age = $('#age').val();
        const gender = $('#gender').val();
        const breed = $('#breed').val();
        const service = $('#service').val();
        const type = $('#type').val();

        const newPet = new Pet(name, age, gender, breed, service, type);

        // Add new pet to the salon's pets array
        salon.pets.push(newPet);

        // Save the updated pets array to local storage
        saveItem('pets', salon.pets);

        // Reset the form
        $('#petForm')[0].reset();

        // Update the display
        displayPetCount();
        displayRow();
    });

    if (window.location.pathname.endsWith('index.html')) {
        displayPetCount();
        displayRow();
    }
});
