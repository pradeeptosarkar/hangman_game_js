//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//Options values for buttons
let options = {
	fruits: ['Apple', 'Blueberry', 'Mandarin', 'Pineapple', 'Pomegranate', 'Watermelon', 'Avocados', 'Blueberry', 'Blackcurrant', 'Cranberry', 'Cantaloupe', 'Cherry', 'Dates', 'Fig', 'Coconut', 'Grapes', 'Dragonfruit', 'Durian', 'Jackfruit', 'Jujube', 'Kiwi', 'Lime', 'Lychee', 'Longan', 'Langsat', 'Mango', 'Mulberry', 'Pear', 'Muskmelon', 'Naranjilla', 'Mangosteen', 'Nectarine', 'Oranges', 'melon', 'Papaya', 'Peach'],
	animals: ['Dog', 'Cow', 'Cat', 'Horse', 'Donkey', 'Tiger', 'Lion', 'Panther', 'Leopard', 'Cheetah', 'Bear', 'Elephant', 'Polarbear', 'Turtle', 'Tortoise', 'Crocodile', 'Rabbit', 'Porcupine', 'Hare', 'Hen', 'Pigeon', 'Albatross', 'Crow', 'Fish', 'Dolphin', 'Frog', 'Whale', 'Alligator', 'Eagle', 'squirrel', 'Ostrich', 'Fox', 'Goat', 'Jackal', 'Emu', 'Armadillo', 'Eel', 'Goose', 'fox', 'Wolf', 'Beagle', 'Gorilla', 'Chimpanzee', 'Monkey', 'Beaver', 'Orangutan', 'Antelope', 'Bat', 'Badger', 'Giraffe', 'Crab', 'Panda', 'Hamster', 'Cobra', 'Dragon', 'Camel', 'Hawk', 'Deer', 'Chameleon', 'Hippopotamus', 'Jaguar', 'Chihuahua', 'Cobra', 'Lizard', 'Koala', 'Kangaroo', 'Iguana', 'Llama', 'Chinchillas', 'Dodo', 'Jellyfish', 'Rhinoceros', 'Hedgehog', 'Zebra', 'Possum', 'Wombat', 'Bison', 'Bull', 'Buffalo', 'Sheep', 'Meerkat', 'Mouse', 'Otter', 'Sloth', 'Owl', 'Vulture', 'Flamingo', 'Racoon', 'Mole', 'Duck', 'Swan', 'Lynx', 'Elk', 'Lemur', 'Mule', 'Baboon', 'Mammoth', 'whale', 'Rat', 'Snake', 'Peacock', ],
	languages: ["Chinese","Hindi","English","Spanish","Urdu","Bengali","Portugese","Russian","Tamil","Telugu","Kannada","Malayalam","Gujarati","Marathi","Punjabi","Odia","Sindhi","Assamese","French","Arabic","Japanese","Korean","Malay","Burmese","Italian","German","Swedish"],
	countries: ['United States', 'Canada', 'Mexico', 'Japan', 'China', 'South Korea', 'India', 'France', 'Germany', 'Spain', 'Russia', 'United Kingdom', 'Italy', 'Ukraine', 'Poland', 'Romania', 'Netherlands', 'Belgium', 'Czech Republic', 'Greece', 'Portugal', 'Sweden', 'Hungary', 'Austria', 'Switzerland', 'Bulgaria', 'Denmark', 'Finland', 'Slovakia', 'Norway', 'Ireland', 'Croatia', 'Albania', 'Latvia', 'Estonia', 'Iceland', 'Brazil', 'Colombia', 'Argentina', 'Peru', 'Venezuela', 'Chile', 'Ecuador', 'Guatemala', 'Bolivia', 'Haiti', 'Cuba', 'Dominican Republic', 'Honduras', 'Paraguay', 'El Salvador', 'Nicaragua', 'Costa Rica', 'Panama', 'Uruguay', 'Jamaica', 'Puerto Rico', 'Trinidad and Tobago', 'Guyana', 'Belize', 'Bahamas', 'Grenada', 'Aruba', 'Turks and Caicos Islands', 'Nigeria', 'Ethiopia', 'Egypt', 'DR Congo', 'Tanzania', 'South Africa', 'Kenya', 'Uganda', 'Algeria', 'Sudan', 'Morocco', 'Mozambique', 'Ghana', 'Madagascar', 'Cameroon', 'Mali', 'Malawi', 'Zambia', 'Senegal', 'Zimbabwe', 'Rwanda', 'Libya', 'Equatorial Guinea', 'Indonesia', 'Pakistan', 'Bangladesh', 'Philippines', 'Vietnam', 'Turkey', 'Iran', 'Thailand', 'Myanmar', 'Iraq', 'Afghanistan', 'Saudia Arabia', 'Uzbekistan', 'Malaysia', 'Yemen', 'Nepal', 'North Korea', 'Sri Lanka', 'Kazakhstan', 'Syria', 'Cambodia', 'Jordan', 'United Arab Emirates', 'Israel', 'Laos', 'Lebanon', 'Kyrgyzstan', 'Singapore', 'State of Palestine', 'Kuwait', 'Georgia', 'Mongolia', 'Armenia', 'Qatar', 'Maldives', ''],
	colors: ['Red', 'Violet', 'Blue', 'Green', 'Indigo', 'Orange', 'Yellow', 'white', 'Violet', 'Brown', 'Aqua', 'Black', 'Cyan', 'Purple'],
	
};

//count
let winCount = 0;
let count = 0;

let chosenWord = "";

//Display option buttons
const displayOptions = () => {
	optionsContainer.innerHTML += `<h2>Hangman Game by Pradeepto Sarkar</h2>`;
	let buttonCon = document.createElement("div");
	for (let value in options) {
		buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
	}
	optionsContainer.appendChild(buttonCon);
};

//Block all the Buttons
const blocker = () => {
	let optionsButtons = document.querySelectorAll(".options");
	let letterButtons = document.querySelectorAll(".letters");
	//disable all options
	optionsButtons.forEach((button) => {
		button.disabled = true;
	});

	//disable all letters
	letterButtons.forEach((button) => {
		button.disabled.true;
	});
	newGameContainer.classList.remove("hide");
};

//Word Generator
const generateWord = (optionValue) => {
	let optionsButtons = document.querySelectorAll(".options");
	//If optionValur matches the button innerText then highlight the button
	optionsButtons.forEach((button) => {
		if (button.innerText.toLowerCase() === optionValue) {
			button.classList.add("active");
		}
		button.disabled = true;
	});

	//initially hide letters, clear previous word
	letterContainer.classList.remove("hide");
	userInputSection.innerText = "";

	let optionArray = options[optionValue];
	//choose random word
	chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
	chosenWord = chosenWord.toUpperCase();

	//replace every letter with span containing dash
	let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

	//Display each element as span
	userInputSection.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
	winCount = 0;
	count = 0;

	//Initially erase all content and hide letteres and new game button
	userInputSection.innerHTML = "";
	optionsContainer.innerHTML = "";
	letterContainer.classList.add("hide");
	newGameContainer.classList.add("hide");
	letterContainer.innerHTML = "";

	//For creating letter buttons
	for (let i = 65; i < 91; i++) {
		let button = document.createElement("button");
		button.classList.add("letters");
		//Number to ASCII[A-Z]
		button.innerText = String.fromCharCode(i);
		//character button click
		button.addEventListener("click", () => {
			let charArray = chosenWord.split("");
			let dashes = document.getElementsByClassName("dashes");
			//if array contains clciked value replace the matched dash with letter else dram on canvas
			if (charArray.includes(button.innerText)) {
				charArray.forEach((char, index) => {
					//if character in array is same as clicked button
					if (char === button.innerText) {
						//replace dash with letter
						dashes[index].innerText = char;
						//increment counter
						winCount += 1;
						//if winCount equals word lenfth
						if (winCount == charArray.length) {
							resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
							//block all buttons
							blocker();
						}
					}
				});
			} else {
				//lose count
				count += 1;
				//for drawing man
				drawMan(count);
				//Count==6 because head,body,left arm, right arm,left leg,right leg
				if (count == 6) {
					resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
					blocker();
				}
			}
			//disable clicked button
			button.disabled = true;
		});
		letterContainer.append(button);
	}

	displayOptions();
	//Call to canvasCreator (for clearing previous canvas and creating initial canvas)
	let {
		initialDrawing
	} = canvasCreator();
	//initialDrawing would draw the frame
	initialDrawing();
};

//Canvas
const canvasCreator = () => {
	let context = canvas.getContext("2d");
	context.beginPath();
	context.strokeStyle = "#000";
	context.lineWidth = 2;

	//For drawing lines
	const drawLine = (fromX, fromY, toX, toY) => {
		context.moveTo(fromX, fromY);
		context.lineTo(toX, toY);
		context.stroke();
	};

	const head = () => {
		context.beginPath();
		context.arc(70, 30, 10, 0, Math.PI * 2, true);
		context.stroke();
	};

	const body = () => {
		drawLine(70, 40, 70, 80);
	};

	const leftArm = () => {
		drawLine(70, 50, 50, 70);
	};

	const rightArm = () => {
		drawLine(70, 50, 90, 70);
	};

	const leftLeg = () => {
		drawLine(70, 80, 50, 110);
	};

	const rightLeg = () => {
		drawLine(70, 80, 90, 110);
	};

	//initial frame
	const initialDrawing = () => {
		//clear canvas
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		//bottom line
		drawLine(0, 130, 75, 130);
		//left line
		drawLine(10, 10, 10, 131);
		//top line
		drawLine(10, 10, 70, 10);
		//small top line
		drawLine(70, 10, 70, 20);
	};

	return {
		initialDrawing,
		head,
		body,
		leftArm,
		rightArm,
		leftLeg,
		rightLeg
	};
};

//draw the man
const drawMan = (count) => {
	let {
		head,
		body,
		leftArm,
		rightArm,
		leftLeg,
		rightLeg
	} = canvasCreator();
	switch (count) {
		case 1:
			head();
			break;
		case 2:
			body();
			break;
		case 3:
			leftArm();
			break;
		case 4:
			rightArm();
			break;
		case 5:
			leftLeg();
			break;
		case 6:
			rightLeg();
			break;
		default:
			break;
	}
};

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;